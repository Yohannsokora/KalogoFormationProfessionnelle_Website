import { supabase } from "../lib/supabaseClient";

type SubmissionType = "registration" | "application";

/**
 * Sends a submission to the unified Edge Function.
 * 
 * @param type - The type of submission ("registration" or "application").
 * @param data - The data object to be sent.
 */
export async function sendSubmission<T extends object>(
  type: SubmissionType,
  data: T
) {
  const { data: result, error } = await supabase.functions.invoke("submit", {
    body: { type, data },
  });

  if (error) {
    console.error("Supabase function error:", error);
    throw new Error(error.message || "Erreur lors de l'envoi du formulaire");
  }

  return result;
}
