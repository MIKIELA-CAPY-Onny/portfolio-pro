import { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { experienceApi } from '@api/experienceApi';
import Loader from '@components/common/Loader';
import Input from '@components/common/Input';
import Textarea from '@components/common/TextArea';
import Button from '@components/common/Button';
import { extractError } from '@utils/helpers';

const empty = {
  company: '',
  position: '',
  description: '',
  location: '',
  start_date: '',
  end_date: '',
  current_job: false,
};

const ExperienceForm = () => {
  const { id } = useParams();
  const isEdit = !!id;
  const navigate = useNavigate();
  const [form, setForm] = useState(empty);
  const [loading, setLoading] = useState(isEdit);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!isEdit) return;
    experienceApi.getById(id)
      .then(({ data }) => setForm({ ...empty, ...(data?.experience || {}) }))
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
      const payload = { ...form };
      if (payload.current_job) payload.end_date = null;
      if (isEdit) await experienceApi.update(id, payload);
      else await experienceApi.create(payload);
      toast.success(isEdit ? 'Expérience mise à jour !' : 'Expérience créée !');
      navigate('/admin/experiences');
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
        <Link to="/admin/experiences" className="text-xs" style={{ color: 'var(--text-muted)' }}>
          &larr; Retour aux expériences
        </Link>
        <h1 className="text-2xl font-bold mt-2" style={{ color: 'var(--text-primary)' }}>
          {isEdit ? "Modifier l'expérience" : 'Nouvelle expérience'}
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="admin-card p-6 space-y-5 max-w-xl">
        <Input label="Entreprise" value={form.company} onChange={set('company')} required />
        <Input label="Poste" value={form.position} onChange={set('position')} required />
        <Input label="Lieu (optionnel)" value={form.location || ''} onChange={set('location')} />
        <Textarea label="Description" value={form.description || ''} onChange={set('description')} />
        <div className="grid grid-cols-2 gap-4">
          <Input label="Date de début" type="date" value={form.start_date || ''} onChange={set('start_date')} required />
          <Input
            label="Date de fin"
            type="date"
            value={form.end_date || ''}
            onChange={set('end_date')}
            disabled={form.current_job}
          />
        </div>
        <label className="flex items-center gap-3 text-sm cursor-pointer" style={{ color: 'var(--text-secondary)' }}>
          <input
            type="checkbox"
            checked={!!form.current_job}
            onChange={set('current_job')}
            className="w-4 h-4 accent-indigo-500"
          />
          Poste actuel
        </label>
        <div className="flex justify-end gap-3">
          <Button variant="ghost" onClick={() => navigate('/admin/experiences')}>Annuler</Button>
          <Button type="submit" loading={saving}>{isEdit ? 'Mettre à jour' : 'Créer'}</Button>
        </div>
      </form>
    </motion.div>
  );
};

export default ExperienceForm;
