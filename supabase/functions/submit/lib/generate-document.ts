// utils/docGenerator.ts
import { Document, Packer, Paragraph } from "npm:docx";

export async function generateDocument(
  type: "registration" | "application",
  data: any
) {
  let doc: Document;

  if (type === "registration") {
    // Event Registration Word Doc
    doc = new Document({
      sections: [
        {
          properties: {},
          children: [
            new Paragraph({ text: "FICHE D’INSCRIPTION À UN ÉVÉNEMENT", heading: "Heading1" }),

            new Paragraph({ text: "1. Informations sur l’Événement", heading: "Heading2" }),
            new Paragraph({ text: `Événement: ${data.selectedEvent || "-"}` }),

            new Paragraph({ text: "2. Informations Personnelles", heading: "Heading2" }),
            new Paragraph({ text: `Prénom: ${data.firstName || "-"}` }),
            new Paragraph({ text: `Nom: ${data.lastName || "-"}` }),
            new Paragraph({ text: `Email: ${data.email || "-"}` }),
            new Paragraph({ text: `Téléphone: ${data.phone || "-"}` }),
            new Paragraph({ text: `Nom de l’élève: ${data.studentName || "-"}` }),
            new Paragraph({ text: `Niveau scolaire: ${data.gradeLevel || "-"}` }),

            new Paragraph({ text: "3. Message Supplémentaire", heading: "Heading2" }),
            new Paragraph({ text: data.message || "Aucun message fourni" }),

            new Paragraph({ text: "4. Personne à Contacter en Cas d’Urgence", heading: "Heading2" }),
            new Paragraph({ text: `Nom: ${data.emergencyContactName || "-"}` }),
            new Paragraph({ text: `Lien de parenté: ${data.emergencyContactRelation || "-"}` }),
            new Paragraph({ text: `Téléphone: ${data.emergencyContactPhone || "-"}` }),
          ],
        },
      ],
    });
  } else {
    // Application Word Doc
    const documentLabels: Record<string, string> = {
      ficheInscription: "1 Fiche d’inscription (à retirer au secrétariat de l’établissement)",
      extraitActeNaissance: "1 Extrait d’acte de naissance original et lisible",
      numeroMatricule: "Le numéro matricule",
      certificatScolarite: "1 Certificat de scolarité (6e à 3e) + relevé de notes BEPC",
      releveNotesBT: "Le relevé de notes au BT",
      livretScolaire: "Livret scolaire",
      photocopieCNI: "Photocopie de la Carte d’Identité",
      photocopieDiplome: "Photocopie du Dernier Diplôme Obtenu",
      photosIdentite: "Photos d’Identité (x2)",
      lettreMotivation: "Lettre de Motivation",
      cv: "CV (si applicable)",
      photocopieCMU: "Photocopie de la carte CMU (x2)",
      carnetVaccination: "Carnet de vaccination (BCG, Méningite, Typhoïde)",
      chemiseCartonnee: "Chemise cartonnée (Électricité: bleue, SMS: vert)",
    };

    doc = new Document({
      sections: [
        {
          properties: {},
          children: [
            new Paragraph({ text: "FICHE DE CANDIDATURE – AE (Academic Excellence)", heading: "Heading1" }),

            new Paragraph({ text: "1. Informations Personnelles", heading: "Heading2" }),
            new Paragraph({ text: `Nom: ${data.nom || "-"}` }),
            new Paragraph({ text: `Prénoms: ${data.prenoms || "-"}` }),
            new Paragraph({ text: `Date de Naissance: ${data.dateNaissance || "-"}` }),
            new Paragraph({ text: `Lieu de Naissance: ${data.lieuNaissance || "-"}` }),
            new Paragraph({ text: `Nationalité: ${data.nationalite || "-"}` }),
            new Paragraph({ text: `Adresse: ${data.adresse || "-"}` }),
            new Paragraph({ text: `Ville: ${data.ville || "-"}` }),
            new Paragraph({ text: `Téléphone: ${data.telephone || "-"}` }),
            new Paragraph({ text: `Email: ${data.email || "-"}` }),
            new Paragraph({ text: `Numéro d’Identification: ${data.numeroId || "-"}` }),

            new Paragraph({ text: "2. Informations Académiques", heading: "Heading2" }),
            new Paragraph({ text: `Dernier Diplôme: ${data.dernierDiplome || "-"}` }),
            new Paragraph({ text: `Établissement d’Origine: ${data.etablissementOrigine || "-"}` }),
            new Paragraph({ text: `Niveau scolaire: ${data.niveauScolaire || "-"}` }),
            new Paragraph({ text: `Numéro Matricule: ${data.numeroMatricule || "-"}` }),

            new Paragraph({ text: "3. Formation Choisie", heading: "Heading2" }),
            new Paragraph({ text: `Intitulé: ${data.intituleFormation || "-"}` }),
            new Paragraph({ text: `Durée: ${data.dureeFormation || "-"}` }),
            new Paragraph({ text: `Niveau Requis: ${data.niveauRequis || "-"}` }),

            new Paragraph({ text: "4. Situation Professionnelle", heading: "Heading2" }),
            new Paragraph({ text: `En emploi: ${data.emploi === "oui" ? "Oui" : "Non"}` }),
            new Paragraph({ text: `Entreprise: ${data.nomEntreprise || "-"}` }),
            new Paragraph({ text: `Poste: ${data.posteOccupe || "-"}` }),
            new Paragraph({ text: `Expérience (années): ${data.experiencePro || "-"}` }),

            new Paragraph({ text: "5. Personne à Contacter en Cas d’Urgence", heading: "Heading2" }),
            new Paragraph({ text: `Nom: ${data.nomContact || "-"}` }),
            new Paragraph({ text: `Lien de Parenté: ${data.lienParente || "-"}` }),
            new Paragraph({ text: `Téléphone: ${data.telephoneContact || "-"}` }),
            new Paragraph({ text: `Adresse: ${data.adresseContact || "-"}` }),

            new Paragraph({ text: "6. Documents à Joindre", heading: "Heading2" }),
            ...Object.entries(data.documents || {}).map(([key, value]) =>
              new Paragraph({
                text: `${value ? "☑" : "☐"} ${documentLabels[key] || key}`,
              })
            ),

            new Paragraph({ text: "7. Déclaration", heading: "Heading2" }),
            new Paragraph({
              text: `Je soussigné(e) ${data.nom || ""} ${data.prenoms || ""}, déclare sur l’honneur que les informations fournies sont exactes.`,
            }),
            new Paragraph({ text: `Nom complet (déclaration): ${data.fullNameDeclaration || "-"}` }),
            new Paragraph({ text: `Date: ${data.dateDeclaration || "-"}` }),
          ],
        },
      ],
    });
  }

  return await Packer.toBuffer(doc);
}
 