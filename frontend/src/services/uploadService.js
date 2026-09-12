import { FILE_TYPES, MAX_FILE_SIZE } from '@utils/constants';
import { validateFileType, validateFileSize } from '@utils/validators';
import { formatFileSize } from '@utils/helpers';

const uploadService = {
  validateImage: (file) => {
    const errors = [];
    if (!validateFileType(file, FILE_TYPES.IMAGE)) {
      errors.push('Format non supporté. Utilisez JPG, PNG, GIF, WebP ou SVG');
    }
    if (!validateFileSize(file, MAX_FILE_SIZE)) {
      errors.push(`La taille maximale est de ${formatFileSize(MAX_FILE_SIZE)}`);
    }
    return errors;
  },

  validatePDF: (file) => {
    const errors = [];
    if (!validateFileType(file, FILE_TYPES.PDF)) {
      errors.push('Seuls les fichiers PDF sont acceptés');
    }
    if (!validateFileSize(file, MAX_FILE_SIZE)) {
      errors.push(`La taille maximale est de ${formatFileSize(MAX_FILE_SIZE)}`);
    }
    return errors;
  },

  createPreview: (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  },

  createObjectUrl: (file) => URL.createObjectURL(file),

  revokeObjectUrl: (url) => URL.revokeObjectURL(url),
};

export default uploadService;