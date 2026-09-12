/**
 * Validate email address
 */
export const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

/**
 * Validate phone number
 */
export const validatePhone = (phone) => {
  const regex = /^[+]?[\d\s\-().]{8,20}$/;
  return regex.test(phone);
};

/**
 * Validate URL
 */
export const validateUrl = (url) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

/**
 * Validate password strength
 */
export const validatePassword = (password) => {
  const errors = [];
  if (password.length < 8) errors.push('Au moins 8 caractères');
  if (!/[A-Z]/.test(password)) errors.push('Au moins une majuscule');
  if (!/[a-z]/.test(password)) errors.push('Au moins une minuscule');
  if (!/[0-9]/.test(password)) errors.push('Au moins un chiffre');
  return errors;
};

/**
 * Validate file type
 */
export const validateFileType = (file, allowedTypes) => {
  return allowedTypes.includes(file.type);
};

/**
 * Validate file size
 */
export const validateFileSize = (file, maxSize) => {
  return file.size <= maxSize;
};

/**
 * Contact form validation
 */
export const validateContactForm = (data) => {
  const errors = {};

  if (!data.fullname || data.fullname.trim().length < 2) {
    errors.fullname = 'Le nom doit contenir au moins 2 caractères';
  }

  if (!data.email || !validateEmail(data.email)) {
    errors.email = 'Adresse email invalide';
  }

  if (!data.subject || data.subject.trim().length < 3) {
    errors.subject = 'Le sujet doit contenir au moins 3 caractères';
  }

  if (!data.message || data.message.trim().length < 10) {
    errors.message = 'Le message doit contenir au moins 10 caractères';
  }

  return errors;
};

/**
 * Login form validation
 */
export const validateLoginForm = (data) => {
  const errors = {};

  if (!data.email || !validateEmail(data.email)) {
    errors.email = 'Adresse email invalide';
  }

  if (!data.password || data.password.length < 6) {
    errors.password = 'Mot de passe requis';
  }

  return errors;
};

/**
 * Project form validation
 */
export const validateProjectForm = (data) => {
  const errors = {};

  if (!data.title || data.title.trim().length < 2) {
    errors.title = 'Le titre est requis';
  }

  if (!data.short_description || data.short_description.trim().length < 10) {
    errors.short_description = 'La description courte est requise';
  }

  return errors;
};

/**
 * Skill form validation
 */
export const validateSkillForm = (data) => {
  const errors = {};

  if (!data.name || data.name.trim().length < 1) {
    errors.name = 'Le nom de la compétence est requis';
  }

  if (!data.level || data.level < 1 || data.level > 5) {
    errors.level = 'Le niveau doit être entre 1 et 5';
  }

  if (!data.category) {
    errors.category = 'La catégorie est requise';
  }

  return errors;
};