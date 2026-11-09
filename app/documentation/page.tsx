import type { Metadata } from "next";
import {
  ArrowRight02Icon,
  ArrowUp01Icon,
  Book02Icon,
  File01Icon,
  Github01Icon,
} from "@hugeicons/core-free-icons";
import {
  A,
  Bullets,
  C,
  Callout,
  Card,
  Cards,
  Code,
  DocSection,
  H3,
  P,
  Step,
  Steps,
} from "@/components/site/doc-ui";
import { DocToc } from "@/components/site/doc-toc";
import { PageHero } from "@/components/site/page-hero";
import { Container, Icon, PbButton } from "@/components/site/primitives";
import { GITHUB_URL } from "@/lib/content";

export const metadata: Metadata = {
  title: "Documentation",
  description:
    "Installez, configurez, lancez et comprenez Dalibi. Ce guide vous mène du dépôt vide à une instance fonctionnelle que vous maîtrisez.",
};

const DOCS = `${GITHUB_URL}/blob/main/documentations`;

const TOC = [
  { id: "introduction", label: "Présentation" },
  { id: "prerequis", label: "Prérequis" },
  { id: "installation", label: "Installation locale" },
  { id: "docker", label: "Installation Docker" },
  { id: "configuration", label: "Configuration (.env)" },
  { id: "email", label: "E-mails (SMTP)" },
  { id: "demarrage", label: "Seeding & démarrage" },
  { id: "production", label: "Mise en production" },
  { id: "architecture", label: "Comprendre l’app" },
  { id: "modules", label: "Les modules" },
  { id: "roles", label: "Rôles & permissions" },
  { id: "stockage", label: "Stockage & fichiers" },
  { id: "sauvegardes", label: "Sauvegardes" },
  { id: "api", label: "API du portail" },
  { id: "securite", label: "Sécurité" },
  { id: "maj", label: "Mise à jour" },
  { id: "depannage", label: "Dépannage" },
  { id: "glossaire", label: "Glossaire" },
  { id: "contribuer", label: "Contribuer" },
];

const SEEDERS = [
  ["RolesAndPermissionsSeeder", "~145 permissions + les rôles de base.", "Minimum vital."],
  ["ReferenceDataSeeder", "Rôles/permissions + catalogues : pays, types de classes, classes PS→Tle, matières, catégories de frais, types d’évaluation, bourses, tags. Idempotent, sans données de démo.", "Production."],
  ["DefaultUsersSeeder", <>École « École Centrale » + 1 compte par rôle (mot de passe <C>password</C>).</>, "Démo / dev."],
  [<><C>DatabaseSeeder</C> (défaut de <C>db:seed</C>)</>, "ReferenceData + DefaultUsers + modèles de documents + élèves fictifs (inscrits à l’année active).", "Dev / démo — bloqué en prod."],
  ["DemoSeeder", "Une année scolaire complète sur toutes les classes (≥ 20 élèves) : notes, moyennes, bulletins, factures & paiements, présences, emploi du temps, calendrier, paie — noms et villes réels (Togo).", "Démo riche — bloqué en prod."],
] as const;

const SERVICES = [
  ["GradingService", "calcul des moyennes et règles de notation (par type de classe, trimestre/semestre)"],
  ["ReportCardBuilder / BulletinRenderer", "construction des données puis rendu PDF fidèle des bulletins"],
  ["PayrollService", "paie : ancienneté, CNSS/ITS, génération des bulletins de salaire"],
  ["AccountingService", "écritures comptables : écolage, dépenses, mouvements de caisse"],
  ["InvoiceService", "reçus et factures"],
  ["StatisticsService", "indicateurs de pilotage et exports"],
  ["DocumentRenderer", "documents PDF (certificats) avec en-tête et filigrane"],
  ["MatriculeService", "génération des matricules et numéros d’enregistrement"],
  ["BackupService", "sauvegardes, archives d’année et restauration"],
];

