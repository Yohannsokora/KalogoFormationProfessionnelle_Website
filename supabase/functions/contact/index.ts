import { serve } from "https://deno.land/std@0.208.0/http/server.ts";
import { Resend } from "npm:resend";

// Env
const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
if (!RESEND_API_KEY) throw new Error("Missing RESEND_API_KEY environment variable");
const RESEND_FROM =
  Deno.env.get("RESEND_FROM") ??
  "Kalogo Formation Professionnelle <noreply@kalogoformationprofessionnelle.com>";
const RESEND_TO_ADMISSIONS =
  Deno.env.get("RESEND_TO_ADMISSIONS") ?? "franckyohanns@gmail.com";

const resend = new Resend(RESEND_API_KEY);

serve(async (req) => {
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

  if (req.method !== "POST") {
    return new Response("Method Not Allowed", { status: 405, headers: corsHeaders });
  }

  try {
    const body = await req.json().catch(() => ({}));
    const { firstName, lastName, email, phone, subject, message, inquiryType, hp } = body ?? {};

    // Honeypot: if present, drop the request as success (no email sent)
    if (typeof hp === 'string' && hp.trim().length > 0) {
      return new Response(
        JSON.stringify({ success: true, id: null }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    if (!firstName || !lastName || !email || !subject || !message) {
      return new Response(
        JSON.stringify({ success: false, error: "Missing required fields" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const fullName = `${firstName} ${lastName}`.trim();
    const safe = (s: unknown) => String(s ?? "-").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    const html = `
      <h2>Nouveau message de contact</h2>
      <p><strong>Nom:</strong> ${safe(fullName)}</p>
      <p><strong>Email:</strong> ${safe(email)}</p>
      <p><strong>Téléphone:</strong> ${safe(phone)}</p>
      <p><strong>Type de demande:</strong> ${safe(inquiryType)}</p>
      <p><strong>Objet:</strong> ${safe(subject)}</p>
      <p><strong>Message:</strong><br/>${safe(message).replace(/\n/g, "<br/>")}</p>
    `;

    const replyToRaw: string | undefined = email || undefined;
    const { data: adminData, error: adminError } = await resend.emails.send({
      from: RESEND_FROM,
      to: RESEND_TO_ADMISSIONS,
      subject: `Contact: ${subject}`,
      html,
      reply_to: replyToRaw,
      headers: replyToRaw ? { "Reply-To": replyToRaw } : undefined,
    });
    if (adminError) {
      console.error("Resend admin email error:", adminError);
      throw new Error(adminError.message ?? "Failed to send contact email");
    }

    // Optional confirmation to sender (non-reply)
    const isFeedback = String(inquiryType || '').toLowerCase() === 'feedback';
    const confirmSubject = isFeedback ? "Merci pour votre avis" : "Confirmation de votre message";
    const confirmHtml = isFeedback
      ? `<p>Bonjour ${safe(firstName)},</p><p>Merci pour votre avis sur notre site.</p>`
      : `<p>Bonjour ${safe(firstName)},</p>
         <p>Nous avons bien reçu votre message. Nous vous répondrons sous peu.</p>
         <hr/>
         <p style="font-size:12px;color:#666">Cet email est envoyé depuis une adresse non surveillée. Merci de ne pas répondre à ce message.</p>`;

    const { error: confirmError } = await resend.emails.send({
      from: RESEND_FROM,
      to: email,
      subject: confirmSubject,
      headers: {
        "Auto-Submitted": "auto-generated",
        "X-Auto-Response-Suppress": "All",
      },
      html: confirmHtml,
    });
    if (confirmError) {
      console.error("Resend confirmation error:", confirmError);
      // don't fail the whole request on confirmation failure
    }

    return new Response(
      JSON.stringify({ success: true, id: adminData?.id ?? null }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  } catch (err) {
    console.error("Contact function error:", err);
    const msg = (err as any)?.message ?? String(err);
    return new Response(
      JSON.stringify({ success: false, error: msg }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }
});
