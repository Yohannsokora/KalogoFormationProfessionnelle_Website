import { useState } from "react";
import { Menu, X } from "lucide-react";

interface HeaderProps {
  currentPage: string;
  onPageChange: (page: string) => void;
}

export function Header({ currentPage, onPageChange }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigation = [
    { name: "Accueil", href: "home" },
    { name: "À propos", href: "about" },
    { name: "Programmes", href: "academics" },
    { name: "Admissions", href: "admissions" },
    { name: "Contact", href: "contact" },
  ];

  return (
    <header className="bg-white shadow-lg border-b border-gray-200 sticky top-0 z-50 pt-[env(safe-area-inset-top)]">
      {/* Bandeau d’annonce */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-center py-1.5 text-xs sm:text-sm">
        <div className="max-w-7xl mx-auto px-4">
          🎓 <strong>Inscriptions ouvertes :</strong> Postulez dès maintenant pour la rentrée 2026 •
          <span
            className="ml-1 sm:ml-2 cursor-pointer hover:underline font-medium"
            onClick={() => onPageChange("admissions")}
          >
            En savoir plus →
          </span>
        </div>
      </div>

      {/* header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
  <div className="flex justify-between items-center h-auto py-3 md:h-20 md:py-0">
          {/* Logo */}
          <div className="flex items-center min-w-0 flex-1 pr-16 sm:pr-0">
            <div className="flex-shrink-0 flex items-center">
              <img
                className="h-12 w-12 sm:h-16 sm:w-16 md:h-20 md:w-20"
                src="/ChatGPT Image Sep 21, 2025 at 12_11_17 PM.png"
                alt="Kalogo Formation Professionnelle"
                loading="lazy"
                decoding="async"
              />
              <div className="ml-4 min-w-0">
                <h1 className="text-base sm:text-xl md:text-2xl font-bold text-gray-900 leading-snug truncate">
                  Kalogo Formation Professionnelle
                </h1>
                <p className="text-[11px] sm:text-sm text-gray-600 mt-1 whitespace-normal leading-snug max-w-[13.5rem] sm:max-w-none">
                  Formation professionelle d'excellence, insertion assuree
                </p>
              </div>
            </div>
          </div>

          {/* Navigation bureau */}
          <div className="hidden md:flex items-center">
            <nav className="flex flex-wrap gap-1 mr-2">
              {navigation.map((item) => (
                <button
                  key={item.name}
                  onClick={() => onPageChange(item.href)}
                  className={`px-3 py-2 rounded-lg font-medium transition-all duration-200 ${
                    currentPage === item.href
                      ? "text-blue-600 bg-blue-50 shadow-sm"
                      : "text-gray-700 hover:text-blue-600 hover:bg-blue-50"
                  }`}
                >
                  {item.name}
                </button>
              ))}
            </nav>
          </div>

          {/* Bouton menu mobile */}
          <div className="md:hidden flex items-center flex-shrink-0 ml-3">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-600 hover:text-blue-600 p-3"
              aria-label="Toggle navigation"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Navigation mobile */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <nav className="flex flex-col space-y-2">
              {navigation.map((item) => (
                <button
                  key={item.name}
                  onClick={() => {
                    onPageChange(item.href);
                    setIsMenuOpen(false);
                  }}
                  className={`px-3 py-2 rounded-md text-left transition-colors ${
                    currentPage === item.href
                      ? "text-blue-600 bg-blue-50"
                      : "text-gray-600 hover:text-blue-600 hover:bg-blue-50"
                  }`}
                >
                  {item.name}
                </button>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
