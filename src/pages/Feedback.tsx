import { useState } from "react";
import { Send, Lightbulb, Star, Bug } from "lucide-react";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Button } from "../components/ui/button";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "../components/ui/select";
import toast from "react-hot-toast";
import { sendContactMessage } from "../utils/sendContactMessage";
import { supabase } from "../lib/supabaseClient";
import { Input as BaseInput } from "../components/ui/input";

export function Feedback({ onPageChange }: { onPageChange?: (page: string) => void }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [category, setCategory] = useState("");
  const [rating, setRating] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [hp, setHp] = useState("");
  const [authChecked, setAuthChecked] = useState(false);
  const [authed, setAuthed] = useState(false);

  const minChars = 20;

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!authed) return toast.error("Veuillez vous connecter pour soumettre un avis.");
    if (!name.trim()) return toast.error("Le nom est requis.");
    if (!email.trim()) return toast.error("L’e-mail est requis.");
    const parsedPhone = parseCIPhone(phone);
    if (!parsedPhone) return toast.error("Téléphone ivoirien requis (+225 et 10 chiffres).");
    if (!subject.trim()) return toast.error("L’objet est requis.");
    if (!message || message.trim().length < minChars)
      return toast.error(`Le message doit contenir au moins ${minChars} caractères.`);

    setLoading(true);
    try {
      const composed = [
        category ? `Catégorie: ${category}` : undefined,
        rating ? `Évaluation globale: ${rating}/5` : undefined,
        "",
        message.trim(),
      ]
        .filter(Boolean)
        .join("\n");

      await sendContactMessage({
        firstName: name,
        lastName: "Feedback",
        email,
        phone: parsedPhone.e164,
        subject: subject,
        inquiryType: "feedback",
        message: composed,
        hp,
      });
      toast.success("Merci pour votre avis !");
      setName("");
      setEmail("");
      setCategory("");
      setRating("");
      setSubject("");
      setMessage("");
    } catch (err: any) {
      toast.error(err?.message ?? "Échec de l’envoi");
    } finally {
      setLoading(false);
    }
  };

  const clear = () => {
    setName("");
    setEmail("");
    setCategory("");
    setRating("");
    setSubject("");
    setMessage("");
  };

  // CI phone normalization used across the site
  const parseCIPhone = (raw: string) => {
    const digits = (raw || "").replace(/\D/g, "");
    let nsn = digits;
    if (digits.startsWith("225")) nsn = digits.slice(3);
    if (digits.startsWith("+225")) nsn = digits.slice(4);
    if (nsn.length !== 10) return null;
    return { e164: `+225${nsn}`, nsn };
  };

  // Require sign-in to access the page; prefill name/email when possible
  useState(() => {
    (async () => {
      const { data } = await supabase.auth.getUser();
      if (data.user) {
        setAuthed(true);
        const fullName = data.user.user_metadata?.full_name || data.user.email?.split("@")[0] || "";
        setName(fullName);
        setEmail(data.user.email || "");
      } else {
        const url = new URL(window.location.href);
        url.searchParams.set("page", "feedback");
        await supabase.auth.signInWithOAuth({ provider: 'google', options: { redirectTo: url.toString() } });
      }
      setAuthChecked(true);
    })();
  });

  if (!authChecked) {
    return (
      <section className="bg-white text-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <p className="text-gray-600">Chargement…</p>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-white text-gray-900">
      {/* Top banner */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center">
          <p className="text-xs uppercase tracking-wider opacity-90">Retour sur le site</p>
          <h1 className="text-2xl sm:text-3xl font-bold mt-1">Aidez-nous à améliorer votre expérience</h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Intro card with features */}
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-5 mb-8">
          <p className="text-gray-600 mb-4">
            Votre avis est précieux. Que ce soit pour partager des idées, évaluer votre expérience
            ou signaler un bug, vos retours nous aident à offrir un site meilleur pour toute la
            communauté.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="rounded-lg border border-gray-200 p-4 text-center">
              <div className="mx-auto mb-2 w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
                <Lightbulb className="w-5 h-5" />
              </div>
              <div className="font-semibold">Proposer des idées</div>
              <div className="text-xs text-gray-500">Nouvelles fonctionnalités ou améliorations</div>
            </div>
            <div className="rounded-lg border border-gray-200 p-4 text-center">
              <div className="mx-auto mb-2 w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
                <Star className="w-5 h-5" />
              </div>
              <div className="font-semibold">Évaluer l’expérience</div>
              <div className="text-xs text-gray-500">Dites-nous comment nous nous en sortons</div>
            </div>
            <div className="rounded-lg border border-gray-200 p-4 text-center">
              <div className="mx-auto mb-2 w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
                <Bug className="w-5 h-5" />
              </div>
              <div className="font-semibold">Signaler un problème</div>
              <div className="text-xs text-gray-500">Aidez-nous à corriger les soucis techniques</div>
            </div>
          </div>
        </div>

        {/* Form card */}
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-5 mb-8">
          <h2 className="text-sm font-semibold text-gray-700 mb-4">Soumettre votre retour</h2>
          <form onSubmit={submit} className="space-y-4">
            {/* Honeypot */}
            <input type="text" value={hp} onChange={(e) => setHp(e.target.value)} className="hidden" aria-hidden="true" tabIndex={-1} autoComplete="off" />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Nom <span className="text-red-600">*</span></label>
                <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Votre nom" required />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">E-mail <span className="text-red-600">*</span></label>
                <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="vous@exemple.com" required />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Numéro de téléphone (Côte d’Ivoire) <span className="text-red-600">*</span></label>
              <BaseInput type="tel" inputMode="tel" autoComplete="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Ex: +225 01 01 45 67 89" required />
              <p className="text-xs text-gray-500 mt-1">Format: +225 suivi de 10 chiffres (mobiles 01/05/07…)</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Catégorie du retour</label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choisir une catégorie" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Suggestion d’amélioration">Suggestion d’amélioration</SelectItem>
                    <SelectItem value="Problème technique">Problème technique</SelectItem>
                    <SelectItem value="Contenu / Orthographe">Contenu / Orthographe</SelectItem>
                    <SelectItem value="Accessibilité">Accessibilité</SelectItem>
                    <SelectItem value="Performance">Performance</SelectItem>
                    <SelectItem value="Autre">Autre</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Évaluation globale du site</label>
                <Select value={rating} onValueChange={setRating}>
                  <SelectTrigger>
                    <SelectValue placeholder="Notez votre expérience" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="5">5 - Excellent</SelectItem>
                    <SelectItem value="4">4 - Très bien</SelectItem>
                    <SelectItem value="3">3 - Moyen</SelectItem>
                    <SelectItem value="2">2 - Médiocre</SelectItem>
                    <SelectItem value="1">1 - À améliorer</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Objet <span className="text-red-600">*</span></label>
              <Input value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="Bref résumé de votre retour" required />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Votre message <span className="text-red-600">*</span></label>
              <Textarea value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Donnez des détails. Incluez des exemples précis, des URL de pages ou les étapes pour reproduire un problème…" rows={6} required />
              <p className="text-xs text-gray-500 mt-1">Minimum {minChars} caractères. Soyez précis pour nous aider à traiter votre retour.</p>
            </div>

            <div className="flex items-center gap-3">
              <Button type="button" variant="secondary" onClick={clear} className="bg-gray-100 text-gray-700 hover:bg-gray-200">Effacer</Button>
              <Button type="submit" disabled={loading} className="inline-flex items-center gap-2">
                <Send className="w-4 h-4" />
                {loading ? "Envoi…" : "Soumettre l’avis"}
              </Button>
            </div>
          </form>
        </div>

        {/* What happens next panel */}
        <div className="bg-blue-50 border border-blue-100 text-blue-900 rounded-lg p-5">
          <h3 className="font-semibold mb-2">Et après ?</h3>
          <ul className="list-disc pl-5 space-y-1 text-sm">
            <li>Notre équipe web examine votre retour sous 2–3 jours ouvrés.</li>
            <li>Pour les problèmes techniques, nous priorisons selon la gravité.</li>
            <li>Les suggestions peuvent être planifiées pour de futures mises à jour.</li>
            <li>Nous pourrions vous recontacter si des précisions sont nécessaires.</li>
          </ul>
          <p className="text-xs text-blue-800 mt-3">
            Pour toute demande urgente sans lien avec le site, veuillez utiliser la page <button className="underline" onClick={() => onPageChange?.('contact')}>Contact</button>.
          </p>
        </div>
      </div>
    </section>
  );
}