const DOC_MODULES = [
  { title: "Tableau de bord", intro: "Synthèse d’activité, composée par permission — chaque profil ne voit que ses sections.", points: ["Finances : facturé / encaissé / reste, évolution mensuelle, caisses, répartition par moyen de paiement", "Inscriptions & effectifs : totaux, parité, inscriptions récentes, répartition par classe", "Vie scolaire : présences du jour, permissions en attente, prochains examens", "Vue enseignant : emploi du temps du jour, notes à saisir, accès rapide « Faire l’appel »"] },
  { title: "Élèves & inscriptions", intro: "Le cœur de la scolarité : dossiers des élèves et leur parcours d’une année à l’autre.", points: ["Dossiers élèves complets (état civil, parents, contacts, photo)", "Inscriptions à l’année académique active et affectation aux classes", "Effectifs & listes de classe, passage de classe (promotion) en fin d’année", "Bourses d’étudiants et statistiques élèves (parité, répartition)", "Emploi du temps hebdomadaire par classe"] },
  { title: "Présences", intro: "Suivi de l’assiduité au quotidien.", points: ["Saisie de l’appel par classe et par séance", "Statistiques d’assiduité (taux de présence, absences répétées)", "Demandes et justificatifs de permission d’absence"] },
  { title: "Examens", intro: "Organisation des évaluations, des devoirs de classe aux examens officiels.", points: ["Modèles d’évaluation réutilisables", "Évaluations par classe et planning des examens", "Examens officiels (CEPD, BEPC, BAC) et suivi des résultats"] },
  { title: "Notes & bulletins", intro: "De la saisie des notes au bulletin PDF fidèle.", points: ["Saisie des notes par matière et par évaluation", "Calcul des moyennes paramétrable (par type de classe, trimestre ou semestre)", "Génération des bulletins PDF avec en-tête et modèle configurables", "Réclamations et révisions de notes"] },
  { title: "Comptabilité & écolage", intro: "Toute la gestion financière de l’établissement.", points: ["Structures et catégories de frais, écolage par classe", "Encaissements, reçus vérifiables, situation financière par classe", "Dépenses et journal des transactions", "Caisses multiples (dont Mobile Money) et soldes"] },
  { title: "Personnel & Paie", intro: "Ressources humaines et paie du personnel, connectées à la comptabilité.", points: ["Fiches employés, grilles salariales et rubriques de paie", "Cycles de paie mensuels : bulletins PDF, validation et décaissement en caisse", "Ancienneté, CNSS et ITS calculés automatiquement (paramétrables)"] },
  { title: "Archives & documents", intro: "Production et conservation des documents administratifs.", points: ["Modèles de documents (certificats, attestations) avec en-tête et filigrane par école", "Archivage des documents générés, corbeille et restauration", "Classement par tags"] },
  { title: "Statistiques & pilotage", intro: "Indicateurs de direction alignés sur la carte scolaire (MEPSTA).", points: ["Filtres par année, classe et sexe", "Indicateurs d’effectifs, de réussite et de vie scolaire", "Export PDF et Excel sur chaque section"] },
  { title: "Calendrier", intro: "Les événements de l’année scolaire.", points: ["Événements, échéances et jalons de l’année académique active"] },
  { title: "Portail parents & élèves", intro: "Consultation à distance via une API dédiée (voir la section API).", points: ["Notes, bulletins PDF, présences et scolarité par enfant", "Calendrier et informations de l’établissement", "Authentifié par token (Laravel Sanctum)"] },
  { title: "Administration", intro: "Gestion des accès et traçabilité.", points: ["Utilisateurs, rôles et permissions (contrôle d’accès fin)", "Affectations enseignant / matière / classe", "Journal d’audit des actions et gestion des accès portail"] },
  { title: "Paramètres", intro: "La configuration de référence de l’établissement.", points: ["École, classes, types de classes, matières, pays", "Années et périodes académiques, types d’évaluation", "Catégories et structures de frais, bourses, calcul des moyennes", "Fichiers & stockage (local / S3), modèles de documents, sauvegardes"] },
];

const TROUBLES = [
  ["Les sauvegardes ou e-mails restent « en attente »", <>Le worker de file d’attente ne tourne pas. Lancez <C>php artisan queue:work</C> (et supervisez-le en service).</>],
  ["Logos / images en 404", <>Le lien symbolique manque : <C>php artisan storage:link</C>.</>],
  ["Erreur 500 / « Permission denied » à l’écriture", <>Droits insuffisants sur <C>storage/</C> et <C>bootstrap/cache/</C> pour l’utilisateur du serveur web.</>],
  ["La sauvegarde SQL échoue en production", <><C>pg_dump</C> / <C>pg_restore</C> ne sont pas installés. Installez le client PostgreSQL (l’app bascule sinon sur l’export portable).</>],
  ["Erreur 419 « Page expirée » à la connexion", <>Problème de session/CSRF : vérifiez <C>APP_URL</C>, le domaine des cookies et que le proxy transmet bien le HTTPS (<C>X-Forwarded-Proto</C>).</>],
  ["Styles/JS non chargés ou « contenu mixte »", <><C>APP_URL</C> doit être en <C>https</C> et le reverse proxy doit transmettre <C>X-Forwarded-Proto</C>.</>],
  ["Les tâches planifiées ne s’exécutent pas", <>Le cron du planificateur est absent : ajoutez <C>* * * * * php artisan schedule:run</C>.</>],
  ["Anciennes pages après un déploiement", <>Videz les caches : <C>php artisan optimize:clear</C> puis <C>php artisan optimize</C>.</>],
] as const;

