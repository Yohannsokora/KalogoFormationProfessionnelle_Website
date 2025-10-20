import { serve } from "std/server";
import { generateDocument } from "./lib/generate-document.ts";
import { Resend } from "npm:resend";

const resend = new Resend(Deno.env.get("RESEND_API_KEY")!);
const RESEND_FROM = Deno.env.get("RESEND_FROM") ?? "Kalogo Formation Professionnelle <noreply@kalogoformationprofessionnelle.com>"; // Set to a verified sender in Resend
const RESEND_TO_ADMISSIONS = Deno.env.get("RESEND_TO_ADMISSIONS") ?? "franckyohanns@gmail.com";

function toBase64(buffer: any): string {
  // Prefer Node-style Buffer base64 if available
  if (buffer && typeof buffer.toString === "function") {
    try {
      return buffer.toString("base64");
    } catch (_) {
      // fall through to Uint8Array approach
    }
  }
  const u8 = buffer instanceof Uint8Array ? buffer : new Uint8Array(buffer);
  let binary = "";
  const chunkSize = 0x8000;
  for (let i = 0; i < u8.length; i += chunkSize) {
    const sub = u8.subarray(i, i + chunkSize);
    binary += String.fromCharCode(...sub as any);
  }
  return btoa(binary);
}

serve(async (req: Request) => {
  try {
    const { type, data } = await req.json();

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

    // 📧 Send email to school with Word doc
    await resend.emails.send({
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
    });

    // 📧 Send confirmation to student (no attachment)
    await resend.emails.send({
      from: RESEND_FROM,
      to: data.email,
      subject:
        type === "application"
          ? "Confirmation de votre candidature"
          : "Confirmation de votre inscription",
      html:
        type === "application"
          ? `<p>Bonjour ${data.prenoms},</p>
             <p>Votre candidature a bien été reçue. Nous vous contacterons prochainement.</p>`
          : `<p>Bonjour ${data.firstName},</p>
             <p>Votre inscription à l’événement "${data.selectedEvent}" a bien été reçue. Nous vous contacterons prochainement.</p>`,
    });

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error: any) {
    console.error("Error processing request:", error);
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { status: 500 }
    );
  }
});
