import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { useDispatch, useSelector } from 'react-redux';
import {
  FiMail, FiPhone, FiMapPin, FiCalendar,
  FiGlobe, FiGithub, FiLinkedin, FiDownload,
} from 'react-icons/fi';
import { fetchProfile } from '@store/slices/portfolioSlice';
import { formatDate } from '@utils/formatters';
import { UPLOADS_URL, APP_NAME } from '@utils/constants';
import { getInitials, getFileUrl } from '@utils/helpers';
import Loader from '@components/common/Loader';
import Button from '@components/common/Button';

const InfoItem = ({ icon, label, value, href }) => {
  if (!value) return null;
  return (
    <div className="flex items-center gap-3">
      <div
        className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
        style={{ backgroundColor: 'rgba(99, 102, 241, 0.1)', color: 'var(--color-primary-light)' }}
      >
        {icon}
      </div>
      <div className="min-w-0">
        <p className="text-xs mb-0.5" style={{ color: 'var(--text-muted)' }}>{label}</p>
        {href ? (
          <a href={href} target="_blank" rel="noopener noreferrer"
             className="text-sm font-medium truncate hover:text-indigo-400 transition-colors"
             style={{ color: 'var(--text-primary)' }}>
            {value}
          </a>
        ) : (
          <p className="text-sm font-medium truncate"
             style={{ color: 'var(--text-primary)' }}>
            {value}
          </p>
        )}
      </div>
    </div>
  );
};

const About = () => {
  const dispatch = useDispatch();
  const { profile, loading } = useSelector((s) => s.portfolio);

  useEffect(() => {
    if (!profile) dispatch(fetchProfile());
  }, [dispatch, profile]);

  if (loading && !profile) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <Loader size="lg" text="Chargement du profil..." />
      </div>
    );
  }

  if (!profile) return null;

  const avatarUrl = getFileUrl(profile.avatar);

  return (
    <>
      <Helmet>
        <title>À propos – {APP_NAME}</title>
        <meta name="description" content={profile.biography?.slice(0, 160) || ''} />
      </Helmet>

      <div className="pt-20">
        {/* Hero */}
        <section className="section">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-12"
            >
              <h1 className="section-title">À propos de moi</h1>
              <p className="section-subtitle">
                Découvrez mon parcours et ma vision
              </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-start">
              {/* Photo + Infos */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="lg:col-span-2 space-y-6"
              >
                {/* Avatar */}
                <div
                  className="w-48 h-48 mx-auto lg:mx-0 rounded-2xl overflow-hidden
                              ring-4 ring-offset-4"
                  style={{
                    ringColor: 'var(--color-primary)',
                    ringOffsetColor: 'var(--bg-primary)',
                  }}
                >
                  {avatarUrl ? (
                    <img src={avatarUrl} alt={profile.fullname}
                         className="w-full h-full object-cover" />
                  ) : (
                    <div
                      className="w-full h-full flex items-center justify-center
                                  text-5xl font-bold text-white"
                      style={{ background: 'var(--gradient-primary)' }}
                    >
                      {getInitials(profile.fullname)}
                    </div>
                  )}
                </div>

                {/* Personal info */}
                <div className="card p-5 space-y-4">
                  <InfoItem icon={<FiMail size={16} />} label="Email"
                    value={profile.email} href={`mailto:${profile.email}`} />
                  <InfoItem icon={<FiPhone size={16} />} label="Téléphone"
                    value={profile.phone} href={`tel:${profile.phone}`} />
                  <InfoItem icon={<FiMapPin size={16} />} label="Localisation"
                    value={profile.city && profile.country
                      ? `${profile.city}, ${profile.country}` : null} />
                  {profile.birthday && (
                    <InfoItem icon={<FiCalendar size={16} />} label="Date de naissance"
                      value={formatDate(profile.birthday)} />
                  )}
                  {profile.nationality && (
                    <InfoItem icon={<FiGlobe size={16} />} label="Nationalité"
                      value={profile.nationality} />
                  )}
                  {profile.github && (
                    <InfoItem icon={<FiGithub size={16} />} label="GitHub"
                      value="Voir mon GitHub" href={profile.github} />
                  )}
                  {profile.linkedin && (
                    <InfoItem icon={<FiLinkedin size={16} />} label="LinkedIn"
                      value="Voir mon LinkedIn" href={profile.linkedin} />
                  )}
                </div>

                {/* CV Download */}
                {profile.cv && (
                  <Button
                    className="w-full justify-center"
                    icon={<FiDownload size={18} />}
                    onClick={() => window.open(getFileUrl(profile.cv), '_blank')}
                  >
                    Télécharger mon CV
                  </Button>
                )}
              </motion.div>

              {/* Biography */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="lg:col-span-3 space-y-6"
              >
                <div>
                  <h2 className="text-2xl font-bold mb-4"
                      style={{ color: 'var(--text-primary)' }}>
                    Bonjour, je suis{' '}
                    <span className="text-gradient">{profile.fullname}</span>
                  </h2>
                  <p className="text-lg font-medium mb-4"
                     style={{ color: 'var(--color-primary-light)' }}>
                    {profile.profession}
                  </p>
                  {profile.biography && (
                    <div
                      className="prose prose-invert max-w-none text-sm leading-relaxed"
                      style={{ color: 'var(--text-secondary)' }}
                    >
                      {profile.biography.split('\n').map((paragraph, i) => (
                        <p key={i} className="mb-4">{paragraph}</p>
                      ))}
                    </div>
                  )}
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { label: "Années d'exp.", value: profile.years_experience },
                    { label: 'Projets', value: profile.projects_completed },
                    { label: 'Clients', value: profile.clients },
                  ].map((stat, i) => (
                    <div key={stat.label} className="card p-4 text-center">
                      <div className="text-2xl font-bold text-gradient mb-1">
                        {stat.value ?? 0}+
                      </div>
                      <div className="text-xs" style={{ color: 'var(--text-muted)' }}>
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default About;