const GLOSSARY = [
  ["Année académique", "Le cycle scolaire (ex. 2024-2025). Une seule est active à la fois."],
  ["Période", "Découpage de l’année : trimestre ou semestre, selon le type de classe."],
  ["Type de classe", "Catégorie (maternelle, primaire, collège…) qui pilote les règles de moyennes."],
  ["Structure / catégorie de frais", "Le barème d’écolage et sa ventilation, par classe."],
  ["Écolage", "Les frais de scolarité facturés et encaissés."],
  ["Bulletin", "Le relevé de notes périodique, généré en PDF depuis un modèle."],
  ["Matricule", "L’identifiant unique d’un utilisateur ou d’un élève (préfixe par rôle)."],
  ["Rôle / Permission", "Un rôle est un ensemble de permissions ; l’accès est piloté par permissions."],
  ["Caisse", "Un compte de trésorerie (espèces, Mobile Money…) pour encaissements et dépenses."],
  ["Rubrique de paie", "Un élément de bulletin de salaire (gain ou retenue)."],
  ["Portail", "L’espace de consultation des parents/élèves, alimenté par l’API."],
];

export default function DocumentationPage() {
  return (
    <main>
      <PageHero
        eyebrow={
          <>
            <Icon icon={Book02Icon} size={18} className="text-accent-text" />
            Version stable : v1.0.0
          </>
        }
        lines={[{ text: "Prise en main de Dalibi," }, { text: "", accent: "de A à Z" }]}
        description="Installez, configurez, lancez et comprenez Dalibi. Ce guide vous mène du dépôt vide à une instance fonctionnelle que vous maîtrisez."
      />

      <Container className="mt-14 grid gap-8 lg:grid-cols-[230px_minmax(0,1fr)] lg:gap-14 xl:grid-cols-[250px_minmax(0,1fr)]">
        <div>
          <DocToc items={TOC} />
        </div>

        <div className="flex max-w-[860px] min-w-0 flex-col gap-14">
          <DocSection id="introduction" kicker="Découvrir" title="Qu’est-ce que Dalibi ?">
            <P>
              Dalibi est un logiciel libre et open-source (GPL v3) de gestion d’établissement scolaire, pensé pour le Togo et l’Afrique (primaire, collège, lycée). Il couvre toute la vie de l’école : élèves, notes, examens, présences, finances, personnel et documents.
            </P>
            <P>
              Techniquement, c’est une application Laravel 12 (PHP 8.3+) avec une interface React 19 + TypeScript reliée par Inertia.js (SPA sans API séparée), sur PostgreSQL. En auto-hébergement, vos données restent chez vous.
            </P>
            <Callout title="Version stable : v1.0.0">
              La version stable actuelle. Ce guide décrit la <A href={`${GITHUB_URL}/releases/tag/v1.0.0`}>v1.0.0</A> — voir le <A href={`${GITHUB_URL}/blob/main/CHANGELOG.md`}>journal des versions</A>.
            </Callout>
            <Cards>
              <Card title="Scolarité">Élèves & inscriptions, notes & bulletins, examens officiels, présences, emploi du temps.</Card>
              <Card title="Gestion">Comptabilité & écolage, personnel & paie, caisses, dépenses, statistiques de pilotage.</Card>
              <Card title="Cadre">Rôles & permissions fins, documents PDF, archives, sauvegardes et portail parents/élèves.</Card>
            </Cards>
          </DocSection>

          <DocSection id="prerequis" kicker="Étape 1" title="Prérequis">
            <P>Sur votre machine (ou serveur), installez :</P>
            <Bullets
              items={[
                <>PHP 8.3+ avec les extensions usuelles (<C>pdo_pgsql</C>, <C>mbstring</C>, <C>zip</C>, <C>gd</C>, <C>intl</C>).</>,
                "Composer (gestionnaire de dépendances PHP).",
                "PostgreSQL 12+ (recommandé). SQLite convient pour un test rapide.",
                "Node.js 20+ et npm (build de l’interface).",
                "Git.",
              ]}
            />
            <Callout title="Optionnel mais recommandé">
              Les binaires <C>pg_dump</C> / <C>pg_restore</C> (client PostgreSQL) pour les sauvegardes SQL natives, et Docker pour un déploiement de production reproductible.
            </Callout>
          </DocSection>

          <DocSection id="installation" kicker="Étape 2" title="Installation locale">
            <Steps>
              <Step n={1} title="Cloner le dépôt et installer les dépendances">
                <Code i={0} label="Terminal" />
              </Step>
              <Step n={2} title="Préparer l’environnement">
                <Code i={1} label="Terminal" />
                <P>Ouvrez ensuite <C>.env</C> et renseignez la base de données (voir <A href="#configuration">Configuration</A>).</P>
              </Step>
              <Step n={3} title="Créer le schéma et les données de base">
                <Code i={2} label="Terminal" />
                <P><C>--seed</C> exécute le <C>DatabaseSeeder</C> (données de démonstration, dont des comptes prêts à l’emploi). Pour la production, on seede uniquement les données de référence — voir <A href="#demarrage">Seeding & premier démarrage</A>.</P>
              </Step>
              <Step n={4} title="Compiler l’interface et lancer le serveur">
                <Code i={3} label="Terminal" />
                <P>L’application est disponible sur <C>http://localhost:8000</C>.</P>
              </Step>
              <Step n={5} title="Traitements en arrière-plan (files d’attente & planificateur)">
                <P>Les e-mails et les sauvegardes manuelles passent par une file d’attente ; les sauvegardes planifiées par le planificateur. En local :</P>
                <Code i={4} label="Terminal" />
              </Step>
            </Steps>
            <Callout tone="warn" title="Sans worker actif">
              Les sauvegardes lancées depuis l’interface et les e-mails restent en attente et ne s’exécutent jamais. Gardez un <C>queue:work</C> en service.
            </Callout>
          </DocSection>

          <DocSection id="docker" kicker="Alternative" title="Installation Docker (production)">
            <P>Pour un déploiement reproductible, une image et une configuration Docker sont fournies dans le dépôt (services app, worker, scheduler, PostgreSQL). Le schéma type :</P>
            <Code i={5} label="Terminal" />
            <P>Le service scheduler doit tourner en un seul exemplaire (sinon sauvegardes en double). Détails et fichiers de déploiement dans le <A href={`${DOCS}/exploitation/deploiement.md`}>guide de déploiement</A>.</P>
          </DocSection>

          <DocSection id="configuration" kicker="Étape 3" title="Configuration (.env)">
            <P>Les variables essentielles à renseigner dans <C>.env</C> :</P>
            <Code i={6} label=".env" />
            <P>Le stockage des fichiers (local ou S3/R2) se configure ensuite depuis l’interface (Paramètres → Fichiers & Stockage), pas seulement via <C>.env</C>. Voir aussi la <A href={`${DOCS}/prise-en-main/configuration-env.md`}>référence complète du <C>.env</C></A>.</P>
          </DocSection>

          <DocSection id="email" kicker="Étape 3b" title="Configurer les e-mails (SMTP)">
            <P>Dalibi envoie des e-mails (notifications, alerte d’échec de sauvegarde, accès portail…). La messagerie se configure via les variables <C>MAIL_*</C> de Laravel. En développement, la valeur par défaut <C>MAIL_MAILER=log</C> écrit les mails dans les logs (aucun envoi réel).</P>
            <Code i={7} label=".env — envoi réel (SMTP)" />
            <Callout tone="warn" title="Délivrabilité : éviter les spams">
              Pour que les mails arrivent en boîte de réception, l’adresse <C>MAIL_FROM_ADDRESS</C> doit être sur un domaine authentifié : configurez SPF, DKIM et DMARC dans votre DNS, via un fournisseur transactionnel (Brevo, Mailgun, Postmark, Resend…). Un domaine non authentifié part en spam. Testez avec <A href="https://www.mail-tester.com">mail-tester.com</A>.
            </Callout>
            <P>Rappel : les e-mails et les sauvegardes manuelles passent par la file d’attente — un worker doit tourner (voir Installation et Mise en production).</P>
          </DocSection>

          <DocSection id="demarrage" kicker="Étape 4" title="Seeding & premier démarrage">
            <P>Le seeding pré-remplit la base. C’est aussi par là que naît le premier utilisateur : l’inscription publique est désactivée, aucun compte ne peut s’auto-créer. Quatre points d’entrée existent, du plus minimal au plus complet :</P>
            <div className="glass overflow-x-auto rounded-[22px]">
              <table className="w-full min-w-[640px] border-collapse text-left text-[15.5px] leading-[1.45]">
                <thead>
                  <tr className="border-b">
                    <th scope="col" className="p-4">Seeder</th>
                    <th scope="col" className="p-4">Contenu</th>
                    <th scope="col" className="p-4">Usage</th>
                  </tr>
                </thead>
                <tbody>
                  {SEEDERS.map(([name, content, usage], i) => (
                    <tr key={i} className={i < SEEDERS.length - 1 ? "border-b align-top" : "align-top"}>
                      <td className="p-4">{typeof name === "string" ? <C>{name}</C> : name}</td>
                      <td className="p-4 text-foreground/85">{content}</td>
                      <td className="p-4 text-foreground/85">{usage}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Callout title="Le choix du seeder est manuel">
              Il n’y a pas de bascule automatique selon l’environnement : c’est vous qui choisissez le seeder à lancer (démo en dev, <C>ReferenceDataSeeder</C> en prod). Laravel ajoute toutefois un garde-fou — en production, <C>db:seed</C> et <C>migrate --seed</C> demandent une confirmation et refusent de s’exécuter sans <C>--force</C> (utile en déploiement non-interactif).
            </Callout>

            <H3>Développement / démo — connexion immédiate</H3>
            <P><C>php artisan migrate --seed</C> exécute le <C>DatabaseSeeder</C> : vous obtenez une école et cinq comptes prêts à l’emploi, tous avec le mot de passe <C>password</C>.</P>
            <Code i={8} label="Comptes de démonstration" />
            <Callout tone="warn" title="Changement de mot de passe imposé">
              Ces comptes portent un mot de passe connu : à la première connexion, l’application oblige à en définir un nouveau avant de donner accès au reste de l’interface.
            </Callout>
            <Callout title="Protection automatique en production">
              Les seeders de démonstration (<C>DefaultUsersSeeder</C>, <C>StudentTestSeeder</C>) sont automatiquement ignorés lorsque <C>APP_ENV=production</C> — même avec <C>db:seed --force</C>. Un <C>db:seed</C> en production n’installe donc que les données de référence.
            </Callout>

            <H3>Données de démonstration complètes</H3>
            <P>Pour présenter l’application avec une école qui « vit », le <C>DemoSeeder</C> génère une année scolaire entière sur toutes les classes actives (au moins 20 élèves par classe) : dossiers d’élèves, programme et affectations des enseignants, évaluations notées et moyennes par matière, bulletins figés, facturation et paiements, présences, emploi du temps, calendrier, cycles de paie et dossiers courants (justificatifs, réclamations, primes, documents). Les noms, prénoms et villes sont réels (divisions administratives du Togo).</P>
            <P>Il se lance après un seed de base (qui pose l’école, l’année, les classes et les matières) — il ne fait pas partie de <C>DatabaseSeeder</C>, trop lourd pour chaque installation :</P>
            <Code i={9} label="Terminal" />
            <Callout title="Idempotent et déterministe">
              Relançable sans doublon (il complète chaque classe jusqu’à l’effectif cible) et reproductible d’une machine à l’autre (graine fixe). Comme les autres seeders de démonstration, il est ignoré en production.
            </Callout>

            <H3>Production — seeding prod-safe + premier admin</H3>
            <P>En production, on migre puis on ne seede que les données de référence (aucun compte de démo, aucun élève fictif) :</P>
            <Code i={10} label="Terminal" />
            <P>Il ne reste plus qu’à créer votre premier administrateur. Via Tinker :</P>
            <Code i={11} label="php artisan tinker" />
            <P>Alternative rapide : lancer <C>db:seed --class=DefaultUsersSeeder</C> puis changer immédiatement le mot de passe du compte <C>admin@dalibi.tg</C> et supprimer les comptes de démo superflus.</P>

            <H3>Configurer l’établissement</H3>
            <P>Connectez-vous, puis suivez l’ordre logique (les catalogues classes/matières/frais sont déjà pré-remplis par <C>ReferenceDataSeeder</C> — il reste à les adapter à votre école) :</P>
            <Callout title="Provisionnement automatique">
              À la création d’un établissement, son en-tête de documents et son modèle de bulletin par défaut sont générés automatiquement — rien à seeder.
            </Callout>
            <Steps>
              <Step n={1} title="Paramétrer l’établissement"><P>École (nom, logo, en-tête des documents), année académique active, périodes (trimestres/semestres), classes et matières.</P></Step>
              <Step n={2} title="Définir la scolarité financière"><P>Structures de frais (à partir des catégories seedées), bourses éventuelles, caisses.</P></Step>
              <Step n={3} title="Créer les comptes du personnel"><P>Utilisateurs (enseignants, secrétariat, comptabilité) avec leurs rôles.</P></Step>
              <Step n={4} title="Inscrire les élèves"><P>Dossiers élèves, inscriptions à l’année active, affectation aux classes.</P></Step>
              <Step n={5} title="Faire vivre l’année"><P>Appel des présences, saisie des notes, génération des bulletins, encaissement de l’écolage, documents et archives.</P></Step>
            </Steps>
          </DocSection>

          <DocSection id="production" kicker="Étape 5" title="Mise en production">
            <P>Passer d’un lancement local à une instance de production demande quelques réglages de robustesse et de sécurité.</P>
            <Steps>
              <Step n={1} title="Régler l’environnement"><Code i={12} label=".env" /></Step>
              <Step n={2} title="Installer et compiler pour la prod"><Code i={13} label="Terminal" /></Step>
              <Step n={3} title="Servir derrière HTTPS">
                <P>Un reverse proxy (Nginx ou Caddy) devant PHP-FPM, avec un certificat TLS (Let’s Encrypt). Assurez-vous qu’il transmet l’en-tête <C>X-Forwarded-Proto</C> pour que Laravel génère des URLs en <C>https</C>.</P>
              </Step>
              <Step n={4} title="Worker de file d’attente en service">
                <P>Indispensable (sinon e-mails et sauvegardes manuelles ne partent jamais). À superviser avec systemd ou Supervisor pour redémarrage automatique :</P>
                <Code i={14} label="Terminal" />
              </Step>
              <Step n={5} title="Planificateur (tâches automatiques)">
                <P>Une seule entrée cron qui déclenche le planificateur Laravel :</P>
                <Code i={15} label="crontab" />
              </Step>
              <Step n={6} title="Droits & prérequis">
                <P><C>storage/</C> et <C>bootstrap/cache/</C> accessibles en écriture par le serveur web ; <C>pg_dump</C> / <C>pg_restore</C> installés pour les sauvegardes SQL natives.</P>
              </Step>
            </Steps>
            <Callout tone="warn" title="Un seul planificateur">
              N’exécutez qu’un seul scheduler (une seule machine / un seul conteneur) — sinon les sauvegardes planifiées se déclenchent en double.
            </Callout>
            <P>Une image et une configuration Docker (services app / worker / scheduler / PostgreSQL) sont fournies — voir le <A href={`${DOCS}/exploitation/deploiement.md`}>guide de déploiement</A>.</P>
          </DocSection>

          <DocSection id="architecture" kicker="Comprendre" title="Comment l’application est construite">
            <P>Dalibi est un monolithe modulaire : une seule application Laravel qui rend directement des pages React via Inertia.js. Il n’y a donc pas d’API REST séparée pour l’interface — le contrôleur renvoie une page et ses données en une fois. Une API REST distincte existe uniquement pour le portail parents/élèves (voir la section <A href="#api">API</A>). La logique métier est regroupée dans des services, et l’accès est filtré par permission à chaque route.</P>
            <Cards cols={2}>
              <Card title="Modules">Un contrôleur et un jeu de pages par module ; la navigation (<C>menu.ts</C>) est la source unique des entrées, filtrée par permission.</Card>
              <Card title="Services métier">La logique complexe (paie, moyennes, compta, PDF…) vit dans des services testables, réutilisés par les contrôleurs et les commandes.</Card>
              <Card title="Front">React 19 + TypeScript dans <C>resources/js/pages</C>, design-system maison, listes normalisées (filtres + bouton « Rechercher » + pagination).</Card>
              <Card title="Données">PostgreSQL, migrations Laravel, identifiants UUID, journal d’audit des actions, dictionnaire des tables documenté.</Card>
            </Cards>
            <H3>Le cycle d’une requête</H3>
            <P>Un clic sur un lien Inertia déclenche une requête serveur classique ; Laravel répond avec la page et ses données, React met à jour l’écran sans rechargement complet.</P>
            <Code i={16} label="De l’URL à l’écran" />
            <H3>Données partagées à chaque page</H3>
            <P>Inertia partage automatiquement, sur toutes les pages : l’utilisateur connecté, ses rôles et la liste de ses permissions, ainsi que la monnaie de l’établissement. C’est ce qui permet au front de n’afficher que les menus, cartes et actions autorisés — sans requête supplémentaire.</P>
            <H3>Structure du code</H3>
            <Code i={17} label="Arborescence" />
            <H3>Les services métier</H3>
            <P>Le « cerveau » de l’application. Chaque service isole une logique précise, ce qui la rend testable et réutilisable (contrôleurs, commandes CLI, jobs) :</P>
            <Bullets items={SERVICES.map(([name, role]) => <><C>{name}</C> — {role}</>)} />
            <H3>Conventions transverses</H3>
            <Bullets
              items={[
                "Identifiants UUID sur toutes les tables (pas d’entiers auto-incrémentés exposés).",
                <>Contrôle d’accès par permission à chaque route (<C>can:*</C>), et permissions partagées au front.</>,
                "Journal d’audit : les actions sensibles sont tracées (qui, quoi, quand).",
                "Listes normalisées : filtres + bouton « Rechercher » explicite + pagination, partout.",
                "Files d’attente (e-mails, sauvegardes manuelles) + planificateur (tâches automatiques).",
                <>Stockage séparé : disque <C>media</C> (public) et disque <C>secure</C> (privé), local ou S3/R2.</>,
                "Observabilité optionnelle : logs JSON (Loki/Grafana) + capture d’exceptions (Sentry/GlitchTip).",
              ]}
            />
          </DocSection>

          <DocSection id="modules" kicker="Comprendre" title="Les modules en détail">
            <P>Dalibi s’organise en modules accessibles depuis le menu latéral. Chacun regroupe des fonctions cohérentes, filtrées par vos permissions. Voici ce que couvre chaque module.</P>
            <div className="grid gap-3 md:grid-cols-2">
              {DOC_MODULES.map((module) => (
                <article key={module.title} className="glass rounded-[22px] p-5">
                  <h3 className="text-[1.2rem] leading-[1.2] tracking-[-0.02em]">{module.title}</h3>
                  <p className="mt-1.5 text-base leading-[1.45] text-muted">{module.intro}</p>
                  <ul className="mt-3 flex list-disc flex-col gap-1.5 pl-4.5 text-[15.5px] leading-[1.45] text-foreground/85 marker:text-accent-text">
                    {module.points.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </DocSection>

          <DocSection id="roles" kicker="Comprendre" title="Rôles & permissions">
            <P>L’accès est piloté par les permissions (<C>{"{capacité}_{module}"}</C>, ex. <C>view_students</C>, <C>create_marks</C>, <C>delete_backups</C>) — environ 145 au total. Un rôle est simplement un ensemble de permissions ; il n’existe pas de super-rôle magique.</P>
            <Bullets
              items={[
                "Administrateur — accès complet, configuration, gestion des comptes.",
                "Directeur — école, années, classes, suivi, rapports.",
                "Enseignant — ses classes, notes, présences.",
                "Comptable — finances, rapports, exports.",
                "Secrétaire — élèves & inscriptions, utilisateurs.",
                "Parent / Élève — portail de consultation.",
              ]}
            />
            <P>Vous pouvez créer un rôle personnalisé depuis Administration → Rôles & permissions : il fonctionne aussitôt (menus, routes, cartes). Détails : <A href={`${DOCS}/administration/roles-permissions.md`}>guide rôles & permissions</A>.</P>
            <H3>Ce que le contrôle d’accès garantit</H3>
            <Bullets
              items={[
                <>Une permission par verbe : un droit de lecture (<C>view_*</C>) ne permet jamais de créer, modifier ou supprimer.</>,
                "Cloisonnement enseignant : un professeur ne saisit notes et appels que dans les classes où il est affecté.",
                "Contrôle d’appartenance : on ne note ni ne pointe qu’un élève réellement inscrit dans la classe visée.",
                "Comptes à privilèges : seul un administrateur peut modifier ou supprimer un compte administrateur.",
                "Un mot de passe défini par un tiers doit être changé à la première connexion.",
              ]}
            />
          </DocSection>

          <DocSection id="stockage" kicker="Comprendre" title="Stockage & fichiers">
            <P>Deux disques applicatifs séparent les usages :</P>
            <Bullets
              items={[
                <><C>media</C> — fichiers publics (logos, filigranes, exports) servis via <C>/storage</C>.</>,
                <><C>secure</C> — fichiers sensibles (photos d’élèves, pièces des dossiers), stockés hors du dossier public et servis uniquement via des routes authentifiées.</>,
              ]}
            />
            <P>Les deux suivent la même configuration centralisée : local par défaut, ou S3 / Cloudflare R2 activé depuis Paramètres → Fichiers & Stockage.</P>
          </DocSection>

          <DocSection id="sauvegardes" kicker="Exploiter" title="Sauvegardes & restauration">
            <P>Depuis Paramètres → Sauvegardes, aux formats JSON et SQL. Conçu pour tenir sur plusieurs années : écriture en flux, compression gzip, et <C>pg_dump</C> natif sur PostgreSQL (repli portable sinon).</P>
            <Bullets
              items={[
                <>Médias au choix : archive <C>.zip</C> regroupant la base + les fichiers uploadés.</>,
                "Archives par année scolaire : instantané verrouillé, exclu de la rétention (manuel ou à la clôture d’année).",
                "Intégrité : empreinte SHA-256 vérifiable + alerte e-mail en cas d’échec.",
                <>Restauration : <C>.json</C>, <C>.sql</C>, <C>.gz</C>, <C>.dump</C>, <C>.zip</C> — avec sauvegarde de sécurité automatique préalable, et restauration sélective par table.</>,
                "Planification : quotidienne/hebdomadaire + rétention (les archives verrouillées ne sont jamais purgées).",
              ]}
            />
            <Code i={18} label="Terminal" />
          </DocSection>

          <DocSection id="api" kicker="Intégrer" title="API du portail parents & élèves">
            <P>Le portail expose une API REST (<C>/api/v1</C>) authentifiée par token Laravel Sanctum : notes, bulletins PDF, présences, scolarité et calendrier. La spécification OpenAPI 3.1 est fournie dans le dépôt.</P>
            <Callout tone="warn" title="Le portail se configure dans les réglages — désactivé par défaut">
              Le portail (et donc son API) s’active au niveau de l’école depuis Paramètres → École. Surtout, l’accès de chaque parent/élève est désactivé par défaut : il faut l’activer compte par compte depuis Administration → Accès portail. Tant qu’un compte n’est pas activé, il ne peut ni se connecter au portail ni consommer l’API.
            </Callout>
            <P>Côté parent/élève : une fois son accès activé (Administration → Accès portail), la personne reçoit ses identifiants, se connecte au portail et consulte — pour chacun de ses enfants — ses notes, bulletins, présences, la scolarité et le calendrier. Aucune saisie : c’est une vue en lecture seule alimentée par l’API.</P>
            <div>
              <PbButton href={`${GITHUB_URL}/blob/main/docs/api/openapi.yaml`} target="_blank" rel="noreferrer" icon={File01Icon}>
                Spécification OpenAPI
              </PbButton>
            </div>
          </DocSection>

          <DocSection id="securite" kicker="Exploiter" title="Sécurité & bonnes pratiques">
            <Bullets
              items={[
                "Les comptes de démonstration sont bloqués en production et imposent un changement de mot de passe à la première connexion — ne contournez pas ce garde-fou.",
                <><C>APP_DEBUG=false</C> en production, et ne commitez jamais l’<C>APP_KEY</C> ni le <C>.env</C>.</>,
                "Servez toujours en HTTPS ; forcez la redirection HTTP → HTTPS.",
                "Activez la double authentification (2FA) sur les comptes à privilèges (administrateur, direction).",
                "Appliquez le moindre privilège : donnez à chaque rôle uniquement les permissions nécessaires.",
                "Écritures financières protégées : encaissements et cycles de paie sont validés sous verrou — un double-clic ne peut pas encaisser ni décaisser deux fois.",
                "La preuve d’un encaissement est indestructible : une inscription portant des paiements ne peut pas être supprimée.",
                "Sauvegardez régulièrement et hors-site (règle 3-2-1) ; testez la restauration et l’intégrité (SHA-256).",
                <>Les pièces sensibles (photos, justificatifs) sont déjà sur un disque privé (<C>secure</C>), hors du dossier public.</>,
                "Le journal d’audit trace les actions : consultez-le en cas d’incident.",
              ]}
            />
          </DocSection>

          <DocSection id="maj" kicker="Exploiter" title="Mettre à jour l’application">
            <Callout tone="warn" title="Sauvegardez d’abord">
              Faites une sauvegarde (base + médias) avant toute mise à jour, et lisez les notes de version.
            </Callout>
            <Code i={19} label="Terminal" />
          </DocSection>

          <DocSection id="depannage" kicker="Aide" title="Dépannage (problèmes fréquents)">
            <div className="glass rounded-[22px]">
              {TROUBLES.map(([problem, fix], i) => (
                <div key={problem} className={i < TROUBLES.length - 1 ? "border-b p-5" : "p-5"}>
                  <h3 className="text-[1.1rem] leading-[1.3] tracking-[-0.015em]">{problem}</h3>
                  <p className="mt-1.5 text-base leading-[1.55] text-muted">{fix}</p>
                </div>
              ))}
            </div>
          </DocSection>

          <DocSection id="glossaire" kicker="Référence" title="Glossaire métier">
            <P>Dalibi gère un ou plusieurs établissements (table <C>schools</C>) ; certains paramètres (modèles de bulletin et de documents, en-tête, calcul des moyennes, examens officiels, emploi du temps) sont définis par école.</P>
            <dl className="grid gap-x-8 sm:grid-cols-2">
              {GLOSSARY.map(([term, definition]) => (
                <div key={term} className="border-t py-3.5">
                  <dt className="text-[1.05rem] font-medium tracking-[-0.01em]">{term}</dt>
                  <dd className="mt-1 text-base leading-[1.5] text-muted">{definition}</dd>
                </div>
              ))}
            </dl>
          </DocSection>

          <DocSection id="contribuer" kicker="Aller plus loin" title="Contribuer & ressources">
            <P>Dalibi est ouvert aux contributions. Le workflow : branches de fonctionnalité vers <C>develop</C>, PR, puis <C>main</C>. Les tests se lancent avec <C>php artisan test</C>.</P>
            <div className="flex flex-wrap items-center gap-x-7 gap-y-4">
              <PbButton href={GITHUB_URL} target="_blank" rel="noreferrer" icon={Github01Icon}>
                Dépôt GitHub
              </PbButton>
              <A href={`${GITHUB_URL}/blob/main/CONTRIBUTING.md`}>Guide de contribution</A>
              <A href={`${DOCS}/README.md`}>Toute la documentation</A>
            </div>
            <Callout id="licence" title="Licence GPL v3">
              Code ouvert et auditable, librement utilisable et modifiable ; il ne peut être revendu comme produit propriétaire.
            </Callout>
            <a href="#introduction" className="group inline-flex items-center gap-1.5 self-start text-lg underline-offset-4 hover:underline">
              <Icon icon={ArrowUp01Icon} size={20} className="text-accent-text" />
              Revenir au début
            </a>
          </DocSection>
        </div>
      </Container>

      <div className="h-24 sm:h-36" aria-hidden />
    </main>
  );
}
