import {
  useEffect,
  useState
} from 'react';
import {
  motion
} from 'framer-motion';
import toast from 'react-hot-toast';
import {
  profileApi
} from '@api/profileApi';
import Loader from '@components/common/Loader';
import Input from '@components/common/Input';
import Textarea from '@components/common/TextArea';
import Button from '@components/common/Button';
import FileField from '@components/admin/FileField';
import {
  extractError,
  getFileUrl
} from '@utils/helpers';

const ProfileForm = () => {
  const [form, setForm] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    profileApi
      .get()
      .then(({ data }) => setForm(data?.profile || {}))
      .catch((err) => toast.error(extractError(err)))
      .finally(() => setLoading(false));
  }, []);

  const set = (key) => (e) => setForm((p) => ({ ...p, [key]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await profileApi.update(form);
      toast.success('Profil mis à jour !');
    } catch (err) {
      toast.error(extractError(err));
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <Loader size="lg" text="Chargement du profil..." />
      </div>
    );
  }
  if (!form) return null;

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      <h1 className="text-2xl font-bold mb-6" style={{ color: 'var(--text-primary)' }}>
        Profil
      </h1>

      <form onSubmit={handleSubmit} className="admin-card p-6 space-y-5 max-w-2xl">
        <Input label="Nom complet" value={form.fullname || ''} onChange={set('fullname')} required />
        <Input label="Titre / Poste" value={form.profession || ''} onChange={set('profession')} />
        <Input label="Slogan" value={form.slogan || ''} onChange={set('slogan')} />
        <Textarea label="Bio" rows={5} value={form.biography || ''} onChange={set('biography')} />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <Input label="Email" type="email" value={form.email || ''} onChange={set('email')} />
          <Input label="Téléphone" value={form.phone || ''} onChange={set('phone')} />
          <Input label="Ville" value={form.city || ''} onChange={set('city')} />
          <Input label="Pays" value={form.country || ''} onChange={set('country')} />
          <Input label="Années d'expérience" type="number" value={form.years_experience ?? ''} onChange={set('years_experience')} />
          <Input label="Projets réalisés" type="number" value={form.projects_completed ?? ''} onChange={set('projects_completed')} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <Input label="GitHub" value={form.github || ''} onChange={set('github')} />
          <Input label="LinkedIn" value={form.linkedin || ''} onChange={set('linkedin')} />
        </div>

        <FileField
          label="Photo de profil"
          accept="image/*"
          value={form.avatar || null}
          onChange={(path) => setForm((p) => ({ ...p, avatar: path }))}
        />

        {/* Section CV */}
        <div className="border-t pt-5" style={{ borderColor: 'var(--border-color)' }}>
          <h2
            className="text-sm font-semibold uppercase tracking-wide mb-3"
            style={{ color: 'var(--text-muted)' }}
          >
            Curriculum Vitae
          </h2>
          <FileField
            label="CV (PDF ou image)"
            accept="application/pdf,image/*"
            value={form.cv || null}
            onChange={(path) => setForm((p) => ({ ...p, cv: path }))}
            hint="Ce CV sera téléchargeable depuis la page d'accueil et la page À propos."
          />
          {form.cv && (
            <a
              href={getFileUrl(form.cv)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-2 text-sm underline"
              style={{ color: 'var(--color-primary-light)' }}
            >
              Voir le CV actuel
            </a>
          )}
        </div>

        <div className="flex justify-end">
          <Button type="submit" loading={saving}>
            Enregistrer
          </Button>
        </div>
      </form>
    </motion.div>
  );
};

export default ProfileForm;