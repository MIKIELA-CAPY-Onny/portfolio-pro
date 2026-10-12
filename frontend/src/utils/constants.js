export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
export const UPLOADS_URL = import.meta.env.VITE_UPLOADS_URL || 'http://localhost:5000/uploads';
export const APP_NAME = import.meta.env.VITE_APP_NAME || 'Portfolio Pro';

export const GITHUB_URL = 'https://github.com/MIKIELA-CAPY-Onny';
export const CONTACT_EMAIL = 'mikielaonny9@gmail.com';

export const TOKEN_KEY = 'portfolio_token';
export const ADMIN_KEY = 'portfolio_admin';

export const ROLES = {
  ADMIN: 'ADMIN',
};

export const SKILL_CATEGORIES = [
  'Langages',
  'Frameworks',
  'Bases de données',
  'Outils',
  'DevOps',
  'Design',
  'Autres',
];

export const SKILL_LEVELS = [
  { value: 1, label: 'Débutant' },
  { value: 2, label: 'Élémentaire' },
  { value: 3, label: 'Intermédiaire' },
  { value: 4, label: 'Avancé' },
  { value: 5, label: 'Expert' },
];

export const PROJECT_STATUSES = [
  { value: 1, label: 'Publié' },
  { value: 0, label: 'Brouillon' },
];

export const NAV_LINKS = [
  { label: 'Accueil', path: '/' },
  { label: 'À propos', path: '/about' },
  { label: 'Compétences', path: '/skills' },
  { label: 'Projets', path: '/projects' },
  { label: 'Expériences', path: '/experiences' },
  { label: 'Formations', path: '/education' },
  { label: 'Services', path: '/services' },
  { label: 'Certifications', path: '/certifications' },
  { label: 'Contact', path: '/contact' },
];

export const ADMIN_NAV = [
  { label: 'Dashboard', path: '/admin', icon: 'dashboard' },
  { label: 'Profil', path: '/admin/profile', icon: 'profile' },
  { label: 'Projets', path: '/admin/projects', icon: 'projects' },
  { label: 'Compétences', path: '/admin/skills', icon: 'skills' },
  { label: 'Expériences', path: '/admin/experiences', icon: 'experiences' },
  { label: 'Formations', path: '/admin/educations', icon: 'education' },
  { label: 'Certifications', path: '/admin/certifications', icon: 'certifications' },
  { label: 'Services', path: '/admin/services', icon: 'services' },
  { label: 'Messages', path: '/admin/contacts', icon: 'contacts' },
  { label: 'Médias', path: '/admin/media', icon: 'media' },
  { label: 'Paramètres', path: '/admin/settings', icon: 'settings' },
];

export const PAGINATION_LIMIT = 10;

export const FILE_TYPES = {
  IMAGE: ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml'],
  PDF: ['application/pdf'],
  DOCUMENT: ['application/pdf', 'application/msword'],
};

export const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

export const ANIMATION_VARIANTS = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -30 },
};