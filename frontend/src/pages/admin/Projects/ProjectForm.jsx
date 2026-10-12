import {
  useEffect,
  useState
} from 'react';
import {
  useNavigate,
  useParams
} from 'react-router-dom';
import {
  motion
} from 'framer-motion';
import toast from 'react-hot-toast';
import Loader from '@components/common/Loader';
import {
  projectApi
} from '@api/projectApi';
import Input from '@components/common/Input';
import Textarea from '@components/common/TextArea';
import Button from '@components/common/Button';
import FileField from '@components/admin/FileField';
import {
  extractError
} from '@utils/helpers';
import BackLink from '@components/admin/BackLink';

const empty = {
  title: '',
  slug: '',
  short_description: '',
  description: '',
  cover_image: null,
  demo_url: '',
  github_url: ''
};

const ProjectForm = () => {
  const { id } = useParams();
  const isEdit = !!id;
  const navigate = useNavigate();
  const [form, setForm] = useState(empty);
  const [loading, setLoading] = useState(isEdit);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!isEdit) return;
    projectApi
      .getById(id)
      .then(({ data }) => setForm({ ...empty, ...(data?.project || {}) }))
      .catch((err) => toast.error(extractError(err)))
      .finally(() => setLoading(false));
  }, [id, isEdit]);

  const set = (key) => (e) => setForm((p) => ({ ...p, [key]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (isEdit) await projectApi.update(id, form);
      else await projectApi.create(form);
      toast.success(isEdit ? 'Projet mis à jour !' : 'Projet créé !');
      navigate('/admin/projects');
    } catch (err) {
      toast.error(extractError(err));
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <Loader size="lg" text="Chargement du projet..." />
      </div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      <div className="mb-6">
        <BackLink fallback="/admin/projects" label="Retour aux projets" />
        <h1 className="text-2xl font-bold mt-2" style={{ color: 'var(--text-primary)' }}>
          {isEdit ? 'Modifier le projet' : 'Nouveau projet'}
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="admin-card p-6 space-y-5 max-w-2xl">
        <Input label="Titre" value={form.title || ''} onChange={set('title')} required />
        <Input
          label="Slug"
          value={form.slug || ''}
          onChange={set('slug')}
          hint="Laissez vide pour générer automatiquement"
        />
        <Textarea
          label="Description courte"
          value={form.short_description || ''}
          onChange={set('short_description')}
        />
        <Textarea
          label="Description"
          value={form.description || ''}
          onChange={set('description')}
        />
        <FileField
          label="Image de couverture"
          value={form.cover_image || null}
          onChange={(path) => setForm((p) => ({ ...p, cover_image: path }))}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <Input label="Lien démo" type="url" value={form.demo_url || ''} onChange={set('demo_url')} />
          <Input label="Lien GitHub" type="url" value={form.github_url || ''} onChange={set('github_url')} />
        </div>

        <div className="flex items-center justify-between gap-3">
          <label className="flex items-center gap-2 text-sm" style={{ color: 'var(--text-secondary)' }}>
            <input
              type="checkbox"
              checked={!!form.featured}
              onChange={(e) => setForm((p) => ({ ...p, featured: e.target.checked }))}
            />
            Mettre en avant sur l'accueil
          </label>
          <label className="flex items-center gap-2 text-sm" style={{ color: 'var(--text-secondary)' }}>
            <input
              type="checkbox"
              checked={form.published !== false}
              onChange={(e) => setForm((p) => ({ ...p, published: e.target.checked }))}
            />
            Publié (visible côté public)
          </label>
        </div>

        <div className="flex justify-end gap-3">
          <Button variant="ghost" type="button" onClick={() => navigate('/admin/projects')}>
            Annuler
          </Button>
          <Button type="submit" loading={saving}>
            {isEdit ? 'Mettre à jour' : 'Créer'}
          </Button>
        </div>
      </form>
    </motion.div>
  );
};

export default ProjectForm;