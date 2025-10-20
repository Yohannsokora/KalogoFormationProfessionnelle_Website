import { Accessibility as A11yIcon, Eye, Keyboard, Volume2, MonitorSmartphone, BadgeCheck, ExternalLink, MessageSquare } from "lucide-react";
import { LEGAL_LAST_UPDATED } from "../lib/siteMeta";

export function Accessibility({ onPageChange }: { onPageChange?: (page: string) => void }) {
  return (
    <section className="bg-white text-gray-900">
      {/* Top banner */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
          <div className="mx-auto w-10 h-10 rounded-full bg-white/10 flex items-center justify-center mb-2">
            <A11yIcon className="w-5 h-5" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold">Déclaration d’Accessibilité</h1>
          <p className="text-xs mt-2 opacity-90">KFP s’engage pour une accessibilité numérique pour tous</p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Commitment card */}
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 mb-8">
          <div className="flex items-center gap-2 mb-2">
            <BadgeCheck className="w-4 h-4 text-blue-600" />
            <h2 className="text-sm font-semibold text-gray-800">Notre engagement pour l’accessibilité</h2>
          </div>
          <p className="text-sm text-gray-700">
            Nous veillons à ce que notre site et nos ressources numériques soient accessibles à
            tous, y compris aux personnes en situation de handicap. Nous travaillons
            continuellement à améliorer l’accessibilité et l’ergonomie afin d’atteindre ou de
            dépasser les exigences des WCAG 2.1 (niveau AA).
          </p>
        </div>

        {/* Accessibility features grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          <div className="rounded-lg border border-blue-100 bg-blue-50 p-4">
            <div className="flex items-center gap-2 mb-2 text-blue-900"><Eye className="w-4 h-4" /><div className="font-semibold text-sm">Accessibilité visuelle</div></div>
            <ul className="list-disc pl-5 text-sm text-blue-900 space-y-1">
              <li>Contrastes de couleurs renforcés</li>
              <li>Redimensionnement du texte sans perte de fonctionnalité</li>
              <li>Polices lisibles</li>
              <li>Textes alternatifs pour les images</li>
              <li>Rapports de contraste adéquats</li>
            </ul>
          </div>
          <div className="rounded-lg border border-blue-100 bg-blue-50 p-4">
            <div className="flex items-center gap-2 mb-2 text-blue-900"><Keyboard className="w-4 h-4" /><div className="font-semibold text-sm">Navigation au clavier</div></div>
            <ul className="list-disc pl-5 text-sm text-blue-900 space-y-1">
              <li>Ordre logique des tabulations</li>
              <li>Indicateurs de focus visibles</li>
              <li>Liens « Aller au contenu »</li>
              <li>Raccourcis clavier documentés</li>
            </ul>
          </div>
          <div className="rounded-lg border border-blue-100 bg-blue-50 p-4">
            <div className="flex items-center gap-2 mb-2 text-blue-900"><Volume2 className="w-4 h-4" /><div className="font-semibold text-sm">Lecteurs d’écran</div></div>
            <ul className="list-disc pl-5 text-sm text-blue-900 space-y-1">
              <li>Balises HTML sémantiques</li>
              <li>Libellés ARIA et descriptions</li>
              <li>Hiérarchie correcte des titres</li>
              <li>Libellés et instructions des formulaires</li>
              <li>Texte de lien descriptif</li>
            </ul>
          </div>
          <div className="rounded-lg border border-blue-100 bg-blue-50 p-4">
            <div className="flex items-center gap-2 mb-2 text-blue-900"><MonitorSmartphone className="w-4 h-4" /><div className="font-semibold text-sm">Conception responsive</div></div>
            <ul className="list-disc pl-5 text-sm text-blue-900 space-y-1">
              <li>Compatibilité mobile</li>
              <li>Optimisation tablette et bureau</li>
              <li>Éléments tactiles accessibles</li>
              <li>Reflow du contenu flexible</li>
              <li>Zoom jusqu’à 200&nbsp;%</li>
            </ul>
          </div>
        </div>

        {/* Standards and compliance */}
        <div className="space-y-4 mb-8">
          <div className="rounded-lg border border-blue-100 bg-blue-50 text-blue-900 p-4">
            <div className="text-xs font-semibold uppercase">WCAG 2.1 Niveau AA</div>
            <p className="text-sm">Nous suivons les recommandations du W3C afin de garantir un contenu perceptible, utilisable, compréhensible et robuste.</p>
          </div>
          <div className="rounded-lg border border-blue-100 bg-blue-50 text-blue-900 p-4">
            <div className="text-xs font-semibold uppercase">Conformité Section 508</div>
            <p className="text-sm">Lorsque pertinent, nous visons l’accessibilité des technologies de l’information pour les personnes en situation de handicap.</p>
          </div>
          <div className="rounded-lg border border-blue-100 bg-blue-50 text-blue-900 p-4">
            <div className="text-xs font-semibold uppercase">Bonnes pratiques internationales</div>
            <p className="text-sm">Nous nous alignons sur les standards internationaux et les lois ivoiriennes applicables.</p>
          </div>
        </div>

        {/* Assistive technologies */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          <div className="rounded-lg border border-gray-200 p-4">
            <div className="font-semibold text-sm mb-2">Lecteurs d’écran</div>
            <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1">
              <li>JAWS (Windows)</li>
              <li>NVDA (Windows)</li>
              <li>VoiceOver (macOS et iOS)</li>
              <li>TalkBack (Android)</li>
            </ul>
          </div>
          <div className="rounded-lg border border-gray-200 p-4">
            <div className="font-semibold text-sm mb-2">Autres outils</div>
            <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1">
              <li>Logiciels d’agrandissement d’écran</li>
              <li>Logiciels de reconnaissance vocale</li>
              <li>Claviers alternatifs</li>
              <li>Fonctionnalités d’accessibilité des navigateurs</li>
            </ul>
          </div>
        </div>

        {/* Recommended browsers */}
        <div className="rounded-lg border border-gray-200 p-4 mb-8">
          <div className="font-semibold text-sm mb-3">Navigateurs recommandés</div>
          <div className="flex flex-wrap gap-2 text-sm">
            <span className="px-3 py-1 rounded-full bg-gray-100 border">Google Chrome</span>
            <span className="px-3 py-1 rounded-full bg-gray-100 border">Mozilla Firefox</span>
            <span className="px-3 py-1 rounded-full bg-gray-100 border">Microsoft Edge</span>
            <span className="px-3 py-1 rounded-full bg-gray-100 border">Apple Safari</span>
          </div>
        </div>

        {/* Known limitations */}
        <div className="rounded-lg border border-gray-200 p-4 mb-8">
          <div className="font-semibold text-sm mb-2">Limites connues et améliorations continues</div>
          <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1">
            <li>Garantir l’accessibilité complète des documents PDF</li>
            <li>Ajout de sous‑titres et transcriptions pour les contenus vidéo</li>
            <li>Amélioration des messages d’erreur et de validation</li>
            <li>Renforcement des fonctionnalités d’accessibilité mobile</li>
            <li>Audits et tests réguliers d’accessibilité</li>
          </ul>
        </div>

        {/* Physical campus accessibility */}
        <div className="rounded-lg border border-gray-200 p-4 mb-8">
          <div className="font-semibold text-sm mb-2">Accessibilité du campus physique</div>
          <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1">
            <li>Entrées et cheminements accessibles</li>
            <li>Espaces de stationnement dédiés</li>
            <li>Sanitaires accessibles</li>
            <li>Salles de classe accessibles</li>
            <li>Services d’accompagnement pour les étudiants</li>
          </ul>
        </div>

        {/* Third-party content */}
        <div className="rounded-lg border border-gray-200 p-4 mb-8">
          <div className="flex items-center gap-2 mb-2"><ExternalLink className="w-4 h-4 text-blue-600" /><div className="font-semibold text-sm">Contenu tiers</div></div>
          <p className="text-sm text-gray-700">Certains contenus peuvent être fournis par des tiers. Bien que nous sensibilisions ces partenaires aux standards d’accessibilité, nous ne pouvons pas garantir l’accessibilité des ressources externes.</p>
        </div>

        {/* Feedback and assistance */}
        <div className="rounded-lg border border-blue-100 bg-blue-50 text-blue-900 p-4 mb-6">
          <div className="flex items-center gap-2 mb-2"><MessageSquare className="w-4 h-4" /><div className="font-semibold text-sm">Retour et assistance</div></div>
          <p className="text-sm mb-2">Si vous rencontrez un obstacle d’accessibilité, dites‑le nous afin que nous puissions intervenir rapidement.</p>
          <div className="text-sm">
            E‑mail : <a className="underline" href="mailto:kalogoformationprofessionnelle@gmail.com">kalogoformationprofessionnelle@gmail.com</a>
            <span className="mx-2">•</span>
            <button onClick={() => onPageChange?.('feedback')} className="underline">Donnez votre avis</button>
          </div>
          <p className="text-xs mt-2">Délai de réponse visé : sous 2 à 3 jours ouvrés.</p>
        </div>

        {/* Alternative formats */}
          <p className="text-xs text-gray-600 text-center">Cette déclaration d’accessibilité a été mise à jour le {LEGAL_LAST_UPDATED}.</p>
      </div>
    </section>
  );
}
