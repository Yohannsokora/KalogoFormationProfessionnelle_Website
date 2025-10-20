import { serve } from "https://deno.land/std@0.208.0/http/server.ts";
import { generateDocument } from "./lib/generate-document.ts";
import { Resend } from "npm:resend";
import { Base64 } from "npm:js-base64";

// Environment
const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
if (!RESEND_API_KEY) {
  throw new Error("Missing RESEND_API_KEY environment variable");
}
const RESEND_FROM =
  Deno.env.get("RESEND_FROM") ??
  "Kalogo Formation Professionnelle <noreply@kalogoformationprofessionnelle.com>";
const RESEND_TO_ADMISSIONS =
  Deno.env.get("RESEND_TO_ADMISSIONS") ?? "franckyohanns@gmail.com";

const resend = new Resend(RESEND_API_KEY);

// Robust base64 encoder for Deno/Node buffers
function toBase64(buffer: unknown): string {
  // Node Buffer support
  if (buffer && typeof (buffer as any).toString === "function") {
    try {
      return (buffer as any).toString("base64");
    } catch (_) {
      // fall through
    }
  }
  const u8 = buffer instanceof Uint8Array ? buffer : new Uint8Array(buffer as ArrayBuffer);
  return Base64.fromUint8Array(u8);
}

serve(async (req: Request) => {
  // CORS allowlist
  const ALLOWED_ORIGINS = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "http://localhost:5174",
    "https://kalogoformationprofessionnelle.com",
  ];
  const origin = req.headers.get("origin") ?? "";
  const isAllowed = ALLOWED_ORIGINS.includes(origin);
  const corsHeaders: Record<string, string> = isAllowed
    ? {
        "Access-Control-Allow-Origin": origin,
        "Access-Control-Allow-Headers":
          "authorization, x-client-info, apikey, content-type",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        Vary: "Origin",
      }
    : { Vary: "Origin" };

  if (req.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: corsHeaders });
  }

  try {
    let body: any;
    try {
      body = await req.json();
    } catch (_) {
      return new Response(
        JSON.stringify({ success: false, error: "Malformed JSON in request body" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const { type, data } = body || {};
    if (!type || typeof type !== "string" || !data || typeof data !== "object") {
      return new Response(
        JSON.stringify({ success: false, error: "Missing or invalid 'type' or 'data' fields" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    // Generate Word document
    const buffer = await generateDocument(type, data);

    const filename =
      type === "application"
        ? `Candidature_${data.nom}_${data.prenoms}.docx`
        : `Inscription_${data.firstName}_${data.lastName}.docx`;

    // Build summary email
    let summaryHTML = "";
    if (type === "application") {
      summaryHTML = `
        <h2>Nouvelle Candidature</h2>
        <p><strong>Nom:</strong> ${data.nom} ${data.prenoms}</p>
        <p><strong>Date de naissance:</strong> ${data.dateNaissance}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Téléphone:</strong> ${data.telephone}</p>
        <p><strong>Formation choisie:</strong> ${data.intituleFormation}</p>
        <p><strong>Dernier diplôme:</strong> ${data.dernierDiplome}</p>
        <p><em>Voir document Word attaché pour les détails complets.</em></p>
      `;
    } else {
      summaryHTML = `
        <h2>Nouvelle Inscription à un Événement</h2>
        <p><strong>Événement:</strong> ${data.selectedEvent}</p>
        <p><strong>Nom:</strong> ${data.lastName} ${data.firstName}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Téléphone:</strong> ${data.phone}</p>
        <p><strong>Niveau:</strong> ${data.gradeLevel || "-"}</p>
        <p><strong>Message:</strong> ${data.message || "-"}</p>
        <p><em>Voir document Word attaché pour les détails complets.</em></p>
      `;
    }

    // Send email to school with Word doc
  const replyToRaw: string | undefined = data?.email || undefined;
    const { data: adminData, error: adminError } = await resend.emails.send({
      from: RESEND_FROM,
      to: RESEND_TO_ADMISSIONS,
      subject:
        type === "application"
          ? "Nouvelle Candidature Reçue"
          : "Nouvelle Inscription à un Événement",
      html: summaryHTML,
      attachments: [
        {
          filename,
          content: toBase64(buffer),
          encoding: "base64",
        },
      ],
      // Ensure replies go to the student (simple/raw for compatibility)
      reply_to: replyToRaw,
      headers: replyToRaw ? { "Reply-To": replyToRaw } : undefined,
    });
    if (adminError) {
      console.error("Resend admin email error:", adminError);
      throw new Error(adminError.message ?? "Failed to send admin email");
    }
    const adminEmailId = adminData?.id ?? null;

    // Validate student email format before sending confirmation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(String(data.email || ""))) {
      return new Response(
        JSON.stringify({ success: false, error: "Invalide email format" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    // Send confirmation to student (no attachment, discourage replies)
    const { data: studentData, error: studentError } = await resend.emails.send({
      from: RESEND_FROM,
      to: data.email,
      headers: {
        "Auto-Submitted": "auto-generated",
        "X-Auto-Response-Suppress": "All",
      },
      subject:
        type === "application"
          ? "Confirmation de votre candidature"
          : "Confirmation de votre inscription",
      html:
        (type === "application"
          ? `<p>Bonjour ${data.prenoms},</p>
             <p>Votre candidature a bien été reçue. Nous vous contacterons prochainement.</p>`
          : `<p>Bonjour ${data.firstName},</p>
             <p>Votre inscription à l’événement "${data.selectedEvent}" a bien été reçue. Nous vous contacterons prochainement.</p>`)
        + `<hr/>
           <p style="font-size:12px;color:#666">Cet email est envoyé depuis une adresse non surveillée. Merci de ne pas répondre à ce message. Pour toute question, contactez-nous à <a href="mailto:${RESEND_TO_ADMISSIONS}">${RESEND_TO_ADMISSIONS}</a>.</p>`,
    });
    if (studentError) {
      console.error("Resend student email error:", studentError);
      throw new Error(studentError.message ?? "Failed to send student email");
    }
    const studentEmailId = studentData?.id ?? null;

    return new Response(
      JSON.stringify({ success: true, adminEmailId, studentEmailId }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  } catch (error) {
    console.error("Error processing request:", error);
    const message = (error as any)?.message ?? String(error);
    return new Response(
      JSON.stringify({ success: false, error: message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }
});
