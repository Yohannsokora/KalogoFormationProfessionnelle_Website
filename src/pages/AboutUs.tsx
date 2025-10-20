import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { useState } from 'react';
import { ScheduleVisitModal } from './Contact';
import { Target, Eye, Users, Calendar, Trophy, BookOpen, GraduationCap, Heart } from 'lucide-react';

export function AboutUs({ onPageChange }: { onPageChange?: (page: string) => void }) {
  const [isVisitOpen, setIsVisitOpen] = useState(false);
  const leadership = [
    {
      name: 'Norbert K. Ounleu',
      position: 'Foundateur',
      credentials: 'Master en Gestion des Entreprises, University of Cape Coast, Ghana et Junior Achievement',
      image: 'public/IMG_0181.JPG',
      bio: 'M. Norbert Ounleu possède plus de 25 ans d’expérience dans la gestion des affaires temporelles de l’EJCSDJ en Afrique de l’Ouest et en Afrique Centrale. Grâce à sa rigueur, son sens du devoir et son intégrité exemplaire dans l’administration des biens publics, il a su instaurer une gestion transparente et efficace des ressources. Son leadership et sa vision stratégique ont contribué à renforcer la stabilité organisationnelle et à favoriser le développement durable des institutions qu’il a dirigées.',
      specialties: ['Gestion des Affaires et Administration','Leadership Organisationnel','Gestion Financière et Comptable','Développement Institutionnel', 'Éthique et Gouvernance','Gestion des Ressources Publiques']
    },
    {
      name: 'Valerie A. Tonga',
      position: 'Directrice Générale des Programmes',
      credentials: 'Licence, Université d’Abobo-Adjamé',
      image: 'public/photo valerie.jpg',
      bio: 'Valérie possède plus de 20 ans d’expérience dans la gestion administrative et financière. Au fil de sa carrière, elle a démontré une grande expertise dans la coordination des programmes, la planification stratégique et le suivi budgétaire. Son sens de l’organisation, sa rigueur et son engagement envers l’excellence contribuent à la réussite et à la croissance des projets qu’elle supervise, tout en assurant une gestion efficace et durable des ressources.',
      specialties: ['Gestion Administrative et Financière', 'Planification Stratégique', 'Suivi et Évaluation de Projets','Leadership Organisationnel','Gestion Budgétaire et Comptable', 'Développement des Programmes','Optimisation des Ressources']
    },
    {
      name: 'Joseph Ounleu',
      position: 'Directeur - Kalogo Travels',
      credentials: 'Bachelor in Accounting, Ensign College',
      image: 'public/IMG_0176.jpg',
      bio: 'Je suis le Directeur de Kalogo Travels, une agence dont la mission est d’ouvrir les portes à tous ceux qui souhaitent poursuivre leurs études à l’étranger. Notre partenariat avec Kalogo Formation Professionnelle renforce encore cette vision. Faire partie de Kalogo Formation Professionnelle, c’est non seulement acquérir des compétences professionnelles localement, mais aussi se préparer à des études et à des opportunités à l’étranger grâce à notre réseau d’écoles partenaires.',
      specialties: ['Orientation Académique', 'Mobilité Internationale', 'Partenariats Éducatifs', 'Développement Étudiant', 'Leadership & Stratégie']
    },
    {
      name: 'Franck Sokora',
      position: 'Propriétaire & Co-fondateur Akora Group - Directeur IT (Akora Tech)',
      credentials: 'BS, Brigham Young University-Idaho',
      image: 'public/IMG_9654.JPG',
      bio: 'Co-fondateur d’Akora Group et responsable d’Akora Tech, j’oriente la vision digitale de l’établissement. Mon équipe pilote l’infrastructure IT, la cybersécurité, le support aux enseignants/étudiants et l’innovation (applications, automatisation, données) pour garantir une expérience d’apprentissage fluide, fiable et sécurisée.',
      specialties: ['Direction & Stratégie','Technologies Éducatives','Cybersécurité','Infrastructure & Réseaux','Data & Automatisation']
    }

  ];

  const milestones = [
    { year: '2025', title: 'Fondation', description: 'Création de Kalogo Formation Professionnelle avec 250+ étudiants' },
    { year: '2024', title: 'Expansion', description: 'Construction de nouveaux locaux et laboratoires avancés' },
    { year: '2024', title: 'Intégration Technologique', description: 'Lancement du programme numérique 1:1 et apprentissage digital' },
    { year: '2024', title: 'Reconnaissance Nationale', description: "Agrémentée par L'Etat de Cote d'Ivoire pour les Formations Techniques et Professionnelles" },
    { year: '2024-2025', title: 'Excellence Atteinte', description: "19 Inscrits pour la formation qualifiante en guise d'experimentation, 19 Inseres" },
    { year: '2026', title: 'Pôle d’Innovation', description: 'Ouverture du nouveau centre Informatique par Akora Technology Inc.' }
  ];

  const achievements = [
    { icon: Trophy, title: '100% Insertion 2024', category: 'Réussite Académique' },
    { icon: BookOpen, title: "Toute Premiere Ecole d'Insertion dans le Tonkpi", category: 'Reconnaissance Régionale' },
    { icon: GraduationCap, title: "98% d'admission au Programme d'Insertion Professionnelle", category: 'Succès Étudiant' },
    { icon: Users, title: "Partenariat d'échange Technologique avec Akora Technology Inc. USA", category: 'Innovation' },
    { icon: Heart, title: 'Reconnaissance pour Service Communautaire', category: 'Impact Social' }
  ];

  const coreValues = [
    {
      icon: Target,
      title: 'Excellence',
      description: "Nous visons l'excellence dans toutes nos actions."
    },
    {
      icon: Users,
      title: 'Communauté',
      description: "Construire des relations solides et un esprit d'équipe."
    },
    {
      icon: BookOpen,
      title: 'Innovation', 
      description: "Adopter de nouvelles idées et approches pour l'apprentissage."
    },
    {
      icon: Heart,
      title: 'Intégrité',
      description: "Agir avec honnêteté, transparence et selon des principes éthiques"
    }
  ];

  return (
    <div>
  {/* Hero Section */}
  <section className="relative h-auto min-h-[420px] sm:h-[600px] pt-20 sm:pt-24 flex items-center justify-center overflow-hidden text-white">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1685456891912-c09f9cd252eb?auto=format&fit=crop&w=1080&q=80')`
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-blue-900 to-indigo-700 opacity-90" />
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          <h1 className="text-4xl md:text-6xl mb-6 leading-tight">À Propos de Nous</h1>
          <p className="text-lg md:text-2xl mb-8 leading-relaxed opacity-95">
            Découvrez notre histoire, notre mission et notre engagement envers l’excellence académique et le développement personnel.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              type="button"
              size="lg"
              className="bg-white text-blue-900 hover:bg-gray-100 px-8 py-3"
              onClick={() => document.getElementById('parcours')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
            >
              Notre Histoire
            </Button>
            <Button
              type="button"
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-blue-900 px-8 py-3"
              onClick={() => document.getElementById('equipe')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
            >
              Notre Équipe
            </Button>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl mb-6">Notre Fondement</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              « La compétence au service de l’emploi. »
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            <div className="bg-white rounded-2xl shadow-xl p-8 border-t-4 border-blue-600 hover:shadow-2xl transition-shadow">
              <div className="flex items-center mb-6">
                <div className="bg-blue-100 p-3 rounded-full mr-4">
                  <Target className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-2xl">Notre Mission</h3>
              </div>
              <p className="text-gray-700 leading-relaxed text-lg">
                Offrir à chaque apprenant une formation professionnelle de qualité, adaptée aux réalités du marché, en intégrant un accompagnement efficace vers l’emploi, l’auto-emploi ou l’entrepreneuriat.
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-8 border-t-4 border-blue-600 hover:shadow-2xl transition-shadow">
              <div className="flex items-center mb-6">
                <div className="bg-blue-100 p-3 rounded-full mr-4">
                  <Eye className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-2xl">Notre Vision</h3>
              </div>
              <p className="text-gray-700 leading-relaxed text-lg">
                Devenir une école professionnelle de référence en Cote d’Ivoire, reconnue pour l’excellence de sa formation et son impact sur l’insertion socioprofessionnelle des jeunes.
              </p>
            </div>
          </div>
        

        {/* Core Values */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {coreValues.map((value, index) => (
              <div key={index} className="text-center bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <value.icon className="w-8 h-8 text-blue-600" />
                </div>
                <h4 className="text-lg mb-2">{value.title}</h4>
                <p className="text-gray-600 text-sm">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      
        

      {/* Timeline */}
  <section id="parcours" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl mb-6">Notre Parcours</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Préparer l'insertion professionelle par l'innovation et la connaissance.
            </p>
          </div>

          <div className="relative">
            {/* Mobile left line */}
            <div className="absolute left-4 top-0 w-1 h-full bg-blue-200 sm:hidden"></div>
            {/* Desktop center line */}
            <div className="hidden sm:block absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-blue-200"></div>
            {milestones.map((milestone, index) => {
              const even = index % 2 === 0;
              return (
                <div
                  key={index}
                  className={`relative flex mb-12 sm:items-center ${even ? 'sm:justify-start' : 'sm:justify-end'}`}
                >
                  <div
                    className={`w-full sm:w-5/12 pl-10 sm:pl-0 ${even ? 'sm:pr-8' : 'sm:pl-8'}`}
                  >
                    <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                      <div className="flex items-center mb-3">
                        <Calendar className="w-5 h-5 text-blue-600 mr-2" />
                        <span className="text-blue-600 text-sm">{milestone.year}</span>
                      </div>
                      <h4 className="text-lg mb-2">{milestone.title}</h4>
                      <p className="text-gray-600">{milestone.description}</p>
                    </div>
                  </div>
                  {/* Marker */}
                  <div className="absolute left-4 sm:left-1/2 transform -translate-x-1/2 w-4 h-4 bg-blue-600 rounded-full border-4 border-white shadow-lg"></div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Leadership */}
  <section id="equipe" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl mb-6">Notre Équipe de Direction</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Des leaders passionnés qui guident notre communauté éducative.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {leadership.map((member, index) => (
              <Card key={index} className="bg-white hover:shadow-2xl transition-all duration-300 border-0 rounded-2xl overflow-hidden">
                <div className="relative">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-64 md:h-72 lg:h-64 xl:h-72 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                </div>
                <CardContent className="p-8">
                  <h3 className="text-xl mb-1">{member.name}</h3>
                  <p className="text-blue-600 mb-1">{member.position}</p>
                  <p className="text-sm text-gray-500 mb-4">{member.credentials}</p>
                  <p className="text-gray-700 mb-6 leading-relaxed">{member.bio}</p>
                  <div className="flex flex-wrap gap-2">
                    {member.specialties.map((specialty, idx) => (
                      <Badge key={idx} variant="secondary" className="bg-blue-100 text-blue-800 whitespace-nowrap">
                        {specialty}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl mb-6">Nos Réalisations</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Une reconnaissance nationale et internationale pour notre excellence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {achievements.map((achievement, index) => (
              <Card key={index} className="bg-white hover:shadow-xl transition-all duration-300 border-0 rounded-xl overflow-hidden group">
                <CardContent className="p-8">
                  <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mb-6 group-hover:bg-blue-200 transition-colors">
                    <achievement.icon className="w-8 h-8 text-blue-600" />
                  </div>
                  <Badge variant="outline" className="mb-3 text-xs">{achievement.category}</Badge>
                  <h4 className="text-lg mb-2">{achievement.title}</h4>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-blue-600 via-blue-900 to-indigo-700 text-white relative overflow-hidden">
        {/* Visit modal for About page */}
        <ScheduleVisitModal open={isVisitOpen} onOpenChange={setIsVisitOpen} />
        <div className="relative max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl text-white mb-6">Prêt à Rejoindre l’Aventure ?</h2>
          <p className="text-xl text-blue-100 mb-8 leading-relaxed">
            Découvrez comment Kalogo Formation Professionnelle peut transformer votre avenir.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-blue-900 hover:bg-gray-100 px-8 py-3" onClick={() => setIsVisitOpen(true)}>
              Planifiez une Visite
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-blue-900 px-8 py-3"
              onClick={() => onPageChange?.('admissions')}
            >
              Rejoignez-nous
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
