import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
// Update the import path to match the actual location of your Dialog components
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "../components/ui/Dialog";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "../components/ui/select";
import { Coins } from "lucide-react";
import {
  CheckCircle,
  Download,
  Phone,
  Mail,
  MapPin,
  Clock,
  Calendar,
  Users,
  GraduationCap,
  FileText,
  UserCheck,
  CreditCard,
  Star,
  TrendingUp,
  Sparkles,
} from "lucide-react";
import { toast } from "react-hot-toast";
import {supabase} from '../lib/supabaseClient';
import { sendSubmission } from '../utils/sendSubmission';
// Local images must be imported for Vite to bundle them
import heroManCote from '../images/Man-Cote-dIvoire.jpg';
import img2181 from '../images/IMG_2181.jpeg';

export function Admissions({ onPageChange }: { onPageChange?: (page: string) => void }) {
  // --- Sliding pill indicator state/refs (works without Radix CSS vars) ---
  const [tabValue, setTabValue] = React.useState<"general" | "documents">("general");
  const listWrapRef = React.useRef<HTMLDivElement | null>(null);
  const indicatorRef = React.useRef<HTMLDivElement | null>(null);

  const updateIndicator = React.useCallback(() => {
    const wrap = listWrapRef.current;
    const indicator = indicatorRef.current;
    if (!wrap || !indicator) return;
    const active = wrap.querySelector<HTMLElement>('[data-state="active"]');
    if (!active) return;

    const wrapRect = wrap.getBoundingClientRect();
    const aRect = active.getBoundingClientRect();
    const left = aRect.left - wrapRect.left;
    const width = aRect.width;

    // animate to active trigger
    indicator.style.transform = `translateX(${left}px)`;
    indicator.style.width = `${width}px`;
  }, []);

  React.useEffect(() => {
    // run after mount and whenever tab changes / window resizes
    const r = () => requestAnimationFrame(updateIndicator);
    r();
    window.addEventListener("resize", r);
    return () => window.removeEventListener("resize", r);
  }, [tabValue, updateIndicator]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isApplicationDialogOpen, setIsApplicationDialogOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState('');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    studentName: '',
    gradeLevel: '',
    message: '',
    emergencyContactName: '',
    emergencyContactPhone: '',
    emergencyContactRelation: ''
  });
 

  // ------------------ My data ------------------

  const [applicationData, setApplicationData] = useState({
    // Informations Personnelles
    nom: '',
    prenoms: '',
    dateNaissance: '',
    lieuNaissance: '',
    nationalite: '',
    adresse: '',
    ville: '',
    telephone: '',
    email: '',
    numeroId: '',
    fullNameDeclaration: '',
    dateDeclaration: '',
    

    
    // Informations Académiques
    dernierDiplome: '',
    etablissementOrigine: '',
    niveauScolaire: '',
    numeroMatricule: '',
    
    // Formation Choisie
    intituleFormation: '',
    dureeFormation: '',
    niveauRequis: '',
    
    // Situation Professionnelle
    emploi: '',
    nomEntreprise: '',
    posteOccupe: '',
    experiencePro: '',
    
    // Personne à Contacter
    nomContact: '',
    lienParente: '',
    telephoneContact: '',
    adresseContact: '',
    
    // Documents
    documents: {
      ficheInscription: false,
      extraitActeNaissance: false,
      numeroMatricule: false,
      certificatScolarite: false,
      releveNotesBT: false,
      livretScolaire: false,
      photocopieCNI: false,
      photocopieDiplome: false,
      photosIdentite: false,
      lettreMotivation: false,
      cv: false,
      photocopieCMU: false,
      carnetVaccination: false,
      chemiseCartonnee: false
    }
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleApplicationInputChange = (field: string, value: string | boolean) => {
    if (field.startsWith('documents.')) {
      const docField = field.split('.')[1];
      setApplicationData(prev => ({
        ...prev,
        documents: { ...prev.documents, [docField]: value }
      }));
    } else {
      setApplicationData(prev => ({ ...prev, [field]: value }));
    }
  };

  const [_, setAuthLoading] = useState(false);

  async function ensureSignedIn(redirectIntent?: { intent: 'application' | 'event'; title?: string }) {
    const { data } = await supabase.auth.getUser();
    if (data.user) return data.user;

    // Build a redirect URL that preserves the user's intent so we can reopen the right dialog after OAuth
    const url = new URL(window.location.href);
    if (redirectIntent?.intent) {
      url.searchParams.set('intent', redirectIntent.intent);
      if (redirectIntent.intent === 'event' && redirectIntent.title) {
        url.searchParams.set('title', redirectIntent.title);
      } else {
        url.searchParams.delete('title');
      }
    }

    setAuthLoading(true);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: url.toString() },
    });
    setAuthLoading(false);
    if (error) throw new Error("Echec de connexion avec Google");
    return null;
  }

  // On mount, check if we have an intent in the URL from OAuth redirect and reopen the correct dialog
  React.useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const intent = params.get('intent');
    if (intent === 'application') {
      setIsApplicationDialogOpen(true);
      // clean the URL so it doesn't reopen on refresh
      window.history.replaceState({}, '', window.location.pathname);
    } else if (intent === 'event') {
      const title = params.get('title') || '';
      setSelectedEvent(title);
      setIsDialogOpen(true);
      window.history.replaceState({}, '', window.location.pathname);
    }
  }, []);

  const handleFormSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
    try{
      const user = await ensureSignedIn();
      if (!user) return; // will redirect to Google Sign-In
      await sendSubmission("registration", {
        selectedEvent,
        ...formData,
        submittedAt: new Date().toISOString(),
        userId: user.id,
      });
      toast.success('Inscription envoyée avec succès ! Nous vous contacterons bientôt.');

      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        studentName: '',
        gradeLevel: '',
        message: '',
        emergencyContactName: '',
        emergencyContactPhone: '',
        emergencyContactRelation: ''
      });
      setIsDialogOpen(false);
    }catch(error: any){
      toast.error('Une erreur est survenue lors de l\'inscription.');
    }
    
  };

  const handleApplicationSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const user = await ensureSignedIn();
      if (!user) return;

      await sendSubmission("application", {
        ...applicationData,
        submittedAt: new Date().toISOString(),
        userId: user.id,
      });

      toast.success("Candidature envoyée avec succès ! Un email de confirmation vous a été transmis.");
      setIsApplicationDialogOpen(false);
      
      // Reset form and close dialog
      setApplicationData({
        nom: '', prenoms: '', dateNaissance: '', lieuNaissance: '', nationalite: '',
        adresse: '', ville: '', telephone: '', email: '', numeroId: '',
        dernierDiplome: '', etablissementOrigine: '', niveauScolaire: '', numeroMatricule: '',
        intituleFormation: '', dureeFormation: '', niveauRequis: '',
        emploi: '', nomEntreprise: '', posteOccupe: '', experiencePro: '',
        nomContact: '', lienParente: '', telephoneContact: '', adresseContact: '',
        fullNameDeclaration: '',
        dateDeclaration: '',
      
        documents: {
          ficheInscription: false, extraitActeNaissance: false, numeroMatricule: false,
          certificatScolarite: false, releveNotesBT: false, livretScolaire: false,
          photocopieCNI: false, photocopieDiplome: false, photosIdentite: false,
          lettreMotivation: false, cv: false, photocopieCMU: false,
          carnetVaccination: false, chemiseCartonnee: false
        }
      });
      setIsApplicationDialogOpen(false);
    } catch (error: any) {
      toast.error('Une erreur est survenue lors de l\'envoi de la candidature.');
    }
  };

  const openRegistrationForm = async (eventTitle: string) => {
    // Require sign-in before opening the event registration form
    const user = await ensureSignedIn({ intent: 'event', title: eventTitle });
    if (!user) return; // user will be redirected to sign in
    setSelectedEvent(eventTitle);
    setIsDialogOpen(true);
  };

  const openApplicationForm = async () => {
    // Require sign-in before opening the application dialog
    const user = await ensureSignedIn({ intent: 'application' });
    if (!user) return; // user will be redirected to sign in
    setIsApplicationDialogOpen(true);
  };

  const generateWordDoc = () => {
    // Create Word document content with proper formatting
    const wordContent = `
      <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
      <head>
        <meta charset='utf-8'>
        <title>Fiche d'Inscription AE</title>
        <style>
          body { 
            font-family: Arial, sans-serif; 
            margin: 40px; 
            line-height: 1.6;
          }
          h1 { 
            color: #3B82F6; 
            text-align: center; 
            margin-bottom: 30px; 
            border-bottom: 3px solid #3B82F6;
            padding-bottom: 10px;
          }
          h2 { 
            color: #1E40AF; 
            border-bottom: 2px solid #3B82F6; 
            padding-bottom: 5px; 
            margin-top: 30px; 
            margin-bottom: 15px;
          }
          .field { 
            margin: 15px 0; 
            display: flex;
            align-items: baseline;
          }
          .field-label { 
            font-weight: bold; 
            min-width: 250px;
            display: inline-block;
          }
          .field-line { 
            border-bottom: 1px solid #000; 
            flex-grow: 1; 
            margin-left: 10px;
            min-height: 20px;
            min-width: 200px;
          }
          .checkbox-section { 
            margin: 20px 0; 
          }
          .checkbox-item { 
            margin: 8px 0; 
            display: flex;
            align-items: center;
          }
          .checkbox { 
            border: 2px solid #000; 
            width: 15px; 
            height: 15px; 
            margin-right: 10px;
            display: inline-block;
          }
          .declaration { 
            background-color: #F8F9FA; 
            padding: 20px; 
            margin: 30px 0; 
            border: 2px solid #3B82F6; 
            border-radius: 5px;

          }
          .signature-section {
            margin-top: 40px;
          }
          .date-signature {
            display: flex;
            justify-content: space-between;
            margin-top: 30px;
          }
          .date-field, .signature-field {
            flex: 1;
            margin: 0 20px;
          }
        </style>
      </head>
      <body>
        <h1>FICHE D'INSCRIPTION – AE (Academic Excellence)</h1>
        
        <h2>1. Informations Personnelles</h2>
        <div class="field">
          <span class="field-label">Nom :</span>
          <span class="field-line"></span>
        </div>
        <div class="field">
          <span class="field-label">Prénom(s) :</span>
          <span class="field-line"></span>
        </div>
        <div class="field">
          <span class="field-label">Date de Naissance :</span>
          <span class="field-line"></span>
        </div>
        <div class="field">
          <span class="field-label">Lieu de Naissance :</span>
          <span class="field-line"></span>
        </div>
        <div class="field">
          <span class="field-label">Nationalité :</span>
          <span class="field-line"></span>
        </div>
        <div class="field">
          <span class="field-label">Adresse (précisez le quartier où habite l'élève) :</span>
        </div>
        <div class="field">
          <span class="field-line" style="margin-left: 0; margin-top: 5px;"></span>
        </div>
        <div class="field">
          <span class="field-line" style="margin-left: 0;"></span>
        </div>
        <div class="field">
          <span class="field-label">Ville :</span>
          <span class="field-line"></span>
        </div>
        <div class="field">
          <span class="field-label">Téléphone :</span>
          <span class="field-line"></span>
        </div>
        <div class="field">
          <span class="field-label">Email :</span>
          <span class="field-line"></span>
        </div>
        <div class="field">
          <span class="field-label">Numéro CNI/Passeport/Carte d'Élève/Carte de Séjour :</span>
        </div>
        <div class="field">
          <span class="field-line" style="margin-left: 0; margin-top: 5px;"></span>
        </div>

        <h2>2. Informations Académiques</h2>
        <div class="field">
          <span class="field-label">Dernier Diplôme Obtenu :</span>
          <span class="field-line"></span>
        </div>
        <div class="field">
          <span class="field-label">Établissement d'Origine :</span>
          <span class="field-line"></span>
        </div>
        <div class="field">
          <span class="field-label">Niveau scolaire :</span>
          <span class="field-line"></span>
        </div>
        <div class="field">
          <span class="field-label">Numéro Matricule :</span>
          <span class="field-line"></span>
        </div>

        <h2>3. Formation Choisie</h2>
        <div class="field">
          <span class="field-label">Intitulé de la Formation :</span>
          <span class="field-line"></span>
        </div>
        <div class="field">
          <span class="field-label">Durée de la Formation :</span>
          <span class="field-line"></span>
        </div>
        <div class="field">
          <span class="field-label">Niveau Requis ou connaissance antérieure :</span>
        </div>
        <div class="field">
          <span class="field-line" style="margin-left: 0; margin-top: 5px;"></span>
        </div>

        <h2>4. Situation Professionnelle</h2>
        <div class="field">
          <span class="field-label">Actuellement en Emploi :</span>
          <span class="checkbox"></span> Oui &nbsp;&nbsp;&nbsp;
          <span class="checkbox"></span> Non
        </div>
        <div class="field">
          <span class="field-label">Si oui, nom de l'entreprise :</span>
          <span class="field-line"></span>
        </div>
        <div class="field">
          <span class="field-label">Poste Occupé :</span>
          <span class="field-line"></span>
        </div>
        <div class="field">
          <span class="field-label">Expérience Professionnelle (en années) :</span>
          <span class="field-line"></span>
        </div>

        <h2>5. Personne à Contacter en Cas d'Urgence</h2>
        <div class="field">
          <span class="field-label">Nom :</span>
          <span class="field-line"></span>
        </div>
        <div class="field">
          <span class="field-label">Lien de Parenté :</span>
          <span class="field-line"></span>
        </div>
        <div class="field">
          <span class="field-label">Téléphone :</span>
          <span class="field-line"></span>
        </div>
        <div class="field">
          <span class="field-label">Adresse (précisez le lieu où habite la personne à contacter) :</span>
        </div>
        <div class="field">
          <span class="field-line" style="margin-left: 0; margin-top: 5px;"></span>
        </div>

        <h2>6. Documents à Joindre au Dossier d'Inscription</h2>
        <div class="checkbox-section">
          <div class="checkbox-item">
            <span class="checkbox"></span>
            <span>1 Fiche d'inscription (à retirer au secrétariat de l'établissement)</span>
          </div>
          <div class="checkbox-item">
            <span class="checkbox"></span>
            <span>1 Extrait d'acte de naissance original et lisible</span>
          </div>
          <div class="checkbox-item">
            <span class="checkbox"></span>
            <span>Le numéro matricule</span>
          </div>
          <div class="checkbox-item">
            <span class="checkbox"></span>
            <span>1 Certificat de scolarité (de la 6e à la 3e) + le relevé de notes à l'examen du BEPC</span>
          </div>
          <div class="checkbox-item">
            <span class="checkbox"></span>
            <span>Le relevé de notes au BT</span>
          </div>
          <div class="checkbox-item">
            <span class="checkbox"></span>
            <span>Livret scolaires</span>
          </div>
          <div class="checkbox-item">
            <span class="checkbox"></span>
            <span>Photocopie de la Carte d'Identité</span>
          </div>
          <div class="checkbox-item">
            <span class="checkbox"></span>
            <span>Photocopie du Dernier Diplôme Obtenu</span>
          </div>
          <div class="checkbox-item">
            <span class="checkbox"></span>
            <span>Photos d'Identité (x2)</span>
          </div>
          <div class="checkbox-item">
            <span class="checkbox"></span>
            <span>Lettre de Motivation</span>
          </div>
          <div class="checkbox-item">
            <span class="checkbox"></span>
            <span>CV (si applicable)</span>
          </div>
          <div class="checkbox-item">
            <span class="checkbox"></span>
            <span>Photocopie de la carte CMU (x2)</span>
          </div>
          <div class="checkbox-item">
            <span class="checkbox"></span>
            <span>Carnet de vaccination (BCG contre la Tuberculose, Méningite et Fièvre typhoïde) (x1)</span>
          </div>
          <div class="checkbox-item">
            <span class="checkbox"></span>
            <span>Chemise cartonné (Électricité : Bleue, Sciences Médico-sociales : Vert)</span>
          </div>
        </div>

        <h2>7. Déclaration et Signature</h2>
        <div class="declaration">
          <p>Je soussigné(e) <strong>[Nom, Prénom]</strong>, déclare sur l'honneur que les informations fournies dans cette fiche d'inscription sont exactes et complètes. J'accepte les conditions d'admission et m'engage à respecter le règlement intérieur de l'établissement.</p>
        </div>
        
        <div class="date-signature">
          <div class="date-field">
            <strong>Date :</strong> ___ / ___ / ______
          </div>
          <div class="signature-field">
            <strong>Signature :</strong> _______________________________
          </div>
        </div>
      </body>
      </html>
    `;

    // Create and download the Word document
    const blob = new Blob([wordContent], { 
      type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' 
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Modele_Fiche_Inscription_Kalogo.doc';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    toast.success('Application form downloaded as Word document! Please fill it out and submit to our admissions office.');
  };



  const admissionRequirements = {
    general: [
      { item: "1 Fiche d’inscription (à retirer au secrétariat de l’établissement)", description: "Tous les élèves" },
      { item: "1 extrait d’acte de naissance original et lisible ", description: "Nouveaux élèves" },
      { item: "Le numéro matricule", description: "Affectés et non Affectés" },
      { item: "1 Certificat de scolarité (de la 6e à la 3e) + le relevé de notes à l’examen du BEPC", description: "Nouveaux inscrits en 1ereAnnee BT avec le niveau 3e" },
      { item: "3 Bulletins trimestriels de l'année scolaire precedente et 1 certificat de scolarite", description: "Nouveaux inscrits en 2e année et 3e année" },
      { item: "Le relevé de notes au BT", description: "Redoublants de 3e année" },
      { item: "Livret scolaires", description: "Tous les nouveaux sauf les non redoublants de 2e année" },
      { item: "2 Copies de la carte CMU ", description: "Tous les élèves" },
      { item: "1 Carnet de vaccination( Contre la méningite, contre la fièvre typhoïde  +Résultat d’examen de la tuberculose)", description: "Tous les élèves" },
      { item: "1 Chemise cartonnée de couleur( ELECTRICITE Bleu, SCIENCE MEDICO-SOCIALES VERT)", description: "Tous les élèves" }
    ],
    "services ecole": [
      { item: "Infirmerie ", description: "Tous les élèves" },
      { item: "Feuilles de composition personnalisées", description: "Interrogations et Devoirs de tables pour toute l’année scolaire" },
      { item: "Cours d’informatique", description: "Obligatoire de la 1ere a la 3e année BT" },
      { item: "Macarons plus tenue de sport", description: "Tous les élèves" },
      { item:"Bibliothèque", description:"Pour tous les niveaux et tous les élèves du BT" },
      { item:"Inscription en ligne", description:"Elèves concernés" },
      { item:"Travaux dirigés par mois ", description:"Voir liste des fournitures" },
      { item:"3 Paquet de marker Effaçable Marque SCHINEIDER couleur bleu, noir et rouge", description:"Tous les élèves"},
      { item:"Paquet de Rame Double A ou Paper One", description:"Tous les élèves"},
    ],
  };

  const enrollmentProcess = [
    {
      Étape: 1,
      title: "Dépôt du dossier physique au sein de l'établissement",
      description: "Remettre tous les documents requis au secrétariat.",
      timeline: "Varies, selon la disponibilité des documents",
      icon: FileText,
      color: "bg-blue-100 text-blue-600",
    },
    {
      Étape: 2,
      title: "Vérification des documents",
      description: "Notre comité d'admission examine attentivement tous les documents et relevés de notes soumis.",
      timeline: "30 minutes - 1 heure",
      icon: UserCheck,
      color: "bg-green-100 text-green-600",
    },
    {
      Étape: 3,
      title: "Visite guidée de l'établissement",
      description: "Visite de l'établissement pour découvrir les installations et rencontrer les enseignants.",
      timeline: "10-15 minutes",
      icon: MapPin,
      color: "bg-purple-100 text-purple-600",
    },
    {
      Étape: 4,
      title: "Réussir mes études",
      description: "Test d'entrée pour vérifier le niveau de chaque élève afin d'être mieux encadré.",
      timeline: "1 heure",
      icon: Star,
      color: "bg-orange-100 text-orange-600",
    },
    {
      Étape: 5,
      title: "Début des cours",
      description: "Brève orientation pour les nouveaux étudiants et début des cours.",
      timeline: "Immédiat dependant de la date d'inscription et la formation",
      icon: Calendar,
      color: "bg-orange-100 text-orange-600",
    },

    {
      Étape: 6,
      title: "Message Personnel de la Direction",
      description: "À nos chers élèves : votre détermination est notre plus grande fierté. À l'aube d'une nouvelle étape, Nous vous adressons nos vœux les plus sincères. Votre travail et votre persévérance seront récompensés.",
      timeline: "Vous êtes sur le point de commencer une aventure passionnante",
      icon: Sparkles,
      color: "bg-orange-100 text-orange-600",
    }
  ];

  const tuitionStructure = [
    {
      level: 'Elèves affectés',
      grades: '1ere Année BT',
      registrationFees: 50100,
      additionalFees: 35000,
      tuition: 0,
      services: 42000,
      total: 127100,
      description: "Pour les élèves affectés par l'État"
    },
    {
      level: 'Elèves non affectés',
      grades: '1ere Année BT',
      registrationFees: 50100,
      additionalFees: 35000,
      tuition: 130000,
      services: 42000,
      total: 257100,
      description: "Pour les élèves non affectés par l'État"
    },
    {
      level: 'Formation qualifiante',
      grades: 'Disponible pour tous les niveaux',
      registrationFees: 50100,
      additionalFees: 35000,
      tuition: 185000,
      services: 42000,
      total: 312100,
      description: 'Programme axé sur les compétences professionnelles'
    },
    {
      level: 'Elèves internationaux',
      grades: 'Tous niveaux, dependant de la formation',
      registrationFees: 50100,
      additionalFees: 35000,
      tuition: 370000,
      services: 42000,
      total: 497100,
      description: 'Pour les étudiants venant de l\'extérieur du pays'
    }
  ];


  const admissionStats = [
    { label: "Affectés de l'Etat", value: "250+", icon: FileText },
    { label: "Taux d'Acceptation", value: "75%", icon: TrendingUp },
    { label: "Étudiants Inscrits", value: "260+", icon: Users },
    { label: "Bénéficiaires d'Aide Financière", value: "100%", icon: Coins },
  ];


  const upcomingEvents = [
    {
      title: "Sortie Pédagogique (Premier trimestre)",
      date: "March 2026",
      time: "10:00 AM - 2:00 PM",
      description: "Visite d'un site touristique de la région de Man.",
    },
    {
      title: "Decouverte du Monde Professionnel (Deuxième trimestre)",
      date: "Juin 2026",
      time: "10:00 AM - 3:00 PM",
      description: "Visite des entreprises publiques et privées (Hôpitaux publics, CIE)",
    },
    {
      title: "Intramural Journée Sportive (Troisième trimestre)",
      date: "Septembre 2026",
      time: "8:00 AM - 3:00 PM",
      description: "Tournois inter-classes",
    },
    {
      title: "Action de Solidarité Communautaire (Quatrième trimestre)",
      date: "Décembre 2026",
      time: "8:00 AM - 4:00 PM",
      description: "Activités de bénévolat et de service communautaire dans la ville de Man",
    },
  ];

  return (
    <div>
      {/* Immersive Hero Section */}
  <section className="relative h-auto min-h-[420px] sm:h-[600px] pt-20 sm:pt-24 flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${heroManCote})`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-blue-800/70" />
        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
          <h1 className="text-5xl md:text-6xl mb-6 leading-tight">Rejoignez Kalogo Formation Professionelle</h1>
          <p className="text-xl md:text-2xl mb-8 leading-relaxed opacity-95">
            Commencez votre parcours vers l'excellence académique et l'épanouissement personnel au sein de notre communauté d'apprentissage dynamique.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-blue-900 hover:bg-gray-100 px-8 py-3" onClick={openApplicationForm}>
              Postuler Maintenant
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-blue-900 px-8 py-3"
              onClick={() => {
                try {
                  const url = new URL(window.location.href);
                  url.searchParams.set('intent', 'visit');
                  window.history.replaceState({}, '', url.toString());
                } catch {}
                onPageChange?.('contact');
              }}
            >
              Planifier une Visite
            </Button>
          </div>
        </div>
      </section>

      {/* Admission Statistics */}
      <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl mb-6">Admissions en un coup d'œil</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Rejoignez une communauté d'apprentissage dynamique où chaque étudiant est valorisé et soutenu.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {admissionStats.map((stat, index) => (
              <Card key={index} className="text-center hover:shadow-xl transition-all duration-300 border border-gray-100 rounded-2xl">
                <CardContent className="p-8">
                  <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <stat.icon className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-3xl mb-2 text-blue-600">{stat.value}</h3>
                  <p className="text-gray-600">{stat.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Admission Requirements */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl mb-6">Conditions d'admission</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Nous avons simplifié notre processus d'admission pour le rendre clair tout en garantissant le meilleur ajustement pour notre communauté.
            </p>
          </div>

          <Tabs defaultValue="general" value={tabValue} onValueChange={(v) => setTabValue(v as "general" | "documents")} className="w-full">
            {/* custom sliding segmented control */}
            <div className="relative w-fit mx-auto mb-12" ref={listWrapRef}>
              <div
                ref={indicatorRef}
                className="absolute inset-y-1 left-0 rounded-full bg-white shadow transition-transform duration-300 ease-in-out"
                style={{ width: 0 }}
              />
              <TabsList className="flex bg-gray-100 rounded-full p-1 w-fit">
                <TabsTrigger
                  value="general"
                  className="relative z-10 px-6 py-2 rounded-full font-medium data-[state=active]:text-blue-700 text-gray-600 transition-colors"
                >
                  Documents requis
                </TabsTrigger>
                <TabsTrigger
                  value="services ecole"
                  className="relative z-10 px-6 py-2 rounded-full font-medium data-[state=active]:text-blue-700 text-gray-600 transition-colors"
                >
                  Services de l'école
                </TabsTrigger>
              </TabsList>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12"> 
              <div>
                <TabsContent value="general">
                  <div className="space-y-6">
                    {admissionRequirements.general.map((req, index) => (
                      <div
                        key={index}
                        className="flex items-start border-l-4 border-blue-600 bg-blue-50/30 rounded-2xl p-6 shadow-md hover:shadow-lg transition"
                      >
                        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mr-4">
                          <CheckCircle className="w-5 h-5 text-green-600" />
                        </div>
                        <div>
                          <h4 className="text-base font-semibold text-gray-900 mb-1">{req.item}</h4>
                          <p className="text-gray-600 text-sm">{req.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="services ecole">
                  <div className="space-y-6">
                    {admissionRequirements["services ecole"].map((req, index) => (
                      <div
                        key={index}
                        className="flex items-start border-l-4 border-blue-600 bg-blue-50/30 rounded-2xl p-6 shadow-md hover:shadow-lg transition"
                      >
                        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mr-4">
                          <CheckCircle className="w-5 h-5 text-green-600" />
                        </div>
                        <div>
                          <h4 className="text-base font-semibold text-gray-900 mb-1">{req.item}</h4>
                          <p className="text-gray-600 text-sm">{req.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </div>

              {/* Image + Important Dates */}
              {/* Right column: Image + Important Dates with flush alignment */}
      <div className="rounded-2xl bg-gray-100 shadow-inner overflow-hidden">
        {/* Image touches the top/left/right edges */}
  <img
  src={img2181}
  alt="Student Application Process"
  className="w-full h-90 object-cover"
  />

        {/* Card important dates */}
        <div className="p-6 middle space-y-14">
          <Card className="bg-white rounded-2xl shadow border border-gray-100 scale-105 mt-4">
          <CardContent className="p-6">
            <h4 className="text-xl font-semibold mb-4 flex items-center text-gray-900">
            <Calendar className="w-5 h-5 text-blue-600 mr-2" />
                Dates Importantes
                </h4>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-800 text-lg">Date limite de dépôts de dossiers</span>
                <Badge variant="outline" className="px-3 py-1 rounded-full bg-gray-100">
                    31 Juillet
                </Badge>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-800 text-lg">Notifications de décision</span>
              <Badge variant="outline" className="px-3 py-1 rounded-full bg-gray-100">
                15 Août
              </Badge>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-800 text-lg">Date limite d'inscription</span>
              <Badge variant="outline" className="px-3 py-1 rounded-full bg-gray-100">
              26 Septembre
              </Badge>
            </div>
          </div>
          </CardContent>
          </Card>

          {/* Card Downloadable Documents */}
          <Card className  = "bg-white rounded-2xl shadow border border-gray-100 scale-105">
            <CardContent className = "p-6">
              <h4 className="text-xl font-semibold mb-4 flex items-center text-gray-900">
                <Download className="w-5 h-5 text-blue-600 mr-2" />
                Documents à Télécharger
              </h4>
              <div className = "flex flex-col gap-4">
                <Button
                  size = "lg"
                  className = "w-full bg-blue-600 text-white hovr:bg-blue-700"
                  asChild
                >
                  <a href="/fiche_d'inscription_générale.pdf" target = "_blank" rel="noopener noreferrer">
                  <FileText className="w-4 h-4 mr-2" />
                    Fiche d'inscription générale (PDF)
                  </a>
                </Button>

                <Button
                  size = "lg"
                  className = "w-full bg-blue-600 text-white hover:bg-blue-700"
                  asChild
                >
                  <a href="/fiche_d'inscription_formation_qualifiante.pdf" target = "_blank" rel="noopener noreferrer">
                  <FileText className="w-4 h-4 mr-2" />
                    Fiche d'inscription formation qualifiante (PDF)
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
    </Tabs>
        </div>
      </section>

      {/* Application Process */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl mb-6">Procédure d'Inscription</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Explorez notre procédure, conçue pour vous donner les clés de la réussite. Investissez dans une éducation de qualité et ouvrez-vous les portes d'un avenir brillant !
            </p>
          </div>

          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-blue-200 hidden lg:block"></div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {enrollmentProcess.map((step, index) => (
                <div key={index} className={`relative ${index % 2 === 0 ? "lg:pr-8" : "lg:pl-8 lg:justify-self-end"}`}>
                  <Card className="hover:shadow-2xl transition-all duration-300 border border-gray-100 rounded-2xl overflow-hidden group">
                    <CardContent className="p-8">
                      <div className="flex items-start mb-6">
                        <div
                          className={`w-16 h-16 rounded-full flex items-center justify-center mr-4 group-hover:scale-110 transition-transform ${step.color}`}
                        >
                          <step.icon className="w-8 h-8" />
                        </div>
                        <div>
                          <Badge variant="secondary" className="mb-2">
                            Étape {step.Étape}
                          </Badge>
                          <h3 className="text-xl mb-2">{step.title}</h3>
                          <Badge variant="outline" className="text-xs">
                            {step.timeline}
                          </Badge>
                        </div>
                      </div>
                      <p className="text-gray-600 leading-relaxed">{step.description}</p>
                    </CardContent>
                  </Card>

                  <div className="absolute top-1/2 right-0 w-4 h-4 bg-blue-600 rounded-full border-4 border-white shadow-lg transform -translate-y-1/2 translate-x-1/2 hidden lg:block"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Tuition & Financial Aid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl mb-6">Frais de Scolarité & Modalités de Paiement</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Investissez dans votre avenir avec des tarifs transparents et des modalités de paiement abordables.
            </p>
          </div>

          {/* Tuition Structure Table - Using Card Layout */}
          <div className="mb-16">
            <Card className="border-0 shadow-xl rounded-2xl overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100 p-8">
                <CardTitle className="text-2xl text-center flex items-center justify-center">
                  <GraduationCap className="w-8 h-8 text-blue-600 mr-3" />
                  INSCRIPTIONS ET REINSCRIPTION – RENTREE SCOLAIRE 2025 - 2026
                </CardTitle>
                <p className="text-center text-gray-600 mt-2">Détails complets de tous les coûts éducatifs</p>
              </CardHeader>
              <CardContent className="p-8">
                {/* Table Header */}
                <div className="overflow-x-auto no-scrollbar">
                <div className="min-w-[720px] grid grid-cols-6 gap-4 p-4 bg-gray-50 rounded-lg mb-4">
                  <div className="text-left font-medium">Statuts</div>
                  <div className="text-center font-medium">Frais d'inscription</div>
                  <div className="text-center font-medium">Frais annexes</div>
                  <div className="text-center font-medium">Scolarité</div>
                  <div className="text-center font-medium">Services école</div>
                  <div className="text-center font-medium">Total annuel</div>
                </div>
                
                {/* Table Rows */}
                <div className="space-y-4">
                  {tuitionStructure.map((level, index) => (
                    <div key={index} className="min-w-[720px] grid grid-cols-6 gap-4 p-4 hover:bg-blue-50/50 transition-colors rounded-lg border border-gray-100">
                      <div className="text-left">
                        <h4 className="text-lg">{level.level}</h4>
                        <p className="text-blue-600 text-sm">{level.grades}</p>
                        <p className="text-gray-500 text-xs mt-1">{level.description}</p>
                      </div>
                      <div className="text-center">
                        <span className="text-lg">{level.registrationFees.toLocaleString()} CFA</span>
                      </div>
                      <div className="text-center">
                        <span className="text-lg">{level.additionalFees.toLocaleString()} CFA</span>
                      </div>
                      <div className="text-center">
                        <span className="text-lg">{level.tuition.toLocaleString()} CFA</span>
                      </div>
                      <div className="text-center">
                        <span className="text-lg">{level.services.toLocaleString()} CFA</span>
                      </div>
                      <div className="text-center">
                        <div className="bg-blue-100 rounded-lg py-2 px-3">
                          <span className="text-xl text-blue-900">{level.total.toLocaleString()} CFA</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                </div>
                <p className="text-center text-gray-600 mt-2">NB: Toute scolarité entamée est entièrement due et ne peut être remboursée.</p>
                <p className="text-center text-gray-600 mt-2">Frais Annexes précédent toute Inscription.</p>
              </CardContent>
            </Card>
            
            {/* Additional Notes */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="border-l-4 border-blue-600 bg-blue-50/30">
                <CardContent className="p-6">
                  <h4 className="text-lg mb-3 flex items-center">
                    <CheckCircle className="w-5 h-5 text-blue-600 mr-2" />
                    Services et Commodités
                  </h4>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li>• Restauration : Découvrez un menu varié et équilibré, proposé à des prix étudiants (Petit déjeuner : 500fcfa, déjeuner : 1.000fcfa, diner : 1.000fcfa).</li>
                    <li>• Hébergement (Internat, 20.000 FCFA par mois, payable chaque trimestre) : Des chambres confortables et sécurisées, avec un encadrement éducatif et des activités de loisirs.</li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card className="border-l-4 border-green-600 bg-green-50/30">
                <CardContent className="p-6">
                  <h4 className="text-lg mb-3 flex items-center">
                    <CreditCard className="w-5 h-5 text-green-600 mr-2" />
                    Méthode de Paiement
                  </h4>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li>• Mobile money (ex: Orange Money, Moov Money, Wave)</li>
                    <li>• Virement bancaire</li>
                    <li>• Pas de paiement en espèces</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Payment Schedule Tables */}
          <div className="space-y-12">
            {/* Table 1: Échéancier de Paiement – Affectés & Non Affectés */}
            <Card className="border-0 shadow-xl rounded-2xl overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100 p-8">
                <CardTitle className="text-2xl text-center flex items-center justify-center">
                  <CreditCard className="w-8 h-8 text-blue-600 mr-3" />
                  Échéancier de Paiement – Affectés & Non Affectés
                </CardTitle>
                <p className="text-center text-gray-600 mt-2">Calendrier des versements pour l'année académique 2025-2026</p>
              </CardHeader>
              <CardContent className="p-8">
                {/* Table Header */}
                <div className="overflow-x-auto no-scrollbar">
                <div className="min-w-[860px] grid grid-cols-7 gap-4 p-4 bg-gray-50 rounded-lg mb-4">
                  <div className="text-left font-medium">Catégorie</div>
                  <div className="text-center font-medium">A l'inscription</div>
                  <div className="text-center font-medium">05 Nov.</div>
                  <div className="text-center font-medium">05 Déc.</div>
                  <div className="text-center font-medium">05 Janv.</div>
                  <div className="text-center font-medium">05 Fév.</div>
                  <div className="text-center font-medium">TOTAL</div>
                </div>
                
                {/* Table Rows */}
                <div className="space-y-4">
                  {/* Affectés Section */}
                  <div className="bg-blue-50/30 rounded-lg p-4">
                    <h4 className="text-lg mb-4 text-blue-900">Affectés</h4>
                    <div className="space-y-3">
                      <div className="min-w-[860px] grid grid-cols-7 gap-4 p-3 hover:bg-blue-50/50 transition-colors rounded-lg border border-gray-100">
                        <div className="text-left">
                          <span className="text-base">1ère Année</span>
                        </div>
                        <div className="text-center">75,100 CFA</div>
                        <div className="text-center">10,000 CFA</div>
                        <div className="text-center text-gray-400">-</div>
                        <div className="text-center text-gray-400">-</div>
                        <div className="text-center text-gray-400">-</div>
                        <div className="text-center">
                          <div className="bg-blue-100 rounded-lg py-2 px-3">
                            <span className="text-blue-900">85,100 CFA</span>
                          </div>
                        </div>
                      </div>
                      <div className="min-w-[860px] grid grid-cols-7 gap-4 p-3 hover:bg-blue-50/50 transition-colors rounded-lg border border-gray-100">
                        <div className="text-left">
                          <span className="text-base">2e et 3e Année</span>
                        </div>
                        <div className="text-center">75,100 CFA</div>
                        <div className="text-center">10,000 CFA</div>
                        <div className="text-center text-gray-400">-</div>
                        <div className="text-center text-gray-400">-</div>
                        <div className="text-center text-gray-400">-</div>
                        <div className="text-center">
                          <div className="bg-blue-100 rounded-lg py-2 px-3">
                            <span className="text-blue-900">85,100 CFA</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Non Affectés Section */}
                  <div className="bg-green-50/30 rounded-lg p-4">
                    <h4 className="text-lg mb-4 text-green-900">Non Affectés</h4>
                    <div className="space-y-3">
                      <div className="min-w-[860px] grid grid-cols-7 gap-4 p-3 hover:bg-green-50/50 transition-colors rounded-lg border border-gray-100">
                        <div className="text-left">
                          <span className="text-base">1ère Année</span>
                        </div>
                        <div className="text-center">150,100 CFA</div>
                        <div className="text-center">35,000 CFA</div>
                        <div className="text-center">20,000 CFA</div>
                        <div className="text-center">10,000 CFA</div>
                        <div className="text-center text-gray-400">-</div>
                        <div className="text-center">
                          <div className="bg-green-100 rounded-lg py-2 px-3">
                            <span className="text-green-900">215,100 CFA</span>
                          </div>
                        </div>
                      </div>
                      <div className="min-w-[860px] grid grid-cols-7 gap-4 p-3 hover:bg-green-50/50 transition-colors rounded-lg border border-gray-100">
                        <div className="text-left">
                          <span className="text-base">2e Année</span>
                        </div>
                        <div className="text-center">150,100 CFA</div>
                        <div className="text-center">45,000 CFA</div>
                        <div className="text-center">30,000 CFA</div>
                        <div className="text-center">15,000 CFA</div>
                        <div className="text-center text-gray-400">-</div>
                        <div className="text-center">
                          <div className="bg-green-100 rounded-lg py-2 px-3">
                            <span className="text-green-900">240,100 CFA</span>
                          </div>
                        </div>
                      </div>
                      <div className="min-w-[860px] grid grid-cols-7 gap-4 p-3 hover:bg-green-50/50 transition-colors rounded-lg border border-gray-100">
                        <div className="text-left">
                          <span className="text-base">3e Année</span>
                        </div>
                        <div className="text-center">155,100 CFA</div>
                        <div className="text-center">45,000 CFA</div>
                        <div className="text-center">35,000 CFA</div>
                        <div className="text-center">10,000 CFA</div>
                        <div className="text-center text-gray-400">-</div>
                        <div className="text-center">
                          <div className="bg-green-100 rounded-lg py-2 px-3">
                            <span className="text-green-900">245,100 CFA</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                </div>
              </CardContent>
            </Card>

            {/* Table 2: Échéancier de Paiement – Formation Qualifiante */}
            <Card className="border-0 shadow-xl rounded-2xl overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-purple-50 to-purple-100 p-8">
                <CardTitle className="text-2xl text-center flex items-center justify-center">
                  <GraduationCap className="w-8 h-8 text-purple-600 mr-3" />
                  Échéancier de Paiement – Formation Qualifiante
                </CardTitle>
                <p className="text-center text-gray-600 mt-2">Calendrier des versements pour les formations spécialisées</p>
              </CardHeader>
              <CardContent className="p-8">
                {/* Table Header */}
                <div className="overflow-x-auto no-scrollbar">
                <div className="min-w-[600px] grid grid-cols-5 gap-4 p-4 bg-gray-50 rounded-lg mb-4">
                  <div className="text-center font-medium">A l'inscription</div>
                  <div className="text-center font-medium">1ère versement</div>
                  <div className="text-center font-medium">2ème versement</div>
                  <div className="text-center font-medium">3ème versement</div>
                  <div className="text-center font-medium">TOTAL</div>
                </div>
                
                {/* Table Rows */}
                <div className="space-y-4">
                  <div className="min-w-[600px] grid grid-cols-5 gap-4 p-4 hover:bg-purple-50/50 transition-colors rounded-lg border border-gray-100">
                    <div className="text-center">85,000 CFA</div>
                    <div className="text-center">88,000 CFA</div>
                    <div className="text-center">77,000 CFA</div>
                    <div className="text-center">20,000 CFA</div>
                    <div className="text-center">
                      <div className="bg-purple-100 rounded-lg py-2 px-3">
                        <span className="text-purple-900">270,000 CFA</span>
                      </div>
                    </div>
                  </div>
                </div>
                </div>
              </CardContent>
            </Card>
              <CardContent className="p-4">
                <p className="text-center text-gray-600 mt-2">NB: Pour les étudiants internationaux, veuillez contacter le secrétariat de l'établissement.</p>
                <p className="text-center text-gray-600">Les frais d’inscription et le 1er versement sont obligatoires à l’inscription.</p>
              </CardContent>
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl mb-6">Visitez Kalogo Formation Professionnelle</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Découvrez notre communauté de première main grâce aux visites de campus et aux séances d'information.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Events */}
            <div>
              <h3 className="text-2xl mb-8">Événements à Venir</h3>
              <div className="space-y-6">
                {upcomingEvents.map((event, index) => (
                  <Card key={index} className="hover:shadow-lg transition-all duration-300 border-l-4 border-blue-600">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="text-lg mb-2">{event.title}</h4>
                          <div className="flex items-center text-blue-600 mb-2">
                            <Calendar className="w-4 h-4 mr-2" />
                            <span className="text-sm">{event.date}</span>
                            <Clock className="w-4 h-4 ml-4 mr-2" />
                            <span className="text-sm">{event.time}</span>
                          </div>
                          <p className="text-gray-600 text-sm">{event.description}</p>
                        </div>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => openRegistrationForm(event.title)}
                        >
                          S'inscrire
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Application & Contact */}
            <div className="space-y-8">
              {/* Quick Apply */}
              <Card className="border-0 shadow-xl bg-gradient-to-br from-blue-600 to-blue-800 text-white">
                <CardContent className="p-8">
                  <div className="flex items-center mb-4">
                    <Sparkles className="w-8 h-8 mr-3" />
                    <h3 className="text-2xl">Commencez votre inscription</h3>
                  </div>
                  <p className="text-blue-100 mb-6">
                    Prêt à commencer votre parcours à Kalogo Formation Professionnelle? Notre application en ligne facilite le processus.
                  </p>
                  <div className="space-y-4">
                    <Button 
                      size="lg" 
                      className="w-full bg-white text-blue-900 hover:bg-gray-100"
                      onClick={openApplicationForm}
                    >
                      <FileText className="w-4 h-4 mr-2" />
                      Remplir la demande en ligne
                    </Button>
                    <Button 
                      size="lg" 
                      variant="outline" 
                      className="w-full border-white text-white hover:bg-white hover:text-blue-900"
                      onClick={generateWordDoc}
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Télécharger la fiche de demande
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Contact Information */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-2xl">Bureau des Admissions</CardTitle>
                  <p className="text-gray-600">Nous sommes là pour vous aider tout au long du processus</p>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-start">
                    <Phone className="w-5 h-5 text-blue-600 mr-3 mt-1" />
                    <div>
                      <p>Ligne directe</p>
                      <p className="text-blue-600">(+225) 27 34 75 16 90</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Mail className="w-5 h-5 text-blue-600 mr-3 mt-1" />
                    <div>
                      <p>Email</p>
                      <p className="text-blue-600">kalogoformationprofessionnelle@gmail.com</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <MapPin className="w-5 h-5 text-blue-600 mr-3 mt-1" />
                    <div>
                      <p>Localisation du Bureau</p>
                      <p className="text-gray-600">Centre des Admissions, Premier Étage</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Clock className="w-5 h-5 text-blue-600 mr-3 mt-1" />
                    <div>
                      <p>Heures d'Ouverture</p>
                      <p className="text-gray-600">Lundi-Vendredi: 8:00 AM - 5:00 PM</p>
                      <p className="text-gray-600">Samedi: 9:00 AM - 1:00 PM</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-800">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl text-white mb-6">Prêt à commencer votre parcours?</h2>
          <p className="text-xl text-blue-100 mb-8 leading-relaxed">
            Rejoignez notre communauté d'apprenants, d'innovateurs et de futurs leaders. Votre expérience à Kalogo Formation Professionnelle commence ici.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-white text-blue-900 hover:bg-gray-100 px-8 py-3"
              onClick={() => {
                // Open the same application dialog as the top CTA, without scrolling
                openApplicationForm();
              }}
            >
              Postuler Maintenant
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-blue-900 px-8 py-3"
              onClick={() => {
                try {
                  const url = new URL(window.location.href);
                  url.searchParams.set('intent', 'visit');
                  window.history.replaceState({}, '', url.toString());
                } catch {}
                onPageChange?.('contact');
              }}
            >
              Planifier une Visite du Campus
            </Button>
          </div>
        </div>
      </section>

      {/* Event Registration Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="w-[calc(100vw-2rem)] sm:w-auto sm:max-w-lg max-h-[90vh] overflow-hidden rounded-2xl p-0">
          <div className="p-6 sm:p-8 max-h-[80vh] overflow-y-auto overscroll-contain">
          <DialogHeader>
            <DialogTitle className="text-xl mb-2">Inscription à l'Événement</DialogTitle>
            <DialogDescription className="text-gray-600">
              Inscrivez-vous pour: <span className="text-blue-600">{selectedEvent}</span>
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleFormSubmit} className="mt-6 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">Prénom *</Label>
                <Input
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange('firstName', e.target.value)}
                  required
                  placeholder="Entrer le prénom"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Nom de Famille *</Label>
                <Input
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange('lastName', e.target.value)}
                  required
                  placeholder="Entrer le nom de famille"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                required
                placeholder="votre.email@exemple.com"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Numéro de Téléphone *</Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                required
                placeholder="+225 07 07 07 07 07"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="studentName">Nom de l'Étudiant *</Label>
              <Input
                id="studentName"
                value={formData.studentName}
                onChange={(e) => handleInputChange('studentName', e.target.value)}
                placeholder="Nom complet de l'étudiant"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="gradeLevel">Niveau Scolaire Actuel/Prévu</Label>
              <Select onValueChange={(value) => handleInputChange('gradeLevel', value)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Sélectionner le niveau scolaire" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="4eme">4ème</SelectItem>
                  <SelectItem value="3eme">3ème</SelectItem>
                  <SelectItem value="2nde">2nde</SelectItem>
                  <SelectItem value="1ere">1ère</SelectItem>
                  <SelectItem value="terminale">Terminale</SelectItem>
                  <SelectItem value="Cert-Génie Logiciel">Cert-Génie Logiciel</SelectItem>
                  <SelectItem value="Cert-Science et Analyse de données">Cert-Science et Analyse de données</SelectItem>
                  <SelectItem value="BT-SMS">BT-SMS</SelectItem>
                  <SelectItem value="BT-Electricité">BT Électricité</SelectItem>
                  <SelectItem value="Formation Qualifiantes">Formation Qualifiantes</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg space-y-4">
              <h4 className="text-md font-semibold text-gray-900 mt-6 mb-2">
                Personne à Contacter en Cas d'Urgence
              </h4>

              <div className="space-y-2">
                <Label htmlFor="emergencyContactName">Nom du contact *</Label>
                <Input
                  id="emergencyContactName"
                  value={formData.emergencyContactName}
                  onChange={(e) => handleInputChange('emergencyContactName', e.target.value)}
                  required
                  placeholder="Nom complet du contact"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="emergencyContactRelation">Lien de parenté *</Label>
                <Input
                  id="emergencyContactRelation"
                  value={formData.emergencyContactRelation}
                  onChange={(e) => handleInputChange('emergencyContactRelation', e.target.value)}
                  required
                  placeholder="Ex: Père, Mère, Tuteur..."
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="emergencyContactPhone">Téléphone du contact *</Label>
                <Input
                  id="emergencyContactPhone"
                  type="tel"
                  value={formData.emergencyContactPhone}
                  onChange={(e) => handleInputChange('emergencyContactPhone', e.target.value)}
                  required
                  placeholder="(555) 987-6543"
                  />
              </div>
            </div>


            <div className="space-y-2">
              <Label htmlFor="message">Autres Questions ou Commentaires</Label>
              <Textarea
                id="message"
                value={formData.message}
                onChange={(e) => handleInputChange('message', e.target.value)}
                placeholder="Veuillez partager toute question spécifique concernant l'événement ou nos programmes..."
                rows={3}
              />
            </div>

            <div className="flex gap-3 pt-4">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => setIsDialogOpen(false)}
                className="flex-1"
              >
                Annuler
              </Button>
              <Button 
                type="submit" 
                className="flex-1 bg-blue-600 hover:bg-blue-700"
              >
                Soumettre l'Inscription
              </Button>
            </div>
          </form>
          </div>
        </DialogContent>
      </Dialog>

      {/* Application Form Dialog */}
      <Dialog open={isApplicationDialogOpen} onOpenChange={setIsApplicationDialogOpen}>
        <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl mb-2">FICHE D'INSCRIPTION – KALOGO FORMATION PROFESSIONNELLE (KFP)</DialogTitle>
            <DialogDescription className="text-gray-600">
              Veuillez remplir tous les champs requis pour votre inscription
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleApplicationSubmit} className="space-y-8">
            {/* 1. Informations Personnelles */}
            <div className="space-y-4">
              <h3 className="text-lg text-blue-900 border-b border-blue-200 pb-2">1. Informations Personnelles</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="nom">Nom *</Label>
                  <Input
                    id="nom"
                    value={applicationData.nom}
                    onChange={(e) => handleApplicationInputChange('nom', e.target.value)}
                    required
                    placeholder="Nom de famille"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="prenoms">Prénom(s) *</Label>
                  <Input
                    id="prenoms"
                    value={applicationData.prenoms}
                    onChange={(e) => handleApplicationInputChange('prenoms', e.target.value)}
                    required
                    placeholder="Prénom(s)"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dateNaissance">Date de Naissance *</Label>
                  <Input
                    id="dateNaissance"
                    type="date"
                    value={applicationData.dateNaissance}
                    onChange={(e) => handleApplicationInputChange('dateNaissance', e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lieuNaissance">Lieu de Naissance *</Label>
                  <Input
                    id="lieuNaissance"
                    value={applicationData.lieuNaissance}
                    onChange={(e) => handleApplicationInputChange('lieuNaissance', e.target.value)}
                    required
                    placeholder="Ville de naissance"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="nationalite">Nationalité *</Label>
                  <Input
                    id="nationalite"
                    value={applicationData.nationalite}
                    onChange={(e) => handleApplicationInputChange('nationalite', e.target.value)}
                    required
                    placeholder="Nationalité"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="ville">Ville *</Label>
                  <Input
                    id="ville"
                    value={applicationData.ville}
                    onChange={(e) => handleApplicationInputChange('ville', e.target.value)}
                    required
                    placeholder="Ville de résidence"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="adresse">Adresse (précisez le quartier où habite l'élève) *</Label>
                <Textarea
                  id="adresse"
                  value={applicationData.adresse}
                  onChange={(e) => handleApplicationInputChange('adresse', e.target.value)}
                  required
                  placeholder="Adresse complète avec quartier"
                  rows={2}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="telephone">Téléphone *</Label>
                  <Input
                    id="telephone"
                    type="tel"
                    value={applicationData.telephone}
                    onChange={(e) => handleApplicationInputChange('telephone', e.target.value)}
                    required
                    placeholder="Numéro de téléphone"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={applicationData.email}
                    onChange={(e) => handleApplicationInputChange('email', e.target.value)}
                    required
                    placeholder="Adresse email"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="numeroId">Numéro CNI/Passeport/Carte d'Élève/Carte de Séjour *</Label>
                <Input
                  id="numeroId"
                  value={applicationData.numeroId}
                  onChange={(e) => handleApplicationInputChange('numeroId', e.target.value)}
                  required
                  placeholder="Numéro d'identification"
                />
              </div>
            </div>

            {/* 2. Informations Académiques */}
            <div className="space-y-4">
              <h3 className="text-lg text-blue-900 border-b border-blue-200 pb-2">2. Informations Académiques</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="dernierDiplome">Dernier Diplôme Obtenu *</Label>
                  <Input
                    id="dernierDiplome"
                    value={applicationData.dernierDiplome}
                    onChange={(e) => handleApplicationInputChange('dernierDiplome', e.target.value)}
                    required
                    placeholder="Ex: Baccalauréat, BEPC..."
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="etablissementOrigine">Établissement d'Origine *</Label>
                  <Input
                    id="etablissementOrigine"
                    value={applicationData.etablissementOrigine}
                    onChange={(e) => handleApplicationInputChange('etablissementOrigine', e.target.value)}
                    required
                    placeholder="Nom de l'établissement précédent"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="niveauScolaire">Niveau scolaire *</Label>
                  <Select onValueChange={(value) => handleApplicationInputChange('niveauScolaire', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionnez votre niveau" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="6eme">6ème</SelectItem>
                      <SelectItem value="5eme">5ème</SelectItem>
                      <SelectItem value="4eme">4ème</SelectItem>
                      <SelectItem value="3eme">3ème</SelectItem>
                      <SelectItem value="2nde">2nde</SelectItem>
                      <SelectItem value="1ere">1ère</SelectItem>
                      <SelectItem value="terminale">Terminale</SelectItem>
                      <SelectItem value="Bac +">Bac +</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="numeroMatricule">Numéro Matricule</Label>
                  <Input
                    id="numeroMatricule"
                    value={applicationData.numeroMatricule}
                    onChange={(e) => handleApplicationInputChange('numeroMatricule', e.target.value)}
                    placeholder="Numéro matricule (si applicable)"
                  />
                </div>
              </div>
            </div>

            {/* 3. Formation Choisie */}
            <div className="space-y-4">
              <h3 className="text-lg text-blue-900 border-b border-blue-200 pb-2">3. Formation Choisie</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="intituleFormation">Intitulé de la Formation *</Label>
                  <Select onValueChange={(value) => handleApplicationInputChange('intituleFormation', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choisissez votre formation" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="electricite">Électricité</SelectItem>
                      <SelectItem value="sciences-medico-sociales">Sciences Médico-sociales</SelectItem>
                      <SelectItem value="informatique">Informatique</SelectItem>
                      <SelectItem value="gestion">Gestion</SelectItem>
                      <SelectItem value="autre">Autre</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dureeFormation">Durée de la Formation *</Label>
                  <Select onValueChange={(value) => handleApplicationInputChange('dureeFormation', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Durée de formation" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1-an">1 an</SelectItem>
                      <SelectItem value="2-ans">2 ans</SelectItem>
                      <SelectItem value="3-ans">3 ans</SelectItem>
                      <SelectItem value="4-ans">4 ans</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="niveauRequis">Niveau Requis ou connaissance antérieure</Label>
                <Textarea
                  id="niveauRequis"
                  value={applicationData.niveauRequis}
                  onChange={(e) => handleApplicationInputChange('niveauRequis', e.target.value)}
                  placeholder="Décrivez vos connaissances préalables..."
                  rows={2}
                />
              </div>
            </div>

            {/* 4. Situation Professionnelle */}
            <div className="space-y-4">
              <h3 className="text-lg text-blue-900 border-b border-blue-200 pb-2">4. Situation Professionnelle</h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Actuellement en Emploi *</Label>
                  <Select onValueChange={(value) => handleApplicationInputChange('emploi', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Êtes-vous actuellement employé?" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="oui">Oui</SelectItem>
                      <SelectItem value="non">Non</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                {applicationData.emploi === 'oui' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="nomEntreprise">Nom de l'entreprise</Label>
                      <Input
                        id="nomEntreprise"
                        value={applicationData.nomEntreprise}
                        onChange={(e) => handleApplicationInputChange('nomEntreprise', e.target.value)}
                        placeholder="Nom de votre entreprise"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="posteOccupe">Poste Occupé</Label>
                      <Input
                        id="posteOccupe"
                        value={applicationData.posteOccupe}
                        onChange={(e) => handleApplicationInputChange('posteOccupe', e.target.value)}
                        placeholder="Votre poste actuel"
                      />
                    </div>
                  </div>
                )}
                <div className="space-y-2">
                  <Label htmlFor="experiencePro">Expérience Professionnelle (en années)</Label>
                  <Input
                    id="experiencePro"
                    type="number"
                    min="0"
                    value={applicationData.experiencePro}
                    onChange={(e) => handleApplicationInputChange('experiencePro', e.target.value)}
                    placeholder="Nombre d'années d'expérience"
                  />
                </div>
              </div>
            </div>

            {/* 5. Personne à Contacter en Cas d'Urgence */}
            <div className="space-y-4">
              <h3 className="text-lg text-blue-900 border-b border-blue-200 pb-2">5. Personne à Contacter en Cas d'Urgence</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="nomContact">Nom *</Label>
                  <Input
                    id="nomContact"
                    value={applicationData.nomContact}
                    onChange={(e) => handleApplicationInputChange('nomContact', e.target.value)}
                    required
                    placeholder="Nom du contact d'urgence"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lienParente">Lien de Parenté *</Label>
                  <Input
                    id="lienParente"
                    value={applicationData.lienParente}
                    onChange={(e) => handleApplicationInputChange('lienParente', e.target.value)}
                    required
                    placeholder="Ex: Père, Mère, Tuteur..."
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="telephoneContact">Téléphone *</Label>
                  <Input
                    id="telephoneContact"
                    type="tel"
                    value={applicationData.telephoneContact}
                    onChange={(e) => handleApplicationInputChange('telephoneContact', e.target.value)}
                    required
                    placeholder="Téléphone du contact"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="adresseContact">Adresse (précisez le lieu où habite la personne à contacter) *</Label>
                <Textarea
                  id="adresseContact"
                  value={applicationData.adresseContact}
                  onChange={(e) => handleApplicationInputChange('adresseContact', e.target.value)}
                  required
                  placeholder="Adresse complète du contact d'urgence"
                  rows={2}
                />
              </div>
            </div>

            {/* 6. Documents à Joindre */}
            <div className="space-y-4">
              <h3 className="text-lg text-blue-900 border-b border-blue-200 pb-2">6. Documents à Joindre au Dossier d'Inscription</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {[
                  { key: 'ficheInscription', label: '1 Fiche d\'inscription (à retirer au secrétariat de l\'établissement)' },
                  { key: 'extraitActeNaissance', label: '1 Extrait d\'acte de naissance original et lisible' },
                  { key: 'numeroMatricule', label: 'Le numéro matricule' },
                  { key: 'certificatScolarite', label: '1 Certificat de scolarité (de la 6e à la 3e) + le relevé de notes à l\'examen du BEPC' },
                  { key: 'releveNotesBT', label: 'Le relevé de notes au BT' },
                  { key: 'livretScolaire', label: 'Livret scolaires' },
                  { key: 'photocopieCNI', label: 'Photocopie de la Carte d\'Identité' },
                  { key: 'photocopieDiplome', label: 'Photocopie du Dernier Diplôme Obtenu' },
                  { key: 'photosIdentite', label: 'Photos d\'Identité (x2)' },
                  { key: 'lettreMotivation', label: 'Lettre de Motivation' },
                  { key: 'cv', label: 'CV (si applicable)' },
                  { key: 'photocopieCMU', label: 'Photocopie de la carte CMU (x2)' },
                  { key: 'carnetVaccination', label: 'Carnet de vaccination (BCG contre la Tuberculose, Méningite et Fièvre typhoïde) (x1)' },
                  { key: 'chemiseCartonnee', label: 'Chemise cartonné (Électricité : Bleue, Sciences Médico-sociales : Vert)' }
                ].map((doc) => (
                  <div key={doc.key} className="flex items-start space-x-2">
                    <input
                      type="checkbox"
                      id={doc.key}
                      checked={applicationData.documents[doc.key as keyof typeof applicationData.documents]}
                      onChange={(e) => handleApplicationInputChange(`documents.${doc.key}`, e.target.checked)}
                      className="mt-1"
                    />
                    <Label htmlFor={doc.key} className="text-sm leading-tight">{doc.label}</Label>
                  </div>
                ))}
              </div>
            </div>

            {/* Declaration */}
            <div className="space-y-4">
              <h3 className="text-lg text-blue-900 border-b border-blue-200 pb-2">7. Déclaration et Signature</h3>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-700">
                  Je soussigné(e) <strong>{applicationData.nom} {applicationData.prenoms}</strong>, déclare sur l'honneur que les informations fournies 
                  dans cette fiche d'inscription sont exactes et complètes. J'accepte les conditions 
                  d'admission et m'engage à respecter le règlement intérieur de l'établissement.
                </p>

                <div className="space-y-2 mt-4">
                  <Label htmlFor="fullNameDeclaration">Nom complet de l'étudiant (à écrire en toutes lettres):</Label>
                  <Input
                    id="fullNameDeclaration"
                    value={applicationData.fullNameDeclaration}
                    onChange={(e) => handleApplicationInputChange("fullNameDeclaration", e.target.value)}
                    placeholder="Nom complet"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="dateDeclaration">Date:</Label>
                  <Input
                    id="dateDeclaration"
                    type="date"
                    value={applicationData.dateDeclaration}
                    onChange={(e) => handleApplicationInputChange("dateDeclaration", e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => setIsApplicationDialogOpen(false)}
                className="flex-1"
              >
                Annuler
              </Button>
              <Button 
                type="submit" 
                className="flex-1 bg-blue-600 hover:bg-blue-700"
              >
                Soumettre la Candidature
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
