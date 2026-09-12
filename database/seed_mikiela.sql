-- ============================================================
--  Portfolio Pro – Données de MIKIELA CAPY ONNY TYBURS
--  Base : portfolio_pro (MySQL)
--  Usage : mysql -u root -p portfolio_pro < seed_mikiela.sql
--  Compatible avec le schéma généré par Sequelize (backend/src/models/index.js)
-- ============================================================
-- ------------------------------------------------------------
-- 1. Admin (login: admin@portfolio.com / Admin@2026)
-- ------------------------------------------------------------
INSERT INTO
  admins (
    fullname,
    email,
    password,
    role,
    created_at,
    updated_at
  )
VALUES
  (
    'Portfolio Admin',
    'admin@portfolio.com',
    '$2b$10$y2R9EylV/zZHlOTy8p3bJ.pugPTv8cHRloqY2V.LQo/Kriv6kPmbe',
    'ADMIN',
    NOW (),
    NOW ()
  ) ON DUPLICATE KEY
UPDATE email = email;

-- ------------------------------------------------------------
-- 2. Profil
-- ------------------------------------------------------------
INSERT INTO
  profiles (
    id,
    fullname,
    profession,
    slogan,
    biography,
    email,
    phone,
    website,
    github,
    portfolio,
    city,
    country,
    years_experience,
    projects_completed,
    clients,
    created_at,
    updated_at
  )
VALUES
  (
    1,
    'MIKIELA CAPY ONNY TYBURS',
    'Développeur Full-Stack et Entrepreneur',
    'Des solutions digitales innovantes et performantes',
    'Développeur Web Full Stack passionné, étudiant en Licence 3 Génie Informatique (INPTIC – DTS). Entrepreneur, j''allie compétences techniques et stratégie business pour créer des solutions digitales innovantes et performantes. Autonome, rigoureux et créatif, je vise des projets web ambitieux et impactants.\n\nLangues : Français (bien), Anglais (intermédiaire).\nCentres d''intérêt : Sport, Art, Voyage, Musique, Photographie.',
    'mikielaonny9@gmail.com',
    '077 75 99 38 / 065 74 28 37',
    'https://portfolio-groupe.netlify.app/',
    'https://github.com/OnnyMIKIELA-CAPY',
    'https://portfolio-groupe.netlify.app/',
    'Owendo',
    'Gabon',
    0,
    0,
    0,
    NOW (),
    NOW ()
  ) ON DUPLICATE KEY
UPDATE fullname =
VALUES
  (fullname),
  profession =
VALUES
  (profession),
  slogan =
VALUES
  (slogan),
  biography =
VALUES
  (biography),
  email =
VALUES
  (email),
  phone =
VALUES
  (phone),
  website =
VALUES
  (website),
  github =
VALUES
  (github),
  portfolio =
VALUES
  (portfolio),
  city =
VALUES
  (city),
  country =
VALUES
  (country),
  updated_at = NOW ();

-- ------------------------------------------------------------
-- 3. Paramètres du site
-- ------------------------------------------------------------
INSERT INTO
  settings (id, site_name, created_at, updated_at)
VALUES
  (
    1,
    'Portfolio Pro – MIKIELA CAPY ONNY TYBURS',
    NOW (),
    NOW ()
  ) ON DUPLICATE KEY
UPDATE site_name =
VALUES
  (site_name),
  updated_at = NOW ();

-- ------------------------------------------------------------
-- 4. Compétences
-- ------------------------------------------------------------
INSERT INTO
  skills (
    name,
    category,
    level,
    sort_order,
    created_at,
    updated_at
  )
VALUES
  (
    'Gestion de projet',
    'Compétences',
    3,
    1,
    NOW (),
    NOW ()
  ),
  (
    'Développement Web',
    'Compétences',
    3,
    2,
    NOW (),
    NOW ()
  ),
  (
    'Langages de programmation',
    'Compétences',
    3,
    3,
    NOW (),
    NOW ()
  ),
  ('Design', 'Compétences', 3, 4, NOW (), NOW ()),
  (
    'Tests et qualité du code',
    'Compétences',
    3,
    5,
    NOW (),
    NOW ()
  ),
  (
    'Veille technologique',
    'Compétences',
    3,
    6,
    NOW (),
    NOW ()
  ),
  (
    'Cybersécurité',
    'Compétences',
    3,
    7,
    NOW (),
    NOW ()
  ) ON DUPLICATE KEY
UPDATE category =
VALUES
  (category),
  updated_at = NOW ();

-- ------------------------------------------------------------
-- 5. Formations
-- ------------------------------------------------------------
INSERT INTO
  educations (
    school,
    diploma,
    description,
    start_year,
    end_year,
    created_at,
    updated_at
  )
VALUES
  (
    'INPTIC',
    'Licence 3 en Développement web (en cours)',
    'Licence 3 Génie Informatique – Développement web.',
    2025,
    2026,
    NOW (),
    NOW ()
  ),
  (
    'INPTIC',
    'Diplôme de Technicien Supérieur',
    'Diplôme de Technicien Supérieur (DTS).',
    2024,
    2025,
    NOW (),
    NOW ()
  ),
  (
    'L.R.L / MDA',
    'Baccalauréat B',
    'Baccalauréat série B.',
    2020,
    2021,
    NOW (),
    NOW ()
  );

-- ------------------------------------------------------------
-- 6. Expériences professionnelles
-- ------------------------------------------------------------
INSERT INTO
  experiences (
    company,
    position,
    description,
    start_date,
    end_date,
    current_job,
    created_at,
    updated_at
  )
