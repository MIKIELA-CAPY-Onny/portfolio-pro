import { UPLOADS_URL } from './constants';

/**
 * Normalize an uploaded file path:
 * - absolute URLs are returned as-is
 * - strips leading slashes and any 'uploads/' prefix so it joins with UPLOADS_URL
 */
export const normalizeUploadPath = (path) => {
  if (!path) return null;
  if (/^https?:\/\//.test(path)) return path;
  return String(path)
    .replace(/\\/g, '/')
    .replace(/^\/+/, '')
    .replace(/^uploads\//, '');
};

/**
 * Build a full URL for an uploaded file
 */
export const getFileUrl = (path) => {
  if (!path) return null;
  const normalized = normalizeUploadPath(path);
  if (/^https?:\/\//.test(normalized)) return normalized;
  return `${UPLOADS_URL}/${normalized}`;
};

/**
 * Generate a slug from a string
 */
export const generateSlug = (text) => {
  return text
    .toString()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

/**
 * Truncate a string to a given length
 */
export const truncate = (str, length = 100) => {
  if (!str) return '';
  return str.length > length ? str.substring(0, length) + '...' : str;
};

/**
 * Get initials from a full name
 */
export const getInitials = (name) => {
  if (!name) return '';
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
};

/**
 * Deep clone an object
 */
export const deepClone = (obj) => {
  return JSON.parse(JSON.stringify(obj));
};

/**
 * Debounce a function
 */
export const debounce = (fn, delay = 300) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
};

/**
 * Check if value is empty
 */
export const isEmpty = (value) => {
  if (value === null || value === undefined) return true;
  if (typeof value === 'string') return value.trim() === '';
  if (Array.isArray(value)) return value.length === 0;
  if (typeof value === 'object') return Object.keys(value).length === 0;
  return false;
};

/**
 * Get skill level label
 */
export const getSkillLevelLabel = (level) => {
  const labels = {
    1: 'Débutant',
    2: 'Élémentaire',
    3: 'Intermédiaire',
    4: 'Avancé',
    5: 'Expert',
  };
  return labels[level] || 'Inconnu';
};

/**
 * Calculate years of experience from a start date
 */
export const calcYearsExperience = (startDate) => {
  const start = new Date(startDate);
  const now = new Date();
  return Math.floor((now - start) / (1000 * 60 * 60 * 24 * 365));
};

/**
 * Sort array by a key
 */
export const sortBy = (arr, key, direction = 'asc') => {
  return [...arr].sort((a, b) => {
    if (direction === 'asc') return a[key] > b[key] ? 1 : -1;
    return a[key] < b[key] ? 1 : -1;
  });
};

/**
 * Group array of objects by a key
 */
export const groupBy = (arr, key) => {
  return arr.reduce((acc, item) => {
    const group = item[key] || 'Autres';
    if (!acc[group]) acc[group] = [];
    acc[group].push(item);
    return acc;
  }, {});
};

/**
 * Convert file size to human readable
 */
export const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

/**
 * Extract error message from axios error
 */
export const extractError = (error) => {
  return (
    error?.response?.data?.message ||
    error?.response?.data?.error ||
    error?.message ||
    'Une erreur est survenue'
  );
};

/**
 * Check if current path is active
 */
export const isActivePath = (path, currentPath) => {
  if (path === '/') return currentPath === '/';
  return currentPath.startsWith(path);
};