import { Shield, Info, Eye, Share2, Lock, Mail } from "lucide-react";
import { LEGAL_LAST_UPDATED } from "../lib/siteMeta";

export function Privacy({ onPageChange }: { onPageChange?: (page: string) => void }) {
  return (
    <section className="bg-white text-gray-900">
      {/* Top banner */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
          <div className="mx-auto w-10 h-10 rounded-full bg-white/10 flex items-center justify-center mb-2">
            <Shield className="w-5 h-5" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold">Politique de Confidentialité</h1>
          <p className="text-xs mt-2 opacity-90">Dernière mise à jour : {LEGAL_LAST_UPDATED}</p>
        </div>
      </div>

      {/* Content card */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 space-y-8">
          <p className="text-gray-700">
            Kalogo Formation Professionnelle (KFP) s’engage à protéger vos données personnelles. La
            présente politique explique comment nous collectons, utilisons, partageons et protégeons
            vos informations lorsque vous visitez notre site ou utilisez nos services. Nous suivons
            la loi ivoirienne n° 2013-450 relative à la protection des données à caractère
            personnel, et nous nous alignons sur les bonnes pratiques internationales (y compris le
            RGPD lorsque pertinent).
          </p>

          {/* Informations collectées */}
          <section>
            <div className="flex items-center gap-2 mb-2">
              <Info className="w-4 h-4 text-blue-600" />
              <h2 className="text-sm font-semibold text-gray-800">Informations que nous collectons</h2>
            </div>
            <h3 className="text-sm font-medium text-gray-700">Informations personnelles</h3>
            <p className="text-gray-700 text-sm">Nous pouvons collecter des informations lorsque vous :</p>
            <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1 mt-2">
              <li>Soumettez une candidature d’admission</li>
              <li>Vous inscrivez à des événements scolaires ou programmes</li>
              <li>Contactez l’école via nos formulaires</li>
              <li>Vous abonnez à nos communications</li>
              <li>Participez à des enquêtes ou formulaires d’avis</li>
            </ul>
            <p className="text-gray-700 text-sm mt-2">
              Ces données peuvent inclure : nom, prénom, e‑mail, numéro de téléphone (+225 …),
              adresse postale, date de naissance, informations de scolarité, etc.
            </p>

            <h3 className="text-sm font-medium text-gray-700 mt-4">Informations collectées automatiquement</h3>
            <p className="text-gray-700 text-sm">Lors de votre navigation sur notre site, nous pouvons collecter :</p>
            <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1 mt-2">
              <li>Adresse IP et type de navigateur</li>
              <li>Système d’exploitation et informations sur l’appareil</li>
              <li>Pages consultées et temps passé</li>
              <li>Sites référents</li>
            </ul>
          </section>

          {/* Utilisation */}
          <section>
            <div className="flex items-center gap-2 mb-2">
              <Eye className="w-4 h-4 text-blue-600" />
              <h2 className="text-sm font-semibold text-gray-800">Comment nous utilisons vos informations</h2>
            </div>
            <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1">
              <li>Traiter les admissions et les inscriptions</li>
              <li>Communiquer avec les élèves, parents et familles intéressées</li>
              <li>Gérer les événements et programmes scolaires</li>
              <li>Améliorer notre site et nos services</li>
              <li>Assurer la sécurité et la prévention des fraudes</li>
              <li>Répondre aux demandes et fournir l’assistance</li>
            </ul>
          </section>

          {/* Partage */}
          <section>
            <div className="flex items-center gap-2 mb-2">
              <Share2 className="w-4 h-4 text-blue-600" />
              <h2 className="text-sm font-semibold text-gray-800">Partage et divulgation des informations</h2>
            </div>
            <p className="text-sm text-gray-700">
              Nous ne vendons ni ne louons vos données. Nous pouvons les partager uniquement dans
              les cas suivants :
            </p>
            <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1 mt-2">
              <li><span className="font-medium">Prestataires de services</span> (hébergement, e‑mail, outils cloud) soumis à des obligations de confidentialité.</li>
              <li><span className="font-medium">Exigences légales</span> lorsque la loi l’impose.</li>
              <li><span className="font-medium">Fonctions pédagogiques</span> au sein de KFP pour des besoins légitimes.</li>
              <li><span className="font-medium">Situations d’urgence</span> pour la sécurité des personnes.</li>
            </ul>
          </section>

          {/* Sécurité */}
          <section>
            <div className="flex items-center gap-2 mb-2">
              <Lock className="w-4 h-4 text-blue-600" />
              <h2 className="text-sm font-semibold text-gray-800">Sécurité des données</h2>
            </div>
            <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1">
              <li>Infrastructure sécurisée et chiffrement lorsque approprié</li>
              <li>Évaluations régulières et mises à jour</li>
              <li>Contrôles d’accès et procédures d’authentification</li>
              <li>Sensibilisation et bonnes pratiques</li>
            </ul>
            <p className="text-xs text-gray-500 mt-2">Aucune méthode n’offre une sécurité absolue sur Internet.</p>
          </section>

          {/* Droits */}
          <section>
            <div className="flex items-center gap-2 mb-2">
              <Info className="w-4 h-4 text-blue-600" />
              <h2 className="text-sm font-semibold text-gray-800">Vos droits</h2>
            </div>
            <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1">
              <li>Accès à vos données</li>
              <li>Rectification des informations inexactes</li>
              <li>Effacement, sous réserve d’obligations légales</li>
              <li>Opposition / désinscription aux communications marketing</li>
              <li>Portabilité des données</li>
            </ul>
            <p className="text-sm text-gray-700 mt-2">
              Pour exercer vos droits, contactez-nous à
              <a className="text-blue-600" href="mailto:kalogoformationprofessionnelle@gmail.com"> kalogoformationprofessionnelle@gmail.com</a>.
              Vous pouvez également saisir l’ARTCI (Autorité de Régulation des Télécommunications/TIC).
            </p>
          </section>

          {/* Mineurs */}
          <section>
            <div className="flex items-center gap-2 mb-2">
              <Info className="w-4 h-4 text-blue-600" />
              <h2 className="text-sm font-semibold text-gray-800">Vie privée des enfants</h2>
            </div>
            <p className="text-sm text-gray-700">
              Nos services visent principalement les élèves, parents et tuteurs. Lorsque des
              données de mineurs sont traitées, l’autorisation du représentant légal est requise
              conformément à la loi.
            </p>
          </section>

          {/* Cookies */}
          <section>
            <div className="flex items-center gap-2 mb-2">
              <Info className="w-4 h-4 text-blue-600" />
              <h2 className="text-sm font-semibold text-gray-800">Cookies et technologies de suivi</h2>
            </div>
            <p className="text-sm text-gray-700">Nous utilisons des cookies pour :</p>
            <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1 mt-2">
              <li>Mémoriser vos préférences</li>
              <li>Comprendre l’utilisation du site</li>
              <li>Améliorer les performances et les fonctionnalités</li>
            </ul>
            <p className="text-xs text-gray-500 mt-2">Vous pouvez gérer vos préférences via les paramètres de votre navigateur.</p>
          </section>

          {/* Sites tiers */}
          <section>
            <div className="flex items-center gap-2 mb-2">
              <Info className="w-4 h-4 text-blue-600" />
              <h2 className="text-sm font-semibold text-gray-800">Sites web tiers</h2>
            </div>
            <p className="text-sm text-gray-700">
              Notre site peut contenir des liens vers des services tiers. KFP n’est pas responsable
              de leurs pratiques de confidentialité. Nous vous encourageons à consulter leurs
              politiques.
            </p>
          </section>

          {/* Modifications */}
          <section>
            <div className="flex items-center gap-2 mb-2">
              <Info className="w-4 h-4 text-blue-600" />
              <h2 className="text-sm font-semibold text-gray-800">Modifications de cette politique</h2>
            </div>
            <p className="text-sm text-gray-700">
              Nous pouvons mettre à jour cette politique pour refléter des changements légaux ou
              opérationnels. La mention « Dernière mise à jour » ci‑dessus indique la date de
              révision.
            </p>
          </section>

          {/* Contact */}
          <section>
            <div className="flex items-center gap-2 mb-2">
              <Mail className="w-4 h-4 text-blue-600" />
              <h2 className="text-sm font-semibold text-gray-800">Contactez‑nous</h2>
            </div>
            <div className="rounded-lg border border-blue-100 bg-blue-50 text-blue-900 p-4">
              <div className="font-semibold">Kalogo Formation Professionnelle</div>
              <div className="text-sm">Man Lycee Club, Côte d’Ivoire</div>
              <div className="text-sm">E‑mail : <a className="underline" href="mailto:kalogoformationprofessionnelle@gmail.com">kalogoformationprofessionnelle@gmail.com</a></div>
              <div className="text-sm">Tél. : +225 27 34 75 16 90 / +225 07 02 55 69 73</div>
            </div>
          </section>

          <p className="text-xs text-gray-600">Un retour ? <button className="text-blue-600 underline" onClick={() => onPageChange?.('feedback')}>Donnez votre avis sur le site</button>.</p>
        </div>
      </div>
    </section>
  );
}
