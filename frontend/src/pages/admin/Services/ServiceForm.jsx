import { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { serviceApi } from '@api/serviceApi';
import Loader from '@components/common/Loader';
import Input from '@components/common/Input';
import Textarea from '@components/common/TextArea';
import Button from '@components/common/Button';
import { extractError } from '@utils/helpers';

const empty = {
  title: '',
  description: '',
  icon: '',
  price: '',
  active: true,
};

const ServiceForm = () => {
  const { id } = useParams();
  const isEdit = !!id;
  const navigate = useNavigate();
  const [form, setForm] = useState(empty);
  const [icon, setIcon] = useState(null);
  const [loading, setLoading] = useState(isEdit);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!isEdit) return;
    serviceApi.getById(id)
      .then(({ data }) => setForm({ ...empty, ...(data?.service || {}) }))
      .catch((err) => toast.error(extractError(err)))
      .finally(() => setLoading(false));
  }, [id, isEdit]);

  const set = (key) => (e) =>
    setForm((prev) => ({
      ...prev,
      [key]: e.target.type === 'checkbox' ? e.target.checked : e.target.value,
    }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const formData = new FormData();
      formData.append('title', form.title || '');
      formData.append('description', form.description || '');
      formData.append('price', form.price || '');
      formData.append('active', form.active ? '1' : '0');
      if (icon) formData.append('file', icon);

      if (isEdit) await serviceApi.update(id, formData);
      else await serviceApi.create(formData);
      toast.success(isEdit ? 'Service mis à jour !' : 'Service créé !');
      navigate('/admin/services');
    } catch (err) {
      toast.error(extractError(err));
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <Loader size="lg" text="Chargement..." />
      </div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      <div className="mb-6">
        <Link to="/admin/services" className="text-xs" style={{ color: 'var(--text-muted)' }}>
          &larr; Retour aux services
        </Link>
        <h1 className="text-2xl font-bold mt-2" style={{ color: 'var(--text-primary)' }}>
          {isEdit ? 'Modifier le service' : 'Nouveau service'}
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="admin-card p-6 space-y-5 max-w-xl">
        <Input label="Titre" value={form.title} onChange={set('title')} required />
        <Textarea label="Description" value={form.description || ''} onChange={set('description')} />
        <Input label="Prix (optionnel)" value={form.price || ''} onChange={set('price')} hint="Ex : À partir de 150 000 FCFA" />
        <div>
          <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--text-secondary)' }}>
            Icône (image, optionnel)
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setIcon(e.target.files?.[0] || null)}
            className="input-field"
          />
        </div>
        <label className="flex items-center gap-3 text-sm cursor-pointer" style={{ color: 'var(--text-secondary)' }}>
          <input
            type="checkbox"
            checked={!!form.active}
            onChange={set('active')}
            className="w-4 h-4 accent-indigo-500"
          />
          Service actif (visible sur le site public)
        </label>
        <div className="flex justify-end gap-3">
          <Button variant="ghost" onClick={() => navigate('/admin/services')}>Annuler</Button>
          <Button type="submit" loading={saving}>{isEdit ? 'Mettre à jour' : 'Créer'}</Button>
        </div>
      </form>
    </motion.div>
  );
};

export default ServiceForm;
