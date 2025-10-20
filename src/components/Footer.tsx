import { MapPin, Phone, Mail, Facebook, Twitter, Instagram } from "lucide-react";

export function Footer({ onPageChange }: { onPageChange?: (page: string) => void }) {
  // Navigate to a page and optionally scroll to an anchor once it renders
  const goTo = (page: string, anchorId?: string) => {
    if (onPageChange) {
      onPageChange(page);
      if (anchorId) {
        // Allow the new page to render before attempting to scroll
        setTimeout(() => {
          const el = document.getElementById(anchorId);
          if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 50);
      }
    }
  };
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Infos École */}
          <div className="md:col-span-2">
            <div className="flex items-center mb-6">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center shadow-lg">
                <img
                  className="h-15 w-15 rounded-2xl"
                  src="/ChatGPT Image Sep 21, 2025 at 12_11_17 PM.png"
                  alt="Kalogo Formation Professionnelle"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className="ml-4">
                <h3 className="text-2xl font-bold">Kalogo Formation Professionnelle</h3>
                <p className="text-blue-300 text-sm">Former l’excellence suivie d'une insertion garantie</p>
              </div>
            </div>
            <p className="text-gray-300 mb-6 text-lg leading-relaxed max-w-md">
              Dédiée à l’excellence académique, au développement du caractère et à la préparation
              des leaders de demain grâce à une éducation innovante et des possibilités infinies.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-blue-400 transition-colors">
                <Facebook className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-300 hover:text-blue-400 transition-colors">
                <Twitter className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-300 hover:text-blue-400 transition-colors">
                <Instagram className="w-6 h-6" />
              </a>
            </div>
          </div>

          {/* Liens rapides */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-white">Liens rapides</h4>
            <ul className="space-y-3">
              <li>
                <button onClick={() => goTo('admissions')} className="text-gray-300 hover:text-blue-400 transition-colors text-left">
                  Admissions
                </button>
              </li>
              <li>
                <button onClick={() => goTo('academics', 'formation-qualifiante')} className="text-gray-300 hover:text-blue-400 transition-colors text-left">
                  Programmes
                </button>
              </li>
              <li>
                <button onClick={() => goTo('academics', 'vie-etudiante')} className="text-gray-300 hover:text-blue-400 transition-colors text-left">
                  Vie Étudiante
                </button>
              </li>
              <li>
                <a href="/Calendrier_Academique_KFP_Professionnel.pdf" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-blue-400 transition-colors">
                  Calendrier
                </a>
              </li>
              <li>
                <button onClick={() => goTo('home', 'actualites')} className="text-gray-300 hover:text-blue-400 transition-colors text-left">
                  Actualités & Événements
                </button>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-white">Contact</h4>
            <div className="space-y-4">
              <div className="flex items-start">
                <MapPin className="w-5 h-5 mt-1 mr-3 text-blue-400 flex-shrink-0" />
                <p className="text-gray-300">Man Lycee Club, Côte d’Ivoire</p>
              </div>
              <div className="flex items-center">
                <Phone className="w-5 h-5 mr-3 text-blue-400 shrink-0" />
                <p className="text-gray-300">+225 27 34 75 16 90 </p>
              </div>
              <div className="flex items-center">
                <Phone className="w-5 h-5 mr-3 text-blue-400 shrink-0" />
                <p className="text-gray-300">+225 07 02 55 69 73 </p>
              </div>
              <div className="flex items-center">
                <Phone className="w-5 h-5 mr-3 text-blue-400 shrink-0" />
                <p className="text-gray-300">WhatsApp: +225 01 01 56 12 35</p>
              </div>
              <div className="flex items-center w-full">
                <Mail className="w-5 h-5 mr-3 text-blue-400 shrink-0" />
                <p className="text-gray-300 whitespace-nowrap text-sm sm:text-base">
                    kalogoformationprofessionnelle@gmail.com
                </p>
              </div>

            </div>
          </div>
        </div>

        {/* Bas de page */}
        <div className="border-t border-gray-800 pt-8 mt-12">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 mb-4 md:mb-0">
              © 2025 Kalogo Formation Professionnelle. Tous droits réservés.
            </p>
            <div className="flex space-x-6 text-sm text-gray-400">
              <button onClick={() => goTo('privacy')} className="hover:text-blue-400 transition-colors">Politique de Confidentialité</button>
              <button onClick={() => goTo('terms')} className="hover:text-blue-400 transition-colors">Conditions d’utilisation</button>
              <button onClick={() => goTo('accessibility')} className="hover:text-blue-400 transition-colors">Accessibilité</button>
              <button onClick={() => goTo('feedback')} className="hover:text-blue-400 transition-colors">Donnez votre avis</button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
