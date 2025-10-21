import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { useState } from 'react';
import { ScheduleVisitModal } from './Contact';
import { 
  Globe, Trophy, Drama,
  Brain, Code, Star, ChevronRight,
  UtensilsCrossed, Laptop, ServerCog, Stethoscope, Pill, ShoppingCart, Zap, MoreHorizontal
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
// Import local images so Vite bundles them correctly
import emmanuelIkwuegbu from '../images/emmanuel-ikwuegbu--0-kl1BjvFc-unsplash.jpg';
import hackathonImg from '../images/ChatGPT Image Sep 19, 2025 at 03_30_43 PM.png';

type QualifyingProgram = {
  icon: LucideIcon;
  name: string;
  description: string;
  specialties: string[];
  color: string;
};

// Load WhatsApp number safely with fallback
const WHATSAPP_NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER || "";

export function Academics({ onPageChange }: { onPageChange?: (page: string) => void }) {
  const [isVisitOpen, setIsVisitOpen] = useState(false);
  const academicDivisions = [
    {
      id: 'bt-sciences-medico-sociales',
      title: 'BT Sciences Medico-sociales',
      subtitle: 'Niveau 3ème (BEPC)',
      description: 'Prêt à agir pour la santé de tous? Le BT SMS vous donne les outils pour réussir dans le secteur médico-social, une carrière où votre empathie et votre savoir-faire feront la différence.',
      image: 'https://images.unsplash.com/photo-1666887360726-f55472d96c34?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      highlights: ['Infirmier(ère)', 'Aide-soignant(e)', 'Secrétaire médical(e)', 'Technicien(ne) de laboratoire médical', 'Auxiliaire de puériculture'],
      features: [
        'Maîtrisez les fondements de la biologie humaine et de la terminologie médicale.',
        "Acquérez les compétences pratiques pour la gestion de dossiers et l'organisation administrative",
        "Préparez votre avenir grâce à une formation complète qui vous ouvre les portes de l'INFAS et de multiples métiers passionnants.",
        "Développez votre potentiel humain avec des qualités essentielles : sens du contact, empathie et persévérance."
      ]
    },
    {
      id: 'bt-electricite',
      title: 'BT Électricité Bâtiment et Énergie Solaire',
      subtitle: 'Niveau 3ème (BEPC)',
      description: "Transformez votre avenir en alimentant celui de la Côte d'Ivoire! Devenez le professionnel indispensable de la transition énergétique avec notre formation de pointe en BT Électricité Bâtiment et Énergie Solaire.",
  image: emmanuelIkwuegbu,
      highlights: ['Électricien du bâtiment', 'Installateur de systèmes solaires photovoltaïques', 'Technicien technico-commercial ', 'Entrepreneur en électricité et énergie solaire', 'Technicien de maintenance en énergie'],
      features: [
        "Maîtrisez les systèmes électriques classiques du bâtiment et les technologies innovantes de l'énergie solaire.",
        "Un programme orienté vers l'action, avec des ateliers et des travaux pratiques sur des équipements réels pour développer une expertise concrète.",
        "Un curriculum moderne conçu pour répondre aux besoins actuels et futurs du secteur de l'énergie et de la construction en Côte d'Ivoire.",
        "Apprenez auprès de formateurs experts et qualifiés, en partenariat avec des acteurs clés de l'industrie.",
        "La formation inclut des notions pour vous permettre de créer et de gérer votre propre entreprise d'installation et de maintenance." ]
    },
    {
      id: 'cert-data-science',
      title: '(Cert-Data Science) Certificat Professionnel en Science et Analyse des Données',
      subtitle: 'Ingénierie des données et modélisation.',
      description: "Dans une économie ivoirienne en pleine transformation, la maîtrise des données est un puissant moteur de croissance. Notre programme vous permet d'acquérir une expertise pointue pour résoudre des problématiques locales, de la finance à l'agriculture, en faisant de vous un acteur clé de l'économie numérique",
      image: 'https://images.unsplash.com/flagged/photo-1553267252-d100936057c1?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      highlights: ['Data Analyst', 'Junior Data Scientist', 'Business Intelligence (BI) Analyst', 'Développeur Data'],
      features: [
        "Acquérissez rapidement les compétences les plus demandées en Data Science (Python, SQL, Power BI, machine learning) pour une employabilité immédiate.",
        "Vous travaillez sur des projets concrets et réalistes, en appliquant les outils et les techniques de la science des données.",
        "Intégrez un réseau professionnel d'experts pour des opportunités d'emploi et rester à la pointe du secteur.",
        "Développez une capacité à analyser et à prendre des décisions stratégiques pour n'importe quel secteur (finance, santé, technologie, etc.)"
      ]
    },
    {
      id: 'cert-genie-logiciel',
      title: '(Cert-Software engineering) Certificat Professionel en Génie Logiciel ',
      subtitle: 'Maîtrisez les méthodologies modernes de conception, développement et maintenance de logiciel.',
      description: "Découvrez une approche systématique et rigoureuse pour construire le futur du logiciel. Notre certificat professionnel vous forme aux principes fondamentaux et aux meilleures pratiques de l'ingénierie logicielle, vous préparant à concevoir, développer et maintenir des applications complexes et performantes.",
      image: 'https://images.unsplash.com/photo-1638482856830-16b0e15fcf2c?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      highlights: ["Développeur Full Stack", "Ingénieur logiciel (Junior)", "Développeur d'applications mobiles", 'Développeur backend'],
      features: [
        "Maîtrisez les langages de programmation essentiels (Java, Python) et les meilleures pratiques de l'industrie.",
        "Développez votre expertise pour prendre en charge l'ensemble du processus de développement logiciel (Full-stack).",
        "Familiarisez-vous avec les méthodes de test, de débogage et d'optimisation de la sécurité.",
        "Maîtrisez les méthodologies modernes pour une gestion de projet efficace (Agile, DevOps)."
      ]
    }
  ];

  const qualifyingPrograms: QualifyingProgram[] = [
    { icon: UtensilsCrossed, name: 'Cuisine Professionnelle', description: 'Formation pratique en arts culinaires pour devenir cuisinier professionnel', specialties: ['Techniques de base', 'Cuisine africaine', 'Cuisine internationale', 'Hygiène alimentaire'], color: 'bg-red-100 text-red-600' },
    { icon: UtensilsCrossed, name: 'Pâtisserie', description: 'Apprenez les techniques de la pâtisserie moderne et traditionnelle', specialties: ['Viennoiseries', 'Gâteaux modernes', 'Chocolaterie', 'Décoration & design'], color: 'bg-pink-100 text-pink-600' },
    { icon: Laptop, name: 'Informatique (Pack-Office)', description: 'Maîtrisez Word, Excel, PowerPoint et les outils bureautiques essentiels', specialties: ['Word', 'Excel', 'PowerPoint', 'Gestion de documents'], color: 'bg-blue-100 text-blue-600' },
    { icon: ServerCog, name: 'Maintenance Informatique & Réseaux', description: 'Formation en diagnostic, réparation et gestion des réseaux informatiques', specialties: ['Montage PC', 'Diagnostic matériel', 'Administration réseaux', 'Cybersécurité de base'], color: 'bg-green-100 text-green-600' },
    { icon: Stethoscope, name: 'Aide Soignante', description: 'Formation qualifiante pour intégrer le secteur paramédical', specialties: ['Soins de base', 'Hygiène hospitalière', 'Prise en charge du patient', 'Premiers secours'], color: 'bg-teal-100 text-teal-600' },
    { icon: Pill, name: 'Auxiliaire en pharmacie', description: 'Préparez-vous aux métiers du secteur pharmaceutique', specialties: ['Gestion des médicaments', 'Accueil patient', 'Préparation ordonnances', 'Hygiène et sécurité'], color: 'bg-purple-100 text-purple-600' },
    { icon: ShoppingCart, name: 'Caissière spécialisée', description: 'Devenez un professionnel qualifié dans le commerce et la grande distribution', specialties: ['Gestion caisse', 'Relation client', 'Comptabilité de base', 'Logiciels de caisse'], color: 'bg-yellow-100 text-yellow-600' },
    { icon: Zap, name: 'Électricité bâtiment', description: 'Formation pratique en installation et maintenance électrique', specialties: ['Câblage', 'Installation équipements', 'Normes électriques', 'Énergie solaire'], color: 'bg-orange-100 text-orange-600' },
    { icon: MoreHorizontal, name: 'Et Autres', description: 'Découvrez d’autres formations qualifiantes adaptées à vos besoins', specialties: ['Formation sur mesure', 'Programmes courts', 'Stages pratiques'], color: 'bg-gray-100 text-gray-600' }
  ];

  const programs = [
    { 
      title: 'Certificat Professionnel en Science et Analyse des Données', 
      description: 'Devenez expert en Data Science et en analyse des données pour transformer l’information en décisions stratégiques.', 
      courses: 'Python, SQL, Machine Learning', 
      image: 'https://miro.medium.com/v2/resize:fit:1400/format:webp/1*nX3Wg62GkE5q1qTusHOEkQ.jpeg', 
      icon: Brain 
    },
    { 
      title: 'Certificat Professionnel en Génie Logiciel', 
      description: 'Maîtrisez les méthodes modernes de conception et de développement logiciel pour créer des applications performantes.', 
      courses: 'Java, Python, Développement Full-Stack', 
      image: 'https://images.unsplash.com/photo-1604145559206-e3bce0040e2d?q=80&w=1760&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 
      icon: Code 
    },
    { 
      title: 'Kalogo Travels', 
      description: "Facilite l'accès aux études supérieures à l'étranger.", 
      courses: 'Étudier à l’international', 
      image: 'https://images.unsplash.com/photo-1545595271-908483fa6e50?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 
      icon: Globe 
    }
  ];

  const extracurriculars = [
    { category: 'Education Sportive', title: 'Sports de Competition', description: "Forger le caractère par le travail d'équipe et la compétition.", image: 'https://images.unsplash.com/photo-1721506931381-3ba300ad71f4?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', activities: ['Football', 'Basketball', 'Tennis', 'Visite Touristique'], icon: Trophy },
    { category: 'Insertion Professionnelle', title: "Panels et Programmes D'Insertion Professionnelle", description: 'Boostez vos compétences: emploi, entrepreneuriat.', image: 'https://images.unsplash.com/photo-1573167101669-476636b96cea?q=80&w=2669&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', activities: ['Gestion financière', "Creation d'entreprise", "Strategies de recherche d'emplois", "Développement personnel et leadership"], icon: Drama },
  { category: 'Hackathon', title: 'Innovation et Défis Technologiques', description: 'Un espace collaboratif où les étudiants conçoivent, développent et présentent des solutions innovantes en temps limité', image: hackathonImg, activities: ['Développement d’applications web et mobiles', 'Prototypage rapide (Design Thinking)', 'Intelligence artificielle et Data Science', 'Pitch et présentation de projets'], icon: Brain }
  ];

  return (
    <div>
  {/* Hero */}
  <section className="relative h-auto min-h-[420px] sm:h-[600px] pt-20 sm:pt-24 flex items-center justify-center overflow-hidden bg-blue-900">
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1719845853806-1c54b0ed37c5?...')` }} />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-blue-800/70" />
        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
          <h1 className="text-4xl md:text-6xl mb-6 leading-tight">Kalogo Formation Professionnelle</h1>
          <p className="text-lg md:text-2xl mb-8 opacity-95">Des programmes d'études complets, conçus pour stimuler l'apprentissage, encourager l'innovation et former les leaders de demain.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-white text-blue-900 hover:bg-gray-100 px-8 py-3"
              onClick={() => document.getElementById('formation-qualifiante')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
            >
              Programmes d'études
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-900 px-8 py-3" asChild>
              <a href="/Calendrier_Academique_KFP_Professionnel.pdf" target="_blank" rel="noopener noreferrer">
                Calendrier Académique
              </a>
            </Button>
          </div>
        </div>
      </section>

  {/* Divisions */}
  <section id="formation-diplomante" className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl mb-6">Formation Diplômante</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">Obtenez une reconnaissance d'État et construisez votre avenir avec nos formations diplômantes.</p>
          </div>

          <Tabs defaultValue="bt-sciences-medico-sociales" className="w-full">
            <TabsList className="w-full bg-gray-200 rounded-lg p-1 flex justify-center space-x-4 overflow-x-auto sm:overflow-visible no-scrollbar snap-x snap-mandatory scroll-px-2">
              {academicDivisions.map((division) => (
                <TabsTrigger key={division.id} value={division.id} className="text-sm whitespace-nowrap data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-md px-3 py-2 snap-start">
                  {division.title.split(' ')[0]} {division.title.split(' ')[1]}
                </TabsTrigger>
              ))}
            </TabsList>

            {academicDivisions.map((division) => (
              <TabsContent key={division.id} value={division.id}>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                  <div>
                    <h3 className="text-3xl mb-2">{division.title}</h3>
                    <p className="text-blue-600 mb-4">{division.subtitle}</p>
                    <p className="text-lg text-gray-700 mb-6">{division.description}</p>
                    <div className="mb-8">
                      <h4 className="text-lg mb-4">Débouchés professionnels</h4>
                      <div className="grid grid-cols-2 gap-3">
                        {division.highlights.map((highlight, index) => (
                          <Badge key={index} className="bg-gray-100 text-gray-800 px-3 py-2 rounded-lg">
                            <Star className="w-4 h-4 mr-2 text-blue-600" /> {highlight}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="text-lg mb-4">Points clés et bénéfices</h4>
                      <div className="space-y-3">
                        {division.features.map((feature, index) => (
                          <div key={index} className="flex items-center">
                            <ChevronRight className="w-4 h-4 text-blue-600 mr-3" />
                            <p className="text-gray-700">{feature}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <img src={division.image} alt={division.title} className="rounded-2xl shadow-2xl w-full h-64 sm:h-80 md:h-96 object-cover" />
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* Formation Qualifiante */}
  <section id="formation-qualifiante" className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl mb-6">Formation Qualifiante Suivie de Projets d'Insertion de 6 Mois</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Des formations pratiques, intensives et professionnalisantes, conçues pour vous insérer rapidement dans le marché de l'emploi.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {qualifyingPrograms.map((prog, index) => (
              <Card key={index} className="hover:shadow-xl transition-all border-0 rounded-xl">
                <CardContent className="p-6">
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 ${prog.color}`}>
                    <prog.icon className="w-8 h-8" />
                  </div>
                  <h4 className="text-lg mb-2">{prog.name}</h4>
                  <p className="text-gray-600 text-sm mb-4">{prog.description}</p>
                  {prog.specialties.map((s, i) => (
                    <div key={i} className="flex items-center text-xs text-gray-500 mb-1">
                      <div className="w-1 h-1 bg-blue-600 rounded-full mr-2"></div> {s}
                    </div>
                  ))}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Programmes phares */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl mb-6">
              Programmes phares
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Des parcours spécialisés et des opportunités avancées pour les étudiants motivés.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
            {programs.map((program, index) => (
              <Card
                key={index}
                className="overflow-hidden hover:shadow-2xl transition-all duration-300 border-0 rounded-2xl group"
              >
                <div className="relative h-64">
                  <img
                    src={program.image}
                    alt={program.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="bg-white/90 backdrop-blur-sm rounded-full p-3 w-fit mb-2">
                      <program.icon className="w-6 h-6 text-blue-600" />
                    </div>
                    <Badge
                      variant="secondary"
                      className="bg-white/90 text-gray-900"
                    >
                      {program.courses}
                    </Badge>
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl mb-2">
                    {program.title}
                  </h3>
                  <p className="text-gray-600">
                    {program.description}
                  </p>
                  {/* Contact Us Button */}
                  {program.title === "Kalogo Travels" && (
                      WHATSAPP_NUMBER ? (
                  <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer">

                  <Button className=" mt-4 bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg">
                    Contactez-nous
                  </Button>
                  </a>): (<p className="text-sm text-red-500 mt-2">WhatsApp Indisponible</p>))}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

  {/* Extracurricular Excellence */}
  <section id="vie-etudiante" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl mb-6">
              Au-delà de la salle de classe
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              De riches opportunités parascolaires développent le leadership, la créativité et le caractère de chaque étudiant 
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {extracurriculars.map((category, index) => (
              <Card
                key={index}
                className="overflow-hidden hover:shadow-2xl transition-all duration-300 border-0 rounded-2xl"
              >
                <div className="relative h-80">
                  <img
                    src={category.image}
                    alt={category.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute top-4 right-4">
                    <div className="bg-white/90 backdrop-blur-sm rounded-full p-2">
                      <category.icon className="w-5 h-5 text-blue-600" />
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <Badge
                      variant="secondary"
                      className="mb-3 bg-blue-600 text-white"
                    >
                      {category.category}
                    </Badge>
                    <h3 className="text-2xl mb-2">
                      {category.title}
                    </h3>
                    <p className="text-blue-100 mb-4">
                      {category.description}
                    </p>
                  </div>
                </div>
                <CardContent className="p-6">
                  <div className="grid grid-cols-2 gap-2">
                    {category.activities.map(
                      (activity, idx) => (
                        <div
                          key={idx}
                          className="flex items-center text-sm text-gray-600"
                        >
                          <div className="w-2 h-2 bg-blue-600 rounded-full mr-2"></div>
                          {activity}
                        </div>
                      ),
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Visit modal for Academics page */}
      <ScheduleVisitModal open={isVisitOpen} onOpenChange={setIsVisitOpen} />

      {/* Achievement */}
      <section className="py-20 bg-gradient-to-r from-blue-900 to-blue-800">
        <div className="max-w-7xl mx-auto px-4 text-center text-white">
          <h2 className="text-4xl mb-6">Réussite Académique</h2>
          <p className="text-xl text-blue-100 mb-12">Notre engagement envers l'excellence se reflète dans les parcours exceptionnels de nos étudiants et la reconnaissance qu'ils obtiennent.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            <div><div className="text-5xl mb-2">98%</div><p>Taux d'Admission</p></div>
            <div><div className="text-5xl mb-2">12:1</div><p>Ratio étudiants-professeurs</p></div>
            <div><div className="text-5xl mb-2">4.3</div><p>GPA moyen</p></div>
            <div><div className="text-5xl mb-2">89.8%</div><p>Taux de réussite aux concours d'Etat</p></div>
          </div>
          <p className="text-xl text-blue-100 mb-8">Prêt(e) à explorer nos programmes académiques?</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-blue-900 hover:bg-gray-100 px-8 py-3" onClick={() => setIsVisitOpen(true)}>
              Planifiez une Visite
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-blue-900 px-8 py-3"
              onClick={() => {
                try {
                  const url = new URL(window.location.href);
                  url.searchParams.set('intent', 'contact-form');
                  window.history.replaceState({}, '', url.toString());
                } catch {}
                onPageChange?.('contact');
              }}
            >
              Demandez des Informations
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
