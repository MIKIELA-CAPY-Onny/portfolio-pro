import { useCallback, useState } from 'react';
import uploadService from '@services/uploadService';
import { extractError } from '@utils/helpers';

const useUpload = () => {
  const [preview, setPreview] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleImageSelect = useCallback(async (file) => {
    const errors = uploadService.validateImage(file);
    if (errors.length > 0) {
      setUploadError(errors[0]);
      return { success: false, error: errors[0] };
    }

    try {
      const previewUrl = await uploadService.createPreview(file);
      setPreview(previewUrl);
      setUploadError(null);
      return { success: true, file, preview: previewUrl };
    } catch (err) {
      const message = extractError(err);
      setUploadError(message);
      return { success: false, error: message };
    }
  }, []);

  const handlePDFSelect = useCallback((file) => {
    const errors = uploadService.validatePDF(file);
    if (errors.length > 0) {
      setUploadError(errors[0]);
      return { success: false, error: errors[0] };
    }
    setUploadError(null);
    return { success: true, file };
  }, []);

  const clearPreview = useCallback(() => {
    if (preview) uploadService.revokeObjectUrl(preview);
    setPreview(null);
    setUploadError(null);
    setUploadProgress(0);
  }, [preview]);

  return {
    preview,
    uploading,
    uploadError,
    uploadProgress,
    setUploading,
    setUploadProgress,
    handleImageSelect,
    handlePDFSelect,
    clearPreview,
    setPreview,
    setUploadError,
  };
};

export default useUpload;