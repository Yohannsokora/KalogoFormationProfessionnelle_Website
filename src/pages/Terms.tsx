import { FileText, CheckCircle2, ShieldAlert, BookOpen, CalendarCheck, AlertCircle, Link2, Scale, Scissors, FileCheck, Mail } from "lucide-react";
import { LEGAL_LAST_UPDATED } from "../lib/siteMeta";

export function Terms({ onPageChange }: { onPageChange?: (page: string) => void }) {
  return (
    <section className="bg-white text-gray-900">
      {/* Top banner */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
          <div className="mx-auto w-10 h-10 rounded-full bg-white/10 flex items-center justify-center mb-2">
            <FileText className="w-5 h-5" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold">Conditions d’utilisation</h1>
          <p className="text-xs mt-2 opacity-90">Dernière mise à jour : {LEGAL_LAST_UPDATED}</p>
        </div>
      </div>

      {/* Content card */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 space-y-8">
          <p className="text-gray-700">
            En accédant au site de Kalogo Formation Professionnelle (KFP) et en l’utilisant, vous
            acceptez les présentes conditions. Elles complètent les lois ivoiriennes applicables et
            les bonnes pratiques internationales d’utilisation de services en ligne.
          </p>

          {/* Acceptation des conditions */}
          <section>
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle2 className="w-4 h-4 text-blue-600" />
              <h2 className="text-sm font-semibold text-gray-800">Acceptation des conditions</h2>
            </div>
            <p className="text-sm text-gray-700">
              En naviguant sur ce site, vous confirmez avoir lu, compris et accepté ces conditions
              ainsi que notre Politique de Confidentialité. Si vous n’êtes pas d’accord, veuillez ne
              pas utiliser le site.
            </p>
          </section>

          {/* Utilisation du site */}
          <section>
            <div className="flex items-center gap-2 mb-2">
              <BookOpen className="w-4 h-4 text-blue-600" />
              <h2 className="text-sm font-semibold text-gray-800">Utilisation du site</h2>
            </div>
            <h3 className="text-sm font-medium text-gray-700">Usages permis</h3>
            <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1 mt-2">
              <li>Découvrir nos programmes et services</li>
              <li>Soumettre des demandes d’admission</li>
              <li>Accéder à des informations scolaires</li>
              <li>Communiquer avec l’équipe KFP</li>
              <li>S’inscrire à des événements</li>
            </ul>
            <h3 className="text-sm font-medium text-gray-700 mt-3">Usages interdits</h3>
            <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1 mt-2">
              <li>Violation de lois ou de droits de propriété intellectuelle</li>
              <li>Diffusion de contenus nuisibles, offensants ou illicites</li>
              <li>Tentatives d’accès non autorisé ou d’entrave au service</li>
              <li>Collecte de données personnelles sans consentement</li>
              <li>Usurpation d’identité ou automatisation abusive d’accès</li>
            </ul>
          </section>

          {/* Comptes et soumissions */}
          <section>
            <div className="flex items-center gap-2 mb-2">
              <FileCheck className="w-4 h-4 text-blue-600" />
              <h2 className="text-sm font-semibold text-gray-800">Comptes, candidatures et communications</h2>
            </div>
            <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1">
              <li>Fournir des informations exactes et à jour</li>
              <li>Protéger vos identifiants et signaler tout accès non autorisé</li>
              <li>Accepter la responsabilité des actions menées sous votre compte</li>
            </ul>
          </section>

          {/* Admission */}
          <section>
            <div className="flex items-center gap-2 mb-2">
              <FileCheck className="w-4 h-4 text-blue-600" />
              <h2 className="text-sm font-semibold text-gray-800">Processus d’admission</h2>
            </div>
            <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1">
              <li>Les informations soumises doivent être exactes et véridiques</li>
              <li>Les frais peuvent être non remboursables (le cas échéant)</li>
              <li>Les décisions d’admission relèvent de KFP</li>
            </ul>
          </section>

          {/* Événements */}
          <section>
            <div className="flex items-center gap-2 mb-2">
              <CalendarCheck className="w-4 h-4 text-blue-600" />
              <h2 className="text-sm font-semibold text-gray-800">Inscriptions aux événements</h2>
            </div>
            <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1">
              <li>Sous réserve de disponibilité et de règles propres à chaque événement</li>
              <li>Consignes de sécurité et de conduite à respecter</li>
              <li>Possibilité de prises de vues/photographies lors d’événements</li>
            </ul>
          </section>

          {/* Propriété intellectuelle */}
          <section>
            <div className="flex items-center gap-2 mb-2">
              <ShieldAlert className="w-4 h-4 text-blue-600" />
              <h2 className="text-sm font-semibold text-gray-800">Propriété intellectuelle</h2>
            </div>
            <p className="text-sm text-gray-700">
              Les contenus du site (textes, images, logos, etc.) sont protégés par le droit d’auteur
              et autres droits applicables. Toute reproduction non autorisée est interdite.
            </p>
          </section>

          {/* Avertissement et responsabilité */}
          <section>
            <div className="flex items-center gap-2 mb-2">
              <AlertCircle className="w-4 h-4 text-blue-600" />
              <h2 className="text-sm font-semibold text-gray-800">Avertissement et limitation de responsabilité</h2>
            </div>
            <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1">
              <li>Le site est fourni « en l’état » et « selon disponibilité »</li>
              <li>Aucune garantie de disponibilité continue ou d’absence d’erreurs</li>
              <li>Dans les limites de la loi ivoirienne, KFP décline toute responsabilité pour les dommages indirects</li>
            </ul>
          </section>

          {/* Liens tiers */}
          <section>
            <div className="flex items-center gap-2 mb-2">
              <Link2 className="w-4 h-4 text-blue-600" />
              <h2 className="text-sm font-semibold text-gray-800">Liens et services tiers</h2>
            </div>
            <p className="text-sm text-gray-700">
              KFP n’est pas responsable du contenu ou des pratiques de confidentialité des sites ou
              services tiers référencés.
            </p>
          </section>

          {/* Droit applicable */}
          <section>
            <div className="flex items-center gap-2 mb-2">
              <Scale className="w-4 h-4 text-blue-600" />
              <h2 className="text-sm font-semibold text-gray-800">Droit applicable et juridiction</h2>
            </div>
            <p className="text-sm text-gray-700">
              Les présentes sont régies par le droit ivoirien. Les litiges seront soumis aux
              juridictions compétentes en Côte d’Ivoire après tentative de résolution amiable.
            </p>
          </section>

          {/* Divisibilité et accord complet */}
          <section className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Scissors className="w-4 h-4 text-blue-600" />
                <h2 className="text-sm font-semibold text-gray-800">Divisibilité</h2>
              </div>
              <p className="text-sm text-gray-700">Si une clause est jugée invalide, le reste demeure applicable.</p>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-2">
                <FileCheck className="w-4 h-4 text-blue-600" />
                <h2 className="text-sm font-semibold text-gray-800">Accord complet</h2>
              </div>
              <p className="text-sm text-gray-700">Ces conditions, avec la Politique de Confidentialité, constituent l’accord complet.</p>
            </div>
          </section>

          {/* Modifications */}
          <section>
            <div className="flex items-center gap-2 mb-2">
              <FileText className="w-4 h-4 text-blue-600" />
              <h2 className="text-sm font-semibold text-gray-800">Modifications des conditions</h2>
            </div>
            <p className="text-sm text-gray-700">Nous pouvons mettre à jour ces conditions. La version publiée sur le site fait foi.</p>
          </section>

          {/* Contact */}
          <section>
            <div className="flex items-center gap-2 mb-2">
              <Mail className="w-4 h-4 text-blue-600" />
              <h2 className="text-sm font-semibold text-gray-800">Contact</h2>
            </div>
            <div className="rounded-lg border border-blue-100 bg-blue-50 text-blue-900 p-4">
              <div className="font-semibold">Kalogo Formation Professionnelle</div>
              <div className="text-sm">Man Lycee Club, Côte d’Ivoire</div>
              <div className="text-sm">E‑mail : <a className="underline" href="mailto:kalogoformationprofessionnelle@gmail.com">kalogoformationprofessionnelle@gmail.com</a></div>
              <div className="text-sm">Tél. : +225 27 34 75 16 90 / +225 07 02 55 69 73</div>
            </div>
          </section>

          <p className="text-xs text-gray-600">Des suggestions ? <button className="text-blue-600 underline" onClick={() => onPageChange?.('feedback')}>Donnez votre avis sur le site</button>.</p>
        </div>
      </div>
    </section>
  );
}
