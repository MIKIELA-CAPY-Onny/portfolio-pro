/**
 * Format a date to a readable string (French)
 */
export const formatDate = (date, options = {}) => {
  if (!date) return '';
  const defaultOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    ...options,
  };
  return new Intl.DateTimeFormat('fr-FR', defaultOptions).format(new Date(date));
};

/**
 * Format date short (e.g. Jan 2024)
 */
export const formatDateShort = (date) => {
  if (!date) return '';
  return new Intl.DateTimeFormat('fr-FR', {
    year: 'numeric',
    month: 'short',
  }).format(new Date(date));
};

/**
 * Format date range
 */
export const formatDateRange = (startDate, endDate, currentJob = false) => {
  const start = formatDateShort(startDate);
  const end = currentJob ? "Aujourd'hui" : endDate ? formatDateShort(endDate) : "Présent";
  return `${start} – ${end}`;
};

/**
 * Format year only
 */
export const formatYear = (date) => {
  if (!date) return '';
  return new Date(date).getFullYear().toString();
};

/**
 * Format relative time (e.g. "il y a 2 jours")
 */
export const formatRelativeTime = (date) => {
  if (!date) return '';
  const now = new Date();
  const past = new Date(date);
  const diffMs = now - past;
  const diffSeconds = Math.floor(diffMs / 1000);
  const diffMinutes = Math.floor(diffSeconds / 60);
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);
  const diffWeeks = Math.floor(diffDays / 7);
  const diffMonths = Math.floor(diffDays / 30);
  const diffYears = Math.floor(diffDays / 365);

  if (diffSeconds < 60) return "À l'instant";
  if (diffMinutes < 60) return `Il y a ${diffMinutes} min`;
  if (diffHours < 24) return `Il y a ${diffHours}h`;
  if (diffDays < 7) return `Il y a ${diffDays} jour${diffDays > 1 ? 's' : ''}`;
  if (diffWeeks < 4) return `Il y a ${diffWeeks} semaine${diffWeeks > 1 ? 's' : ''}`;
  if (diffMonths < 12) return `Il y a ${diffMonths} mois`;
  return `Il y a ${diffYears} an${diffYears > 1 ? 's' : ''}`;
};

/**
 * Format number with K/M suffix
 */
export const formatNumber = (num) => {
  if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
  if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
  return num.toString();
};

/**
 * Format skill level to percentage
 */
export const levelToPercent = (level) => {
  return (level / 5) * 100;
};

/**
 * Format phone number
 */
export const formatPhone = (phone) => {
  if (!phone) return '';
  return phone.replace(/(\d{2})(?=\d)/g, '$1 ').trim();
};

/**
 * Format currency
 */
export const formatCurrency = (amount, currency = 'EUR') => {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency,
  }).format(amount);
};

/**
 * Capitalize first letter
 */
export const capitalize = (str) => {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

/**
 * Format list to readable string
 */
export const formatList = (items, separator = ', ') => {
  if (!items || items.length === 0) return '';
  return items.join(separator);
};