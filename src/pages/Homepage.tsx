import { Hero } from "../components/Hero";
import { useState } from "react";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import {
  Users,
  GraduationCap,
  Award,
  Calendar,
  ArrowRight,
  BookOpen,
  Globe,
  Trophy,
  ChevronRight,
} from "lucide-react";
import { ScheduleVisitModal } from "./Contact";
// Import local images so Vite bundles them for production
import photoCampus from '../images/photo-1643199121319-b3b5695e4acb.avif';
import chatgptCampus from '../images/ChatGPT Image Sep 19, 2025 at 03_26_06 PM.png';
import img2179 from '../images/IMG_2179.jpeg';
import manCote from '../images/Man-Cote-dIvoire.jpg';

interface HomepageProps {
  onPageChange: (page: string) => void;
}

export function Homepage({ onPageChange }: HomepageProps) {
  const [isVisitOpen, setIsVisitOpen] = useState(false);
  const stats = [
    {
      icon: Users,
      number: "250+",
      label: "Étudiants",
      description: "Apprenants actifs venant d’horizons divers",
    },
    {
      icon: GraduationCap,
      number: "10+",
      label: "Enseignants",
      description: "Enseignants dévoués avec diplômes avancés",
    },
    {
      icon: Award,
      number: "18+",
      label: "Années d’Excellence",
      description: "Une histoire de réussite académique",
    },
    {
      icon: Trophy,
      number: "98%",
      label: "Admissions universitaires",
      description: "Nos diplômés sont prêts pour le supérieur",
    },
  ];

  const news = [
    {
      title: "Kalogo Formation Professionnelle obtient l’agrément de l’État de Côte d’Ivoire pour les formations techniques et professionnelles.",
      date: "15 Mars 2024",
      excerpt:
        "Cet agrément renforce sa capacité à accompagner efficacement les jeunes vers l'insertion socio-professionnelle.",
      category: "Succès",
      image:
        "https://images.unsplash.com/photo-1602052577122-f73b9710adba?auto=format&fit=crop&w=1080&q=80",
    },
    {
      title: "Ouverture du nouveau centre informatique",
      date: "10 Janvier 2026",
      excerpt:
        "Des installations modernes pour l’apprentissage pratique en sciences et technologies.",
      category: "Vie du campus",
      image: photoCampus,
    },
    {
      title: "Admission dans les universités américaines",
      date: "Janvier 2024 - Présent",
      excerpt:
        "Plusieurs étudiants ont eu l'opportunité de poursuivre leurs études aux États-Unis à Brigham Young University-Idaho et Salt Lake Community College par le biais de Kalogo Travel.",
      category: "Étudiants",
      image:
        "https://images.unsplash.com/photo-1738949538812-aebbb54a0592?auto=format&fit=crop&w=1080&q=80",
    },
  ];

  const highlights = [
    {
      title: "Kalogo Formation Professionnelle",
      description: "Un programme rigoureux pour inspirer et challenger",
      image: chatgptCampus,
      action: () => onPageChange("academics"),
    },
    {
      title: "Vie sur le campus",
      description: "Une communauté dynamique favorisant l’amitié et le développement",
      image: img2179,
      action: () => {
        onPageChange("academics");
        setTimeout(() => {
          document.getElementById('vie-etudiante')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 50);
      },
    },
    {
      title: "Prêts pour l’avenir",
      description: "Nous préparons nos étudiants pour réussir dans le supérieur",
      image: manCote,
      action: () => onPageChange("admissions"),
    },
  ];

  return (
    <div>
      {/* Hero Section */}
      <Hero
        title="Bienvenue à Kalogo Formation Professionnelle"
        subtitle="Nous accompagnons nos étudiants dans la réalisation de leur plein potentiel grâce à une pédagogie innovante axée sur le développement personnel et l’excellence académique."
        backgroundImage="https://images.unsplash.com/photo-1672912995257-0c8255289523?auto=format&fit=crop&w=1080&q=80"
        showCTA
        ctaText="Postulez maintenant"
        onCTAClick={() => onPageChange("admissions")}
      />

      {/* Academic Highlights */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {highlights.map((highlight, index) => (
              <Card
                key={index}
                className="group cursor-pointer border-0 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
                onClick={highlight.action}
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={highlight.image}
                    alt={highlight.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <h3 className="text-2xl font-bold mb-2">{highlight.title}</h3>
                    <p className="text-blue-100 mb-3">{highlight.description}</p>
                    <div className="flex items-center text-sm font-medium">
                      En savoir plus{" "}
                      <ChevronRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>


      {/* School Statistics */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Des Résultats qui Parlent</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Notre engagement envers l'excellence académique se reflète dans nos réalisations et la réussite de nos étudiants.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <Card key={index} className="text-center border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white/80 backdrop-blur">
                <CardHeader className="pb-4">
                  <div className="mx-auto w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mb-6 shadow-lg">
                    <stat.icon className="w-10 h-10 text-white" />
                  </div>
                  <CardTitle className="text-4xl font-bold text-blue-600 mb-2">{stat.number}</CardTitle>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{stat.label}</h3>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{stat.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

  {/* News Section */}
  <section id="actualites" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Actualités & Réalisations
              </h2>
              <p className="text-xl text-gray-600">
                Découvrez les dernières nouvelles de notre communauté
              </p>
            </div>
            <Button variant="outline" className="hidden md:flex items-center">
              Voir tout
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {news.map((item, index) => (
              <Card
                key={index}
                className="group overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                      {item.category}
                    </span>
                  </div>
                </div>
                <CardHeader>
                  <div className="flex items-center text-gray-500 mb-3">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span className="text-sm">{item.date}</span>
                  </div>
                  <CardTitle className="text-xl leading-tight group-hover:text-blue-600 transition-colors">
                    {item.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">{item.excerpt}</p>
                  <div className="flex items-center text-blue-600 font-medium group-hover:text-blue-700 transition-colors">
                    Lire la suite
                    <ChevronRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-blue-600 via-blue-900 to-indigo-700 text-white relative overflow-hidden">
        {/* Schedule Visit modal mounted here so it opens on the homepage */}
        <ScheduleVisitModal open={isVisitOpen} onOpenChange={setIsVisitOpen} />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjYwIiBoZWlnaHQ9IjYwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDYwIDAgTCAwIDAgMCA2MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMSkiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-30"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                Prêt à Commencer Votre Parcours ?
              </h2>
              <p className="text-xl text-blue-100 mb-8 leading-relaxed">
                Rejoignez une communauté où l’excellence académique se conjugue avec le développement personnel.
                Notre corps professoral dévoué et nos programmes innovants sont conçus pour révéler votre potentiel et vous préparer à la réussite.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  onClick={() => onPageChange('admissions')}
                  className="px-8 py-4 text-lg font-semibold bg-white text-blue-600 hover:bg-gray-50 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  Inscrivez-vous maintenant
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
                <Button
                  onClick={() => setIsVisitOpen(true)}
                  className="px-8 py-4 text-lg font-semibold bg-transparent border-2 border-white text-white hover:bg-white hover:text-blue-600 transition-all duration-300"
                >
                  Planifiez une Visite
                </Button>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.nappy.co/photo/sbygaw_5YfnAm9tbHV0Nn.jpg?h=750&w=1260"
                alt="Students collaborating"
                className="rounded-lg shadow-2xl w-full"
              />
              <div className="absolute -bottom-6 -right-6 bg-white rounded-lg p-6 shadow-xl">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                    <Trophy className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-blue-600">#1</p>
                    <p className="text-sm text-gray-600">Kalogo Formation Professionnelle</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Links Footer */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center p-8 border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 group cursor-pointer" onClick={() => onPageChange('about')}>
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-blue-600 transition-colors">
                <BookOpen className="w-8 h-8 text-blue-600 group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Découvrez Notre Histoire</h3>
                <p className="text-gray-600 mb-4">Découvrez notre histoire, notre mission et notre engagement envers l’excellence académique.</p>
              <div className="flex items-center justify-center text-blue-600 font-medium group-hover:text-blue-700">
                En savoir plus <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Card>

            <Card
              className="text-center p-8 border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 group cursor-pointer"
              onClick={() => {
                onPageChange('academics');
                setTimeout(() => {
                  document.getElementById('formation-diplomante')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }, 50);
              }}
            >
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-blue-600 transition-colors">
                <Globe className="w-8 h-8 text-blue-600 group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Explorez Nos Programmes</h3>
              <p className="text-gray-600 mb-4">Découvrez la richesse de nos offres académiques et de nos activités parascolaires.</p>
              <div className="flex items-center justify-center text-blue-600 font-medium group-hover:text-blue-700">
                Voir les programmes <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Card>

            <Card className="text-center p-8 border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 group cursor-pointer" onClick={() => onPageChange('contact')}>
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-blue-600 transition-colors">
                <Users className="w-8 h-8 text-blue-600 group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Contactez-nous</h3>
              <p className="text-gray-600 mb-4">Prenez contact avec notre équipe des admissions ou planifiez une visite de notre campus.</p>
              <div className="flex items-center justify-center text-blue-600 font-medium group-hover:text-blue-700">
                Écrivez-nous <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Card>
          </div>
        </div>
      </section>      
    </div>
  );
}
