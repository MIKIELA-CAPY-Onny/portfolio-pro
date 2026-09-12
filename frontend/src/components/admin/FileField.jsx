import { useRef, useState } from 'react';
import { FiUpload, FiX } from 'react-icons/fi';
import { mediaApi } from '@api/mediaApi';
import { extractError, getFileUrl } from '@utils/helpers';
import toast from 'react-hot-toast';

/**
 * Champ fichier : televerse vers la mediatheque (/admin/media)
 * et retourne le chemin public via onChange(path).
 */
const FileField = ({ label, accept = 'image/*', value, onChange, hint }) => {
  const inputRef = useRef(null);
  const [uploading, setUploading] = useState(false);

  const handleSelect = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const { data } = await mediaApi.upload(file);
      onChange(data.media?.path || null);
      toast.success('Fichier televerse');
    } catch (error) {
      toast.error(extractError(error));
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = '';
    }
  };

  const fullUrl = getFileUrl(value);

  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--text-secondary)' }}>
          {label}
        </label>
      )}
      <div className="flex items-center gap-3">
        {fullUrl && (
          <div
            className="w-14 h-14 rounded-xl overflow-hidden flex-shrink-0 flex items-center justify-center"
            style={{ backgroundColor: 'var(--input)', border: '1px solid var(--border-color)' }}
          >
            {accept.includes('image') ? (
              <img src={fullUrl} alt="apercu" className="w-full h-full object-cover" />
            ) : (
              <span className="text-xs" style={{ color: 'var(--gold)' }}>PDF</span>
            )}
          </div>
        )}
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          onChange={handleSelect}
          disabled={uploading}
          className="hidden"
          id={`file-${label || 'input'}`}
        />
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all disabled:opacity-50"
          style={{
            border: '1px solid var(--border-color)',
            color: 'var(--text-secondary)',
            backgroundColor: 'var(--input)',
          }}
        >
          <FiUpload size={14} />
          {uploading ? 'Televersement...' : value ? 'Remplacer' : 'Choisir un fichier'}
        </button>
        {value && (
          <button
            type="button"
            onClick={() => onChange(null)}
            className="p-2 rounded-lg transition-all hover:bg-white/10"
            style={{ color: 'var(--destructive)' }}
            aria-label="Retirer le fichier"
          >
            <FiX size={16} />
          </button>
        )}
      </div>
      {hint && !value && (
        <p className="mt-1.5 text-xs" style={{ color: 'var(--text-muted)' }}>{hint}</p>
      )}
    </div>
  );
};

export default FileField;
