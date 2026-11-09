// Généré depuis https://dalibi.wearekarfi.dev/documentation : ne pas retaper à la main.
export const DOC_CODE: string[] = [
  "git clone https://github.com/wearedalibi/dalibi.git\ncd dalibi\ncomposer install\nnpm install",
  "cp .env.example .env\nphp artisan key:generate",
  "# Développement : schéma + données de référence + comptes de démo\nphp artisan migrate --seed\n# Lien symbolique pour les fichiers publics\nphp artisan storage:link",
  "# Développement (rechargement à chaud)\nnpm run dev\nphp artisan serve\n\n# …ou build de production\nnpm run build\nphp artisan serve",
  "php artisan queue:work      # worker (e-mails, sauvegardes manuelles)\nphp artisan schedule:work   # planificateur (tâches automatiques)",
  "cp .env.example .env        # renseigner APP_KEY, DB_*, MAIL_*\ndocker compose up -d --build\ndocker compose exec app php artisan migrate --seed\ndocker compose exec app php artisan storage:link",
  "APP_NAME=Dalibi\nAPP_URL=http://localhost:8000\n\n# Base de données (PostgreSQL)\nDB_CONNECTION=pgsql\nDB_HOST=127.0.0.1\nDB_PORT=5432\nDB_DATABASE=dalibi\nDB_USERNAME=postgres\nDB_PASSWORD=secret\n\n# Files d'attente (recommandé : database)\nQUEUE_CONNECTION=database\n\n# E-mails (pour notifications, ex. échec de sauvegarde)\nMAIL_MAILER=smtp\nMAIL_HOST=...\nMAIL_USERNAME=...\nMAIL_PASSWORD=...\n\n# Génération des matricules\nMATRICULE_COUNTRY_CODE=TG",
  "MAIL_MAILER=smtp\nMAIL_HOST=smtp.votre-fournisseur.com\nMAIL_PORT=587\nMAIL_USERNAME=...\nMAIL_PASSWORD=...\nMAIL_FROM_ADDRESS=no-reply@votre-domaine.tg   # sur un domaine que vous contrôlez\nMAIL_FROM_NAME=\"${APP_NAME}\"",
  "admin@dalibi.tg        →  Administrateur\ndirecteur@dalibi.tg    →  Directeur\nenseignant@dalibi.tg   →  Enseignant\ncomptable@dalibi.tg    →  Comptable\nsecretaire@dalibi.tg   →  Secrétaire\n# Mot de passe commun : password",
  "# 1. socle : école, année, classes, matières, comptes de démo\nphp artisan migrate --seed\n\n# 2. jeu de démonstration complet (une année scolaire vivante)\nphp artisan db:seed --class=DemoSeeder",
  "php artisan migrate --force\nphp artisan db:seed --class=ReferenceDataSeeder --force",
  "$u = App\\Models\\User::create([\n    'firstname' => 'Admin',\n    'lastname'  => 'École',\n    'email'     => 'admin@monecole.tg',\n    'gender'    => 'male',\n    'password'  => 'un-mot-de-passe-fort', // haché automatiquement\n]);\n$u->assignRole(App\\Constants\\Roles::ADMINISTRATOR); // le matricule est généré automatiquement",
  "APP_ENV=production\nAPP_DEBUG=false\nAPP_URL=https://ecole.votre-domaine.tg\n# APP_KEY doit être défini (php artisan key:generate) et gardé secret",
  "composer install --no-dev --optimize-autoloader\nnpm ci && npm run build\nphp artisan optimize        # config:cache + route:cache + view:cache\nphp artisan storage:link",
  "php artisan queue:work --tries=3",
  "* * * * * cd /chemin/app && php artisan schedule:run >> /dev/null 2>&1",
  "Navigateur  (Link Inertia)\n   │\n   ▼\nRoute  routes/web.php   ──►  middleware  can:view_students\n   │\n   ▼\nContrôleur  StudentController@index\n   │\n   ▼\nService métier  ──►  Modèles Eloquent  ──►  PostgreSQL\n   │\n   ▼\nInertia::render('Eleves/Index', props)\n   │\n   ▼\nPage React  resources/js/pages/Eleves/Index.tsx",
  "app/\n├── Http/Controllers/   ← 1 contrôleur par écran / ressource\n├── Models/             ← entités Eloquent (UUID)\n├── Services/           ← logique métier réutilisable et testable\n├── Jobs/               ← tâches en file d'attente (sauvegardes, e-mails)\n├── Notifications/      ← e-mails (ex. échec de sauvegarde)\n└── Constants/          ← Roles, Permissions\nresources/js/\n├── pages/              ← pages React (Inertia)\n├── components/         ← design-system + composants partagés\n└── types/menu.ts       ← navigation (source des modules)\nroutes/web.php          ← routes + gardes  can:*\ndatabase/\n├── migrations/         ← schéma\n└── seeders/            ← données de référence & démo",
  "php artisan backup:run --formats=json,sql",
  "# 1. Récupérer la nouvelle version\ngit pull\n\n# 2. Dépendances\ncomposer install --no-dev --optimize-autoloader\nnpm ci && npm run build\n\n# 3. Base de données\nphp artisan migrate --force\n\n# 4. Rafraîchir les caches\nphp artisan optimize:clear\nphp artisan optimize\n\n# 5. Redémarrer le worker (recharge le code)\nphp artisan queue:restart"
];
