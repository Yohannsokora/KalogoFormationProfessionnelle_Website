import { supabase } from "../lib/supabaseClient";

export type ContactPayload = {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  inquiryType?: string;
  subject: string;
  message: string;
  // Optional honeypot field for spam mitigation
  hp?: string;
};

export async function sendContactMessage(payload: ContactPayload) {
  const { data, error } = await supabase.functions.invoke("contact", {
    body: payload,
  });

  if (error) {
    console.error("Supabase function error (contact):", error);
    throw new Error(error.message || "Échec de l'envoi du message");
  }

  return data as { success: boolean; id?: string | null; error?: string };
}
