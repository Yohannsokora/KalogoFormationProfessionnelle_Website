import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Label } from '../components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../components/ui/Dialog';
// Removed unused Badge and Tabs imports
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../components/ui/accordion';
import React, { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import {
  MapPin, Phone, Mail, Clock, Facebook, Twitter, Instagram, MessageSquare,
  Users, BookOpen, CreditCard, Shield,
  Car, Send, Navigation, Video, UserCheck, Calendar
} from 'lucide-react';

export function Contact() {
  
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isVirtualTourOpen, setIsVirtualTourOpen] = useState(false);
  const [isVisitOpen, setIsVisitOpen] = useState(false);
  const [isMeetingOpen, setIsMeetingOpen] = useState(false);
  const [isAskOpen, setIsAskOpen] = useState(false);
  const [isMapChoiceOpen, setIsMapChoiceOpen] = useState(false);
  const [mapTarget, setMapTarget] = useState<{ lat: number; lng: number; label?: string } | null>(null);

  // If navigated here with ?intent=visit, auto-open the Schedule Visit modal
  useEffect(() => {
    try {
      const url = new URL(window.location.href);
      const intent = url.searchParams.get('intent');
      if (intent === 'visit') {
        setIsVisitOpen(true);
        url.searchParams.delete('intent');
        window.history.replaceState({}, '', url.toString());
      } else if (intent === 'contact-form') {
        setIsAskOpen(true);
        url.searchParams.delete('intent');
        window.history.replaceState({}, '', url.toString());
      }
    } catch {}
  }, []);

  // Open modal to let user choose Apple Maps or Google Maps

  const openMapChoice = (lat: number, lng: number, label?: string) => {
    setMapTarget({ lat, lng, label });
    setIsMapChoiceOpen(true);
  };

  const validate = (values: Record<string, string>) => {
    const e: Record<string, string> = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!values.firstName || values.firstName.trim().length < 2) e.firstName = 'Veuillez saisir un prénom valide (min 2 caractères)';
    if (!values.lastName || values.lastName.trim().length < 2) e.lastName = 'Veuillez saisir un nom valide (min 2 caractères)';
    if (!values.email || !emailRegex.test(values.email)) e.email = "Adresse email invalide";
    if (!values.subject || values.subject.trim().length < 3) e.subject = "Objet trop court";
    if (!values.message || values.message.trim().length < 10) e.message = "Message trop court (min 10 caractères)";
    return e;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (submitting) return;
    try {
      setSubmitting(true);
      const form = e.currentTarget;
      const formData = new FormData(form);
      const payload = {
        firstName: String(formData.get('Prenom') || ''),
        lastName: String(formData.get('Nom de famille') || ''),
        email: String(formData.get('email') || ''),
        phone: String(formData.get('Numéro de téléphone') || ''),
        inquiryType: String(formData.get('Type de demande') || ''),
        subject: String(formData.get('sujet') || ''),
        message: String(formData.get('message') || ''),
        // Honeypot field – humans won't fill this; bots might
        hp: String(formData.get('hp') || ''),
      };

      const v = validate(payload);
      setErrors(v);
      if (Object.keys(v).length > 0) {
        // Focus first invalid field
        const firstKey = ['Prenom','Nom de famille','email','sujet','message'].find(k => v[k]);
        if (firstKey) {
          const el = form.querySelector(`#${firstKey}`) as HTMLElement | null;
          el?.focus();
        }
        toast.error('Veuillez corriger les champs en rouge.');
        return;
      }
      const { sendContactMessage } = await import('../utils/sendContactMessage');
      const { hp, ...cleaned } = payload as any;
      // If honeypot is filled, pretend success but do nothing (drop silently)
      if (hp && hp.trim().length > 0) {
        form.reset();
        setErrors({});
        toast.success('Votre message a été envoyé. Nous vous répondrons sous peu.');
        return;
      }
      const result = await sendContactMessage(cleaned);
      if (!result?.success) {
        throw new Error(result?.error || 'Échec de l\'envoi');
      }
      // Success UX
      // Reset form
  form.reset();
  setErrors({});
      toast.success('Votre message a été envoyé. Nous vous répondrons sous peu.');
    } catch (err: any) {
      console.error('Contact submit error:', err);
      toast.error(`Impossible d'envoyer le message: ${err?.message || err}`);
    } finally {
      setSubmitting(false);
    }
  };

  const departmentContacts = [
    {
      department: 'Bureau des admissions',
      description: 'Processus d\'inscription et visites du campus',
      phone: '+225 27 34 75 16 90',
      email: 'kalogoformationprofessionnelle@gmail.com',
      hours: 'Mon-Fri: 8:00 AM - 5:00 PM, Sat: 9:00 AM - 1:00 PM',
      image: 'https://images.unsplash.com/photo-1697637980693-728788b9e96d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1bml2ZXJzaXR5JTIwb2ZmaWNlJTIwcmVjZXB0aW9uJTIwZGVza3xlbnwxfHx8fDE3NTc5NTUxMzZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      icon: UserCheck,
      color: 'bg-blue-100 text-blue-600'
    },
    {
      department: 'Affaires académiques',
      description: 'Curriculum, faculté et programmes professionnels',
      phone: '+225 27 34 75 16 90',
      email: 'kalogoformationprofessionnelle@gmail.com',
      hours: 'Mon-Fri: 7:30 AM - 4:30 PM',
      image: 'https://images.unsplash.com/photo-1633111158093-c51d43175b77?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1bml2ZXJzaXR5JTIwc3R1ZGVudCUyMHNlcnZpY2VzJTIwb2ZmaWNlfGVufDF8fHx8MTc1Nzk1NTE0Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      icon: BookOpen,
      color: 'bg-green-100 text-green-600'
    },
    {
      department: 'Services étudiants',
      description: 'Soutien aux étudiants, conseils et activités parascolaires',
      phone: '+225 07 02 55 69 73',
      email: 'kalogoformationprofessionnelle@gmail.com',
      hours: 'Mon-Fri: 8:00 AM - 4:00 PM',
      image: 'https://images.unsplash.com/photo-1495576775051-8af0d10f19b1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB1bml2ZXJzaXR5JTIwY29uZmVyZW5jZSUyMHJvb218ZW58MXx8fHwxNzU3OTU1MTQ2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      icon: Users,
      color: 'bg-purple-100 text-purple-600'
    },
    {
      department: 'Bureau des finances',
      description: 'Frais de scolarité, aides financières et plans de paiement',
      phone: '+225 27 34 75 16 90',
      email: 'kalogoformationprofessionnelle@gmail.com',
      hours: 'Mon-Fri: 8:00 AM - 4:00 PM',
      image: 'https://images.unsplash.com/photo-1664102306721-422dcc22d032?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1bml2ZXJzaXR5JTIwY2FtcHVzJTIwYnVpbGRpbmclMjBlbnRyYW5jZXxlbnwxfHx8fDE3NTc5NTUxMzN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      icon: CreditCard,
      color: 'bg-orange-100 text-orange-600'
    }
  ];

  const contactMethods = [
      {
        method: 'Téléphone',
        value: '(+225) 27 34 75 16 90',
        tel: '+2252734751690', // E.164 formatted without spaces for tel: link
        subtext: 'Standard / Réception',
        icon: Phone,
        action: 'Appeler maintenant',
        color: 'bg-blue-600 hover:bg-blue-700'
      },
      {
        method: 'Email',
        value: 'franckyohanns@gmail.com',
        mailto: 'franckyohanns@gmail.com',
        subtext: 'Questions générales',
        icon: Mail,
        action: 'Envoyer un email',
        color: 'bg-green-600 hover:bg-green-700'
      },
    {
      method: 'Visite',
      value: 'KFP',
      subtext: 'Man Lycee Club, Côte d’Ivoire',
      lat: 7.392357,
      lng: -7.541391,
      icon: MapPin,
      action: 'Obtenir l’itinéraire',
      color: 'bg-purple-600 hover:bg-purple-700'
    },
    {
      method: 'Chat en direct',
      value: 'Assistance en ligne',
      subtext: 'Mon-Fri: 8 AM - 6 PM',
      icon: MessageSquare,
      action: 'Démarrer le chat',
      color: 'bg-teal-600 hover:bg-teal-700',
      whatsappNumber: '+225 01 01 56 12 35',
  whatsappLink: 'https://wa.me/2250101561235?text=Bonjour%20Kalogo%20Formation%20Professionnelle,%20je%20souhaite%20avoir%20des%20informations.'
    }
  ];

