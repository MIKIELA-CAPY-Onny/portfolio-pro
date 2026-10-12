import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { skillApi } from '@api/skillApi';
import Loader from '@components/common/Loader';
import Input from '@components/common/Input';
import Select from '@components/common/Select';
import Textarea from '@components/common/TextArea';
import Button from '@components/common/Button';
import { SKILL_CATEGORIES, SKILL_LEVELS } from '@utils/constants';
import { extractError } from '@utils/helpers';
import BackLink from '@components/admin/BackLink';

const empty = {
  name: '',
  category: '',
  level: 3,
  description: '',
};

const SkillForm = () => {
  const { id } = useParams();
  const isEdit = !!id;
  const navigate = useNavigate();
  const [form, setForm] = useState(empty);
  const [loading, setLoading] = useState(isEdit);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!isEdit) return;
    skillApi.getById(id)
      .then(({ data }) => setForm({ ...empty, ...(data?.skill || {}) }))
      .catch((err) => toast.error(extractError(err)))
      .finally(() => setLoading(false));
  }, [id, isEdit]);

  const set = (key) => (e) => setForm((prev) => ({ ...prev, [key]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = { ...form, level: Number(form.level) };
      if (isEdit) await skillApi.update(id, payload);
      else await skillApi.create(payload);
      toast.success(isEdit ? 'Compétence mise à jour !' : 'Compétence créée !');
      navigate('/admin/skills');
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
        <BackLink fallback="/admin/skills" label="Retour aux compétences" />
        <h1 className="text-2xl font-bold mt-2" style={{ color: 'var(--text-primary)' }}>
          {isEdit ? 'Modifier la compétence' : 'Nouvelle compétence'}
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="admin-card p-6 space-y-5 max-w-xl">
        <Input label="Nom" value={form.name} onChange={set('name')} required />
        <Select
          label="Catégorie"
          value={form.category}
          onChange={set('category')}
          options={[
            ...SKILL_CATEGORIES.map((c) => ({ value: c, label: c })),
            ...(SKILL_CATEGORIES.includes(form.category) || !form.category
              ? []
              : [{ value: form.category, label: form.category }]),
          ]}
          required
        />
        <Select label="Niveau" value={form.level} onChange={set('level')} options={SKILL_LEVELS} required />
        <Textarea label="Description (optionnel)" value={form.description || ''} onChange={set('description')} />
        <div className="flex justify-end gap-3">
          <Button variant="ghost" type="button" onClick={() => navigate('/admin/skills')}>Annuler</Button>
          <Button type="submit" loading={saving}>{isEdit ? 'Mettre à jour' : 'Créer'}</Button>
        </div>
      </form>
    </motion.div>
  );
};

export default SkillForm;
