import {
  useEffect,
  useState
} from 'react';
import {
  useNavigate
} from 'react-router-dom';
import {
  motion
} from 'framer-motion';
import toast from 'react-hot-toast';
import {
  profileApi
} from '@api/profileApi';
import Loader from '@components/common/Loader';
import Button from '@components/common/Button';
import { extractError, getFileUrl } from '@utils/helpers';

const ProfileList = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    profileApi
      .get()
      .then(({ data }) => setProfile(data?.profile || {}))
      .catch((err) => toast.error(extractError(err)))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <Loader size="lg" text="Chargement..." />
      </div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>
          Profil
        </h1>
        <Button onClick={() => navigate('/admin/profile/edit')}>Modifier</Button>
      </div>

      <div className="admin-card p-6 max-w-2xl space-y-3">
        <Row label="Nom complet" value={profile?.fullname} />
        <Row label="Titre" value={profile?.profession} />
        <Row label="Email" value={profile?.email} />
        <Row label="Téléphone" value={profile?.phone} />
        <Row label="Ville" value={profile?.city} />
        <Row label="Pays" value={profile?.country} />

        {profile?.biography && (
          <div>
            <p className="text-xs mb-1" style={{ color: 'var(--text-muted)' }}>Bio</p>
            <p className="text-sm" style={{ color: 'var(--text-primary)' }}>
              {profile.biography}
            </p>
          </div>
        )}

        {profile?.cv && (
          <div>
            <p className="text-xs mb-1" style={{ color: 'var(--text-muted)' }}>CV</p>
            <a
              href={getFileUrl(profile.cv)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block text-sm underline"
              style={{ color: 'var(--color-primary-light)' }}
            >
              Voir le CV
            </a>
          </div>
        )}
      </div>
    </motion.div>
  );
};

const Row = ({ label, value }) => (
  <div className="flex items-start justify-between gap-4">
    <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
      {label}
    </span>
    <span className="text-sm text-right" style={{ color: 'var(--text-primary)' }}>
      {value || '—'}
    </span>
  </div>
);

export default ProfileList;