const faqItems = [
    {
        question: 'Quelle sont vos heures de fonctionnement et votre calendrier scolaire?',
        answer: 'Les heures d\'école sont de 8h00 à 15h30, du lundi au vendredi. Une garde prolongée est disponible de 6h30 à 18h00. Nous suivons un calendrier traditionnel avec des cours allant de la fin août au début juin, y compris des pauses programmées pour les vacances et les vacances d\'été.'
    },
    {
        question: 'Proposez-vous des services de transport?',
        answer: 'Non, nous ne proposons pas de services de transport pour le moment. Cependant, nous sommes situés à proximité des principales lignes de transport en commun et offrons un parking pour les familles qui conduisent. Nous encourageons également le covoiturage entre les familles de notre communauté scolaire.'
    },
    {
        question: 'Quelles options de restauration sont disponibles sur le campus?',
        answer: 'Notre école dispose d\'une cantine où les élèves et les enseignants peuvent prendre leurs repas. Le programme de restauration propose des repas nutritifs et équilibrés préparés frais chaque jour, en tenant compte des restrictions alimentaires et des allergies. Des options de collations saines sont également disponibles.'
    },
    {
        question: 'Avez-vous un internat ou des chambres disponibles pour les élèves ?',
        answer: 'Oui, nous proposons un internat et des chambres sur le campus pour les élèves qui souhaitent résider sur place. Les chambres sont confortables et sécurisées, avec un encadrement dédié pour assurer le bien-être des résidents.'
    },
    {
        question: 'Quelle est votre approche en matière de sécurité et de sûreté des étudiants?',
        answer: 'La sécurité des étudiants est notre priorité absolue. Nous maintenons un campus sécurisé avec un accès contrôlé, du personnel de sécurité formé et des procédures d\'urgence complètes. Tout le personnel subit des vérifications des antécédents et une formation à la sécurité, et nous avons établi des protocoles pour diverses situations d\'urgence.'
    },
    {
        question: 'Comment les parents peuvent-ils rester impliqués et informés?',
        answer: 'Nous encourageons l\'implication des parents à travers notre Association des parents d\'élèves, des opportunités de bénévolat, des conférences régulières entre parents et enseignants, et notre portail en ligne pour les notes et la communication. Nous organisons également des événements familiaux, des ateliers éducatifs et maintenons des canaux de communication ouverts.'
    },
    {
        question: 'Quels services de soutien sont disponibles pour les étudiants?',
        answer: 'Nous offrons un soutien complet, y compris du tutorat académique, du conseil en orientation universitaire, des programmes d\'apprentissage socio-émotionnel et un soutien spécialisé pour les étudiants ayant des différences d\'apprentissage. Notre équipe de conseillers travaille en étroite collaboration avec les étudiants et les familles pour garantir le succès académique et personnel.'
    }
];

  return (
  <div className="pb-[env(safe-area-inset-bottom)]">
    <MapsChoiceModal open={isMapChoiceOpen} onOpenChange={setIsMapChoiceOpen} target={mapTarget} />
      <VirtualTourModal open={isVirtualTourOpen} onOpenChange={setIsVirtualTourOpen} />
      <ScheduleVisitModal open={isVisitOpen} onOpenChange={setIsVisitOpen} />
      <ScheduleMeetingModal open={isMeetingOpen} onOpenChange={setIsMeetingOpen} />
      <AskQuestionModal open={isAskOpen} onOpenChange={setIsAskOpen} />
      {/* Immersive Hero Section */}
  <section className="relative min-h-[420px] md:h-[600px] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1664102306721-422dcc22d032?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1bml2ZXJzaXR5JTIwY2FtcHVzJTIwYnVpbGRpbmclMjBlbnRyYW5jZXxlbnwxfHx8fDE3NTc5NTUxMzN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral')`
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-blue-800/70" />
  <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4 sm:px-6">
          <h1 className="text-5xl md:text-6xl mb-6 leading-tight">
            Contactez-nous pour en savoir plus sur Kalogo Formation Professionnelle
          </h1>
          <p className="text-xl md:text-2xl mb-8 leading-relaxed opacity-95">
            Nous sommes là pour répondre à vos questions, vous fournir des conseils et vous accueillir dans notre communauté de formation professionnelle.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <Button size="lg" className="bg-white text-blue-900 hover:bg-gray-100 px-8 py-3" onClick={() => setIsAskOpen(true)}>
              Contactez-nous
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-900 px-8 py-3" onClick={() => setIsVisitOpen(true)}>
              Planifier une visite
            </Button>
          </div>
        </div>
      </section>

      {/* Quick Contact Methods */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl mb-6">Comment pouvons-nous vous aider?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Plusieurs façons de contacter notre équipe et d'obtenir le soutien dont vous avez besoin
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {contactMethods.map((method, index) => (
              <Card key={index} className="text-center hover:shadow-2xl transition-all duration-300 border-0 rounded-2xl group">
                <CardContent className="p-8">
                  <div className="bg-gray-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-gray-200 transition-colors">
                    <method.icon className="w-10 h-10 text-blue-600" />
                  </div>
                  <h3 className="text-xl mb-2">{method.method}</h3>
                  <p className="mb-2">{method.value}</p>
                  <p className="text-sm text-gray-600 mb-6">{method.subtext}</p>
                  {method.tel ? (
                    <Button className={`w-full ${method.color} text-white`} asChild>
                      <a href={`tel:${String(method.tel).replace(/\s+/g, '')}`} aria-label={`Appeler ${method.value}`}>
                        {method.action}
                      </a>
                    </Button>
                  ) : method.mailto ? (
                    <Button className={`w-full ${method.color} text-white`} asChild>
                      <a
                        href={`mailto:${method.mailto}?subject=Demande d'information&body=Bonjour,%0D%0A%0D%0AJe souhaiterais obtenir des informations concernant ...`}
                        aria-label={`Envoyer un email à ${method.mailto}`}
                      >
                        {method.action}
                      </a>
                    </Button>
                  ) : method.whatsappLink ? (
                    <Button className={`w-full ${method.color} text-white`} asChild>
                      <a
                        href={method.whatsappLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`WhatsApp chat ${method.whatsappNumber || ''}`}
                      >
                        {method.action}
                      </a>
                    </Button>
                  ) : method.method === 'Visite' ? (
                    <Button className={`w-full ${method.color} text-white`} onClick={() => openMapChoice(method.lat ?? 7.392357, method.lng ?? -7.541391, method.value)}>
                      {method.action}
                    </Button>
                  ) : (
                    <Button className={`w-full ${method.color} text-white`} onClick={() => setIsAskOpen(true)}>
                      {method.action}
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Department Directory */}
  <section className="py-12 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl mb-6">Annuaire des Formations Qualifiantes et Diplomantes</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Connectez-vous directement au bon département pour une assistance spécialisée
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {departmentContacts.map((dept, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-2xl transition-all duration-300 border-0 rounded-2xl group">
                <div className="relative h-48">
                  <img
                    src={dept.image}
                    alt={dept.department}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute top-4 right-4">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${dept.color}`}>
                      <dept.icon className="w-6 h-6" />
                    </div>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-xl text-white mb-1">{dept.department}</h3>
                    <p className="text-blue-100 text-sm">{dept.description}</p>
                  </div>
                </div>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <Phone className="w-4 h-4 text-blue-600 mr-3" />
                      <a href={`tel:${dept.phone.replace(/[^+\d]/g, '')}`} className="text-blue-600 hover:underline">{dept.phone}</a>
                    </div>
                    <div className="flex items-center">
                      <Mail className="w-4 h-4 text-blue-600 mr-3" />
                      <a href={`mailto:${dept.email}`} className="text-blue-600 hover:underline">{dept.email}</a>
                    </div>
                    <div className="flex items-start">
                      <Clock className="w-4 h-4 text-gray-600 mr-3 mt-0.5" />
                      <span className="text-gray-600 text-sm">{dept.hours}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Campus Information */}
  <section className="py-12 sm:py-16 lg:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Enhanced Contact Form */}
            <div>
              <div className="mb-8">
                <h2 className="text-4xl mb-4">Envoyez-nous un message</h2>
                <p className="text-xl text-gray-600">
                  Vous avez une question spécifique ou avez besoin d'une assistance personnalisée ? Nous sommes là pour vous aider.
                </p>
              </div>

              <Card className="border-0 shadow-2xl rounded-2xl">
                <CardContent className="p-8">
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName">Prénom *</Label>
                        <Input id="firstName" name="firstName" type="text" required aria-invalid={!!errors.firstName} aria-describedby={errors.firstName ? 'firstName-error' : undefined} className={`mt-2 ${errors.firstName ? 'border-red-500 focus-visible:ring-red-500' : ''}`} />
                        {errors.firstName && (<p id="firstName-error" className="mt-1 text-sm text-red-600">{errors.firstName}</p>)}
                      </div>
                      <div>
                        <Label htmlFor="lastName">Nom de famille *</Label>
                        <Input id="lastName" name="lastName" type="text" required aria-invalid={!!errors.lastName} aria-describedby={errors.lastName ? 'lastName-error' : undefined} className={`mt-2 ${errors.lastName ? 'border-red-500 focus-visible:ring-red-500' : ''}`} />
                        {errors.lastName && (<p id="lastName-error" className="mt-1 text-sm text-red-600">{errors.lastName}</p>)}
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="email">Adresse e-mail *</Label>
                      <Input id="email" name="email" type="email" required aria-invalid={!!errors.email} aria-describedby={errors.email ? 'email-error' : undefined} className={`mt-2 ${errors.email ? 'border-red-500 focus-visible:ring-red-500' : ''}`} />
                      {errors.email && (<p id="email-error" className="mt-1 text-sm text-red-600">{errors.email}</p>)}
                    </div>
                    <div>
                      <Label htmlFor="phone">Numéro de téléphone</Label>
                      <Input id="phone" name="phone" type="tel" className="mt-2" />
                    </div>
                    <div>
                      <Label htmlFor="inquiryType">Type de demande</Label>
                      <select name="inquiryType" className="w-full mt-2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option value="">Sélectionnez une option</option>
                        <option value="admissions">Admissions</option>
                        <option value="academics">Academiques</option>
                        <option value="student-services">Services étudiants</option>
                        <option value="financial">Financier/Commercial</option>
                        <option value="other">Autre</option>
                      </select>
                    </div>
                    <div>
                      <Label htmlFor="subject">Objet *</Label>
                      <Input id="subject" name="subject" type="text" required aria-invalid={!!errors.subject} aria-describedby={errors.subject ? 'subject-error' : undefined} className={`mt-2 ${errors.subject ? 'border-red-500 focus-visible:ring-red-500' : ''}`} />
                      {errors.subject && (<p id="subject-error" className="mt-1 text-sm text-red-600">{errors.subject}</p>)}
                    </div>
                    <div>
                      <Label htmlFor="message">Message *</Label>
                      <Textarea 
                        id="message" 
                        name="message"
                        required 
                        aria-invalid={!!errors.message}
                        aria-describedby={errors.message ? 'message-error' : undefined}
                        className={`mt-2 min-h-[120px] ${errors.message ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
                        placeholder="Please provide details about your inquiry..."
                      />
                      {errors.message && (<p id="message-error" className="mt-1 text-sm text-red-600">{errors.message}</p>)}
                    </div>
                    {/* Honeypot field: hidden from users, targeted by bots */}
                    <div className="hidden" aria-hidden="true">
                      <Label htmlFor="hp">Laissez ce champ vide</Label>
                      <Input id="hp" name="hp" type="text" autoComplete="off" tabIndex={-1} />
                    </div>
                    <Button type="submit" size="lg" disabled={submitting} className="w-full bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-70">
                      <Send className="w-4 h-4 mr-2" />
                      {submitting ? 'Envoi en cours…' : 'Envoyer le message'}
                    </Button>
                    <p className="text-sm text-gray-600 text-center">
                      Nous répondons généralement dans les 24 heures pendant les jours ouvrables.
                    </p>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Campus Information */}
            <div className="space-y-8">
              {/* Main Campus Info */}
              <Card className="border-0 shadow-xl rounded-2xl overflow-hidden">
                <div className="relative h-64">
                  <img
                    src="https://images.unsplash.com/photo-1746080730571-172cf48cc80e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYW1wdXMlMjBtYXAlMjB1bml2ZXJzaXR5JTIwZGlyZWN0aW9uc3xlbnwxfHx8fDE3NTc5NTUxMzl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                    alt="Campus Map"
                    className="w-full h-full object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <h3 className="text-2xl mb-2">Adresse du campus</h3>
                    <p className="text-blue-100">Man Lycee Club, Côte d’Ivoire</p>
                  </div>
                </div>
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="mb-3 flex items-center">
                        <Clock className="w-5 h-5 text-blue-600 mr-2" />
                        Heures d'ouverture
                      </h4>
                      <div className="space-y-1 text-sm text-gray-600">
                        <p>Lundi - Vendredi: 7:30 AM - 5:00 PM</p>
                        <p>Samedi: 9:00 AM - 1:00 PM</p>
                        <p>Dimanche: Fermé</p>
                      </div>
                    </div>
                    <div>
                      <h4 className="mb-3 flex items-center">
                        <Car className="w-5 h-5 text-blue-600 mr-2" />
                        Parking & Accès
                      </h4>
                      <div className="space-y-1 text-sm text-gray-600">
                        <p>Parking gratuit pour les visiteurs</p>
                        <p>Entrées accessibles</p>
                        <p>Point de contrôle de sécurité à l'entrée principale</p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-6 flex gap-3 flex-col sm:flex-row">
                    <Button
                      variant="outline"
                      className="flex-1"
                      onClick={() => openMapChoice(7.392357, -7.541391, 'KFP')}
                      aria-label="Choisir l'application pour l'itinéraire vers KFP"
                    >
                      <Navigation className="w-4 h-4 mr-2" />
                      Obtenir l'itinéraire
                    </Button>
                    <Button variant="outline" className="flex-1" onClick={() => setIsVirtualTourOpen(true)}>
                      <Video className="w-4 h-4 mr-2" />
                      Visite virtuelle
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Emergency Contact */}
              <Card className="border-0 shadow-lg rounded-2xl bg-red-50 border-red-200">
                <CardContent className="p-6">
                  <div className="flex items-start">
                    <div className="bg-red-100 p-3 rounded-full mr-4">
                      <Shield className="w-6 h-6 text-red-600" />
                    </div>
                    <div>
                      <h4 className="text-lg mb-2 text-red-900">Contact d'urgence</h4>
                      <p className="text-red-800 mb-2">Pour les questions d'urgence en dehors des heures de bureau :</p>
                      <p className="text-red-900">+225 05 95 96 04 30</p>
                      <p className="text-sm text-red-700 mt-2">Disponible 24/7 pour la sécurité des étudiants et les situations d'urgence</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Social Media & Newsletter */}
              <Card className="border-0 shadow-lg rounded-2xl bg-gradient-to-br from-blue-600 to-blue-800 text-white">
                <CardContent className="p-6">
                  <h4 className="text-xl mb-4">Restez Connecté</h4>
                  <p className="text-blue-100 mb-6">Suivez-nous pour les dernières nouvelles, événements et mises à jour de la communauté.</p>

                  <div className="flex gap-3 mb-6">
                    <a href="#" className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors">
                      <Facebook className="w-5 h-5" />
                    </a>
                    <a href="#" className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors">
                      <Twitter className="w-5 h-5" />
                    </a>
                    <a href="#" className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors">
                      <Instagram className="w-5 h-5" />
                    </a>
                  </div>

                  <div className="border-t border-white/20 pt-4">
                    <h5 className="mb-2">Inscription à la Newsletter</h5>
                    <div className="flex gap-2">
                      <Input placeholder="Votre email" className="bg-white/10 border-white/20 text-white placeholder:text-blue-200" />
                      <Button variant="secondary" className="bg-white text-blue-900 hover:bg-gray-100">
                        S'inscrire
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced FAQ Section */}
  <section className="py-12 sm:py-16 lg:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl mb-6">Questions Fréquemment Posées</h2>
            <p className="text-xl text-gray-600">
              Trouvez des réponses rapides aux questions courantes sur notre école et notre communauté
            </p>
          </div>

          <Accordion type="single" collapsible className="space-y-4">
            {faqItems.map((item, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border-0 bg-white rounded-2xl shadow-lg overflow-hidden">
                <AccordionTrigger className="px-8 py-6 text-left hover:no-underline hover:bg-gray-50">
                  <span className="text-lg">{item.question}</span>
                </AccordionTrigger>
                <AccordionContent className="px-8 pb-6 text-gray-600 leading-relaxed">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="text-center mt-8 sm:mt-12">
            <p className="text-gray-600 mb-4">Vous ne trouvez pas votre question ?</p>
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white" onClick={() => setIsAskOpen(true)}>
              <MessageSquare className="w-4 h-4 mr-2" />
              Poser une question
            </Button>
          </div>
        </div>
      </section>

      {/* Call to Action */}
  <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-r from-blue-600 to-blue-800">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl text-white mb-6">Prêt à vous connecter ?</h2>
          <p className="text-xl text-blue-100 mb-8 leading-relaxed">
            Nous sommes impatients de vous entendre et de vous aider à découvrir ce qui rend Kalogo Formation Professionnelle spéciale.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-blue-900 hover:bg-gray-100 px-8 py-3" onClick={() => setIsMeetingOpen(true)}>
              <Calendar className="w-4 h-4 mr-2" />
              Planifier une Réunion
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-900 px-8 py-3" onClick={() => setIsVirtualTourOpen(true)}>
              <Video className="w-4 h-4 mr-2" />
              Visite Virtuelle du Campus
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

// Modal: Virtual Tour Coming Soon
export function VirtualTourModal({ open, onOpenChange }: { open: boolean; onOpenChange: (v: boolean) => void }) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[calc(100vw-2rem)] sm:w-auto sm:max-w-md max-h-[90vh] overflow-hidden rounded-2xl border-t-4 border-blue-600">
        {/* Gradient header */}
        <div className="-mx-6 -mt-6 h-20 bg-gradient-to-r from-blue-600 to-blue-800" />
        <div className="max-h-[70vh] overflow-y-auto overscroll-contain">
          <div className="flex flex-col items-center text-center -mt-8">
            <div className="w-16 h-16 rounded-full bg-white shadow-lg flex items-center justify-center mb-3 ring-4 ring-white">
              <div className="w-14 h-14 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center">
                <Video className="w-7 h-7" />
              </div>
            </div>
            <DialogHeader className="items-center">
              <DialogTitle className="text-2xl text-blue-800">Visite virtuelle</DialogTitle>
              <DialogDescription className="text-gray-600">
                Bientôt disponible. Nous préparons une expérience immersive de visite du campus. Restez connectés !
              </DialogDescription>
            </DialogHeader>
          </div>
          <div className="mt-4 flex justify-center">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white" onClick={() => onOpenChange(false)}>Fermer</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// Modal: Schedule a Visit
export function ScheduleVisitModal({ open, onOpenChange }: { open: boolean; onOpenChange: (v: boolean) => void }) {
  const [loading, setLoading] = React.useState(false);
  const [errs, setErrs] = React.useState<Record<string, string>>({});
  // Normalize Ivory Coast phone numbers to E.164 (+225XXXXXXXXXX)
  const parseCIPhone = (raw: string) => {
    const digits = String(raw || '').replace(/\D/g, '');
    let nsn = digits;
    if (digits.startsWith('00225')) nsn = digits.slice(5);
    else if (digits.startsWith('225')) nsn = digits.slice(3);
    // Expect 10-digit national number after 2021 plan change
    if (nsn.length !== 10) return null;
    return {
      nsn,
      e164: `+225${nsn}`,
      display: `+225 ${nsn.replace(/(..)(..)(..)(..)(..)/, '$1 $2 $3 $4 $5')}`,
    };
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (loading) return;
    const form = e.currentTarget;
    const fd = new FormData(form);
  const fullName = String(fd.get('fullName') || '');
  const email = String(fd.get('email') || '');
  const phone = String(fd.get('phone') || '');
    const date = String(fd.get('date') || '');
    const time = String(fd.get('time') || '');
    const hp = String(fd.get('hp') || '');
    const errs: Record<string, string> = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!fullName || fullName.trim().length < 2) errs.fullName = 'Nom complet requis';
    if (!email || !emailRegex.test(email)) errs.email = 'Email invalide';
  const parsedPhone = parseCIPhone(phone);
  if (!parsedPhone) errs.phone = 'Numéro ivoirien requis (+225 et 10 chiffres). Ex: +225 01 01 45 67 89';
  if (!date) errs.date = 'Date requise';
    if (!time) errs.time = 'Heure requise';
    setErrs(errs);
    if (Object.keys(errs).length > 0) return;
    try {
      setLoading(true);
      if (hp.trim()) {
        toast.success('Visite confirmée');
        onOpenChange(false);
        form.reset();
        return;
      }
      const { sendContactMessage } = await import('../utils/sendContactMessage');
      const [firstName, ...rest] = fullName.trim().split(' ');
      const lastName = rest.join(' ') || '-';
  const subject = 'Schedule Visit';
  const message = `Demande de visite\nNom: ${fullName}\nEmail: ${email}\nTéléphone: ${parsedPhone?.e164 || '-'}\nDate: ${date}\nHeure: ${time}\nAdresse: Man Lycee Club, Côte d’Ivoire`;
      const res = await sendContactMessage({ firstName, lastName, email, subject, message });
      if (!res?.success) throw new Error(res?.error || 'Échec de la demande');
      toast.success('Merci, votre visite est confirmée.');
      onOpenChange(false);
      form.reset();
    } catch (err: any) {
      toast.error(err?.message || 'Impossible de confirmer la visite');
    } finally {
      setLoading(false);
    }
  };
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[calc(100vw-2rem)] sm:w-auto sm:max-w-2xl max-h-[90vh] overflow-hidden rounded-xl sm:rounded-2xl p-0">
        {/* Banner image */}
        <div className="h-36 sm:h-40 w-full bg-cover bg-center" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1664102306721-422dcc22d032?auto=format&fit=crop&w=1200&q=80')` }} />
        <div className="p-6 sm:p-8 max-h-[70vh] overflow-y-auto overscroll-contain">
          <DialogHeader>
            <DialogTitle className="text-2xl text-blue-800">Planifiez votre visite sur le campus</DialogTitle>
            <DialogDescription className="text-gray-600">Choisissez la date et l’heure qui vous conviennent.</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="mt-6 space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="fullName">Nom complet *</Label>
                <Input id="fullName" name="fullName" required className={`mt-2 ${errs.fullName ? 'border-red-500' : ''}`} />
                {errs.fullName && <p className="text-sm text-red-600 mt-1">{errs.fullName}</p>}
              </div>
              <div>
                <Label htmlFor="email">Email *</Label>
                <Input id="email" name="email" type="email" required className={`mt-2 ${errs.email ? 'border-red-500' : ''}`} />
                {errs.email && <p className="text-sm text-red-600 mt-1">{errs.email}</p>}
              </div>
            </div>
            <div>
              <Label htmlFor="phone">Téléphone *</Label>
              <Input id="phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" required placeholder="Ex: +225 01 01 45 67 89" className={`mt-2 ${errs.phone ? 'border-red-500' : ''}`} />
              {errs.phone && <p className="text-sm text-red-600 mt-1">{errs.phone}</p>}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="date">Date *</Label>
                <Input id="date" name="date" type="date" required className={`mt-2 ${errs.date ? 'border-red-500' : ''}`} />
                {errs.date && <p className="text-sm text-red-600 mt-1">{errs.date}</p>}
              </div>
              <div>
                <Label htmlFor="time">Heure *</Label>
                <Input id="time" name="time" type="time" required className={`mt-2 ${errs.time ? 'border-red-500' : ''}`} />
                {errs.time && <p className="text-sm text-red-600 mt-1">{errs.time}</p>}
              </div>
            </div>
            <div className="rounded-xl bg-blue-50 text-blue-900 p-4">
              <p className="font-medium">Adresse du campus</p>
              <p className="text-sm">Man Lycee Club, Côte d’Ivoire</p>
            </div>
            <div className="hidden" aria-hidden="true">
              <Input id="hp" name="hp" type="text" tabIndex={-1} autoComplete="off" />
            </div>
            <div className="flex justify-end gap-3">
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>Annuler</Button>
              <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white" disabled={loading}>{loading ? 'Confirmation…' : 'Confirmer la visite'}</Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// Modal: Schedule a Meeting
export function ScheduleMeetingModal({ open, onOpenChange }: { open: boolean; onOpenChange: (v: boolean) => void }) {
  const [loading, setLoading] = React.useState(false);
  const [errs, setErrs] = React.useState<Record<string, string>>({});
  // Normalize Ivory Coast phone numbers to E.164 (+225XXXXXXXXXX)
  const parseCIPhone = (raw: string) => {
    const digits = String(raw || '').replace(/\D/g, '');
    let nsn = digits;
    if (digits.startsWith('00225')) nsn = digits.slice(5);
    else if (digits.startsWith('225')) nsn = digits.slice(3);
    // Expect 10-digit national number after 2021 plan change
    if (nsn.length !== 10) return null;
    return {
      nsn,
      e164: `+225${nsn}`,
      display: `+225 ${nsn.replace(/(..)(..)(..)(..)(..)/, '$1 $2 $3 $4 $5')}`,
    };
  };
  const advisors = [
    { id: 'a1', name: 'Dr. Sarah Johnson', role: 'Conseillère académique' },
    { id: 'a2', name: 'Dr. David Chen', role: 'Programmes & Innovation' },
    { id: 'a3', name: 'Dr. Emily Rodriguez', role: 'Affaires étudiantes' },
  ];
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (loading) return;
    const form = e.currentTarget;
    const fd = new FormData(form);
    const fullName = String(fd.get('fullName') || '');
    const email = String(fd.get('email') || '');
    const phone = String(fd.get('phone') || '');
    const advisor = String(fd.get('advisor') || '');
    const date = String(fd.get('date') || '');
    const time = String(fd.get('time') || '');
    const hp = String(fd.get('hp') || '');
    const errs: Record<string, string> = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!fullName || fullName.trim().length < 2) errs.fullName = 'Nom complet requis';
    if (!email || !emailRegex.test(email)) errs.email = 'Email invalide';
    const parsedPhone = parseCIPhone(phone);
    if (!parsedPhone) errs.phone = 'Numéro ivoirien requis (+225 et 10 chiffres). Ex: +225 01 01 45 67 89';
    if (!advisor) errs.advisor = 'Sélectionnez un conseiller';
    if (!date) errs.date = 'Date requise';
    if (!time) errs.time = 'Heure requise';
    setErrs(errs);
    if (Object.keys(errs).length > 0) return;
    try {
      setLoading(true);
      if (hp.trim()) {
        toast.success('Rendez-vous réservé');
        onOpenChange(false);
        form.reset();
        return;
      }
      const { sendContactMessage } = await import('../utils/sendContactMessage');
      const [firstName, ...rest] = fullName.trim().split(' ');
      const lastName = rest.join(' ') || '-';
      const subject = 'Schedule Meeting';
      const message = `Demande de rendez-vous\nNom: ${fullName}\nEmail: ${email}\nTéléphone: ${parsedPhone?.e164 || '-'}\nConseiller: ${advisor}\nDate: ${date}\nHeure: ${time}`;
      const res = await sendContactMessage({ firstName, lastName, email, subject, message });
      if (!res?.success) throw new Error(res?.error || 'Échec de la demande');
      toast.success('Merci, votre rendez-vous est réservé.');
      onOpenChange(false);
      form.reset();
    } catch (err: any) {
      toast.error(err?.message || 'Impossible de réserver le rendez-vous');
    } finally {
      setLoading(false);
    }
  };
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[calc(100vw-2rem)] sm:w-auto sm:max-w-xl max-h-[90vh] overflow-hidden rounded-2xl">
        {/* Gradient header */}
        <div className="-mx-6 -mt-6 h-20 bg-gradient-to-r from-blue-600 to-blue-800" />
        <div className="p-6 sm:p-8 max-h-[70vh] overflow-y-auto overscroll-contain">
          <DialogHeader>
            <DialogTitle className="text-2xl text-blue-800">Rencontrez un membre de notre équipe académique</DialogTitle>
            <DialogDescription className="text-gray-600">Choisissez un conseiller et un créneau.</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="mt-6 space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="fullName">Nom complet *</Label>
                <Input id="fullName" name="fullName" required className={`mt-2 ${errs.fullName ? 'border-red-500' : ''}`} />
                {errs.fullName && <p className="text-sm text-red-600 mt-1">{errs.fullName}</p>}
              </div>
              <div>
                <Label htmlFor="email">Email *</Label>
                <Input id="email" name="email" type="email" required className={`mt-2 ${errs.email ? 'border-red-500' : ''}`} />
                {errs.email && <p className="text-sm text-red-600 mt-1">{errs.email}</p>}
              </div>
            </div>
            <div>
              <Label htmlFor="phone">Numéro de téléphone *</Label>
              <Input id="phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" required placeholder="Ex: +225 01 01 45 67 89" className={`mt-2 ${errs.phone ? 'border-red-500' : ''}`} />
              {errs.phone && <p className="text-sm text-red-600 mt-1">{errs.phone}</p>}
            </div>
            <div>
              <Label htmlFor="advisor">Conseiller *</Label>
              <select id="advisor" name="advisor" className={`w-full mt-2 px-3 py-2 border rounded-md ${errs.advisor ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500`}>
                <option value="">Sélectionner…</option>
                {advisors.map(a => (
                  <option key={a.id} value={a.name}>{a.name} — {a.role}</option>
                ))}
              </select>
              {errs.advisor && <p className="text-sm text-red-600 mt-1">{errs.advisor}</p>}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="date">Date *</Label>
                <Input id="date" name="date" type="date" required className={`mt-2 ${errs.date ? 'border-red-500' : ''}`} />
                {errs.date && <p className="text-sm text-red-600 mt-1">{errs.date}</p>}
              </div>
              <div>
                <Label htmlFor="time">Heure *</Label>
                <Input id="time" name="time" type="time" required className={`mt-2 ${errs.time ? 'border-red-500' : ''}`} />
                {errs.time && <p className="text-sm text-red-600 mt-1">{errs.time}</p>}
              </div>
            </div>
            <div className="hidden" aria-hidden="true">
              <Input id="hp" name="hp" type="text" tabIndex={-1} autoComplete="off" />
            </div>
            <div className="flex justify-end gap-3">
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>Annuler</Button>
              <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white" disabled={loading}>{loading ? 'Réservation…' : 'Réserver un rendez-vous'}</Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// Modal: Ask a Question
export function AskQuestionModal({ open, onOpenChange }: { open: boolean; onOpenChange: (v: boolean) => void }) {
  const [loading, setLoading] = React.useState(false);
  const [errs, setErrs] = React.useState<Record<string, string>>({});
  // Normalize Ivory Coast phone numbers to E.164 (+225XXXXXXXXXX)
  const parseCIPhone = (raw: string) => {
    const digits = String(raw || '').replace(/\D/g, '');
    let nsn = digits;
    if (digits.startsWith('00225')) nsn = digits.slice(5);
    else if (digits.startsWith('225')) nsn = digits.slice(3);
    if (nsn.length !== 10) return null;
    return {
      nsn,
      e164: `+225${nsn}`,
      display: `+225 ${nsn.replace(/(..)(..)(..)(..)(..)/, '$1 $2 $3 $4 $5')}`,
    };
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (loading) return;
    const form = e.currentTarget;
    const fd = new FormData(form);
    const fullName = String(fd.get('fullName') || '');
    const email = String(fd.get('email') || '');
  const phone = String(fd.get('phone') || '');
  const messageText = String(fd.get('message') || '');
    const hp = String(fd.get('hp') || '');
    const errs: Record<string, string> = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!fullName || fullName.trim().length < 2) errs.fullName = 'Nom complet requis';
    if (!email || !emailRegex.test(email)) errs.email = 'Email invalide';
  const parsedPhone = parseCIPhone(phone);
  if (!parsedPhone) errs.phone = 'Numéro ivoirien requis (+225 et 10 chiffres). Ex: +225 01 01 45 67 89';
    if (!messageText || messageText.trim().length < 10) errs.message = 'Message trop court (min 10 caractères)';
    setErrs(errs);
    if (Object.keys(errs).length > 0) return;
    try {
      setLoading(true);
      if (hp.trim()) {
        toast.success('Message envoyé');
        onOpenChange(false);
        form.reset();
        return;
      }
      const { sendContactMessage } = await import('../utils/sendContactMessage');
      const [firstName, ...rest] = fullName.trim().split(' ');
      const lastName = rest.join(' ') || '-';
  const subject = 'Ask a Question';
  const composed = `Question\nNom: ${fullName}\nEmail: ${email}\nTéléphone: ${parsedPhone?.e164 || '-'}\n\n${messageText}`;
  const res = await sendContactMessage({ firstName, lastName, email, subject, message: composed });
      if (!res?.success) throw new Error(res?.error || 'Échec de l\'envoi');
      toast.success('Merci, votre question a été envoyée. Nous vous répondrons sous 24h.');
      onOpenChange(false);
      form.reset();
    } catch (err: any) {
      toast.error(err?.message || 'Impossible d\'envoyer le message');
    } finally {
      setLoading(false);
    }
  };
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[calc(100vw-2rem)] sm:w-auto sm:max-w-lg max-h-[90vh] overflow-hidden rounded-2xl">
        {/* Gradient header */}
        <div className="-mx-6 -mt-6 h-20 bg-gradient-to-r from-blue-600 to-blue-800" />
        <div className="p-6 sm:p-8 max-h-[70vh] overflow-y-auto overscroll-contain">
          <DialogHeader>
            <DialogTitle className="text-2xl text-blue-800">Posez-nous votre question</DialogTitle>
            <DialogDescription className="text-gray-600">Nous vous répondrons sous 24h.</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="mt-6 space-y-5">
            <div>
              <Label htmlFor="fullName">Nom complet *</Label>
              <Input id="fullName" name="fullName" required className={`mt-2 ${errs.fullName ? 'border-red-500' : ''}`} />
              {errs.fullName && <p className="text-sm text-red-600 mt-1">{errs.fullName}</p>}
            </div>
            <div>
              <Label htmlFor="email">Email *</Label>
              <Input id="email" name="email" type="email" required className={`mt-2 ${errs.email ? 'border-red-500' : ''}`} />
              {errs.email && <p className="text-sm text-red-600 mt-1">{errs.email}</p>}
            </div>
            <div>
              <Label htmlFor="phone">Numéro de téléphone *</Label>
              <Input id="phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" required placeholder="Ex: +225 01 01 45 67 89" className={`mt-2 ${errs.phone ? 'border-red-500' : ''}`} />
              {errs.phone && <p className="text-sm text-red-600 mt-1">{errs.phone}</p>}
            </div>
            <div>
              <Label htmlFor="message">Message *</Label>
              <Textarea id="message" name="message" required className={`mt-2 min-h-[120px] ${errs.message ? 'border-red-500' : ''}`} placeholder="Votre question..." />
              {errs.message && <p className="text-sm text-red-600 mt-1">{errs.message}</p>}
            </div>
            <div className="hidden" aria-hidden="true">
              <Input id="hp" name="hp" type="text" tabIndex={-1} autoComplete="off" />
            </div>
            <div className="flex justify-end gap-3">
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>Annuler</Button>
              <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white" disabled={loading}>{loading ? 'Envoi…' : 'Envoyer le message'}</Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// Modal: Choose Maps Provider
function MapsChoiceModal({ open, onOpenChange, target }: { open: boolean; onOpenChange: (v: boolean) => void; target: { lat: number; lng: number; label?: string } | null }) {
  const appleUrl = target ? `http://maps.apple.com/?daddr=${target.lat},${target.lng}${target.label ? `&q=${encodeURIComponent(target.label)}` : ''}` : '#';
  const googleUrl = target ? `https://www.google.com/maps/dir/?api=1&destination=${target.lat},${target.lng}` : '#';
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[calc(100vw-2rem)] sm:w-auto sm:max-w-sm max-h-[90vh] overflow-hidden rounded-2xl">
        <DialogHeader>
          <DialogTitle>Ouvrir l’itinéraire</DialogTitle>
          <DialogDescription>Choisissez l’application de cartographie</DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
          <Button className="bg-black text-white hover:bg-black/90" asChild disabled={!target}>
            <a href={appleUrl} target="_blank" rel="noopener noreferrer" aria-label="Ouvrir dans Apple Maps">Apple Maps</a>
          </Button>
          <Button className="bg-green-600 text-white hover:bg-green-700" asChild disabled={!target}>
            <a href={googleUrl} target="_blank" rel="noopener noreferrer" aria-label="Ouvrir dans Google Maps">Google Maps</a>
          </Button>
        </div>
        <div className="mt-4 flex justify-center">
          <Button variant="outline" onClick={() => onOpenChange(false)}>Annuler</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}