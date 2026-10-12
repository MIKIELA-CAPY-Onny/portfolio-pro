import { motion } from 'framer-motion';
import { FiMail, FiGithub, FiLinkedin } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import Button from '@components/common/Button';
import CvDownload from '@components/portfolio/CvDownload';
import { getFileUrl, getInitials } from '@utils/helpers';

const ProfileCard = ({ profile }) => {
  if (!profile) return null;

  const avatarUrl = getFileUrl(profile.avatar);

  return (
    <div className="flex flex-col items-center text-center">
      {/* Avatar */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative mb-6"
      >
        <div
          className="w-40 h-40 md:w-48 md:h-48 rounded-full overflow-hidden
                      ring-4 ring-offset-4 animate-pulse-glow"
          style={{
            ringColor: 'var(--color-primary)',
            ringOffsetColor: 'var(--bg-primary)',
          }}
        >
          {avatarUrl ? (
            <img
              src={avatarUrl}
              alt={profile.fullname}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          ) : (
            <div
              className="w-full h-full flex items-center justify-center text-4xl font-bold text-white"
              style={{ background: 'var(--gradient-primary)' }}
            >
              {getInitials(profile.fullname)}
            </div>
          )}
        </div>
        {/* Status dot */}
        <div
          className="absolute bottom-2 right-2 w-5 h-5 rounded-full
                      bg-emerald-400 border-2 border-white"
        />
      </motion.div>

      {/* Info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h1 className="text-3xl md:text-4xl font-bold mb-2"
            style={{ color: 'var(--text-primary)' }}>
          {profile.fullname}
        </h1>
        <p className="text-lg md:text-xl font-medium mb-2 text-gradient">
          {profile.profession}
        </p>
        {profile.slogan && (
          <p className="text-base mb-6" style={{ color: 'var(--text-muted)' }}>
            {profile.slogan}
          </p>
        )}
      </motion.div>

      {/* Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="flex flex-wrap items-center justify-center gap-3 mb-6"
      >
        {profile.cv && <CvDownload cv={profile.cv} label={`CV de ${profile.fullname}`} />}
        <Link to="/contact">
          <Button variant="outline" icon={<FiMail size={18} />}>
            Me contacter
          </Button>
        </Link>
      </motion.div>

      {/* Social Links */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="flex items-center gap-3"
      >
        {profile.github && (
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-xl flex items-center justify-center
                       transition-all hover:scale-110 hover:text-white"
            style={{
              backgroundColor: 'var(--bg-tertiary)',
              color: 'var(--text-secondary)',
            }}
          >
            <FiGithub size={20} />
          </a>
        )}
        {profile.linkedin && (
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-xl flex items-center justify-center
                       transition-all hover:scale-110 hover:text-blue-400"
            style={{
              backgroundColor: 'var(--bg-tertiary)',
              color: 'var(--text-secondary)',
            }}
          >
            <FiLinkedin size={20} />
          </a>
        )}
      </motion.div>
    </div>
  );
};

export default ProfileCard;