VALUES
  (
    'Airtel',
    'Technicien Installation Wi-Fi',
    'Installation et configuration de box Wi-Fi chez les particuliers, mise en place des équipements réseau, test et optimisation du signal à l''aide des applications Speedtest by Ookla et G-NetTrack, support technique et assistance aux utilisateurs.',
    '2026-02-15',
    '2026-02-25',
    FALSE,
    NOW (),
    NOW ()
  ),
  (
    'L.G.I.T',
    'Stagiaire en Développeur Web',
    'Réalisation de plusieurs tâches techniques du domaine, incluant le développement front-end, back-end et la résolution de problèmes applicatifs.',
    '2025-08-01',
    '2025-10-31',
    FALSE,
    NOW (),
    NOW ()
  ),
  (
    'Freelance',
    'Entrepreneur Freelance – Commerce d''articles',
    'Vente en ligne et physique, +30% de CA en 1 an via la digitalisation, système de gestion de stocks & commandes.',
    '2022-01-01',
    NULL,
    TRUE,
    NOW (),
    NOW ()
  ),
  (
    'Sobraga',
    'Aide Mécanicien',
    'Maintenance préventive et diagnostic, assistance aux réparations et à l''entretien des machines.',
    '2022-08-01',
    '2022-09-30',
    FALSE,
    NOW (),
    NOW ()
  );

-- ------------------------------------------------------------
-- 7. Catégories de projets
-- ------------------------------------------------------------
INSERT INTO
  categories (name, slug, created_at)
VALUES
  ('Web Application', 'web-application', NOW ()),
  ('Mobile App', 'mobile-app', NOW ()),
  ('API', 'api', NOW ()),
  ('E-Commerce', 'e-commerce', NOW ()),
  ('Dashboard', 'dashboard', NOW ()) ON DUPLICATE KEY
UPDATE name =
VALUES
  (name);

-- ------------------------------------------------------------
-- 8. Technologies
-- ------------------------------------------------------------
INSERT INTO
  technologies (name)
VALUES
  ('JavaScript'),
  ('TypeScript'),
  ('React'),
  ('Node.js'),
  ('Express'),
  ('MySQL'),
  ('PostgreSQL'),
  ('MongoDB'),
  ('Docker'),
  ('Git');

-- ------------------------------------------------------------
-- 9. Projets réalisés
-- ------------------------------------------------------------
INSERT INTO
  projects (
    category_id,
    title,
    slug,
    short_description,
    description,
    featured,
    published,
    project_date,
    sort_order,
    created_at,
    updated_at
  )
VALUES
  (
    (
      SELECT
        id
      FROM
        (
          SELECT
            id
          FROM
            categories
          WHERE
            slug = 'web-application'
        ) AS c1
    ),
    'Gestion académique d''établissement',
    'gestion-academique-etablissement',
    'Application web de gestion académique d''un établissement.',
    'Création d''une application web pour la gestion académique d''un établissement : gestion des étudiants, des notes, des classes et de l''administration scolaire.',
    TRUE,
    TRUE,
    '2025-01-01',
    1,
    NOW (),
    NOW ()
  ),
  (
    (
      SELECT
        id
      FROM
        (
          SELECT
            id
          FROM
            categories
          WHERE
            slug = 'web-application'
        ) AS c2
    ),
    'Cahier de texte en ligne',
    'cahier-de-texte-en-ligne',
    'Application de cahier de texte d''un établissement en ligne.',
    'Développement d''une application de cahier de texte en ligne permettant aux enseignants de saisir et suivre les contenus des cours de façon digitalisée.',
    FALSE,
    TRUE,
    '2025-02-01',
    2,
    NOW (),
    NOW ()
  ),
  (
    (
      SELECT
        id
      FROM
        (
          SELECT
            id
          FROM
            categories
          WHERE
            slug = 'web-application'
        ) AS c3
    ),
    'Gestion des tâches ménagères',
    'gestion-taches-menageres',
    'Application de gestion des tâches ménagères.',
    'Développement d''une application de gestion de tâches ménagères : organisation, planification et suivi des tâches au quotidien.',
    FALSE,
    TRUE,
    '2025-03-01',
    3,
    NOW (),
    NOW ()
  ),
  (
    (
      SELECT
        id
      FROM
        (
          SELECT
            id
          FROM
            categories
          WHERE
            slug = 'e-commerce'
        ) AS c4
    ),
    'Site E-Commerce',
    'site-e-commerce',
    'Développement d''un site d''E-Commerce.',
    'Développement d''un site d''E-Commerce complet : catalogue produits, panier, commandes et gestion du contenu.',
    TRUE,
    TRUE,
    '2025-04-01',
    4,
    NOW (),
    NOW ()
  ),
  (
    (
      SELECT
        id
      FROM
        (
          SELECT
            id
          FROM
            categories
          WHERE
            slug = 'web-application'
        ) AS c5
    ),
    'Application de couture',
    'application-de-couture',
    'Application de gestion pour atelier de couture.',
    'Développement d''une application de couture : suivi des commandes clients, mesures et gestion de production de l''atelier.',
    FALSE,
    TRUE,
    '2025-05-01',
    5,
    NOW (),
    NOW ()
  );

-- ------------------------------------------------------------
-- Note : certifications = "Néant" → rien à insérer.
-- Les tables certifications, services, testimonials, media,
-- contacts, visitors, downloads et logs restent vides et
-- seront remplies via l'interface d'administration.
-- ------------------------------------------------------------