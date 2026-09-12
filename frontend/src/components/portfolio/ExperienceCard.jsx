import { motion } from 'framer-motion';
import { FiMapPin, FiBriefcase } from 'react-icons/fi';
import { formatDateRange } from '@utils/formatters';
import { getInitials, getFileUrl } from '@utils/helpers';

const ExperienceCard = ({ experience, index = 0 }) => {
  const logoUrl = getFileUrl(experience.logo);

  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 }}
      className="card p-6 flex gap-4"
    >
      {/* Logo */}
      <div className="flex-shrink-0">
        <div
          className="w-12 h-12 rounded-xl overflow-hidden flex items-center
                      justify-center font-bold text-white text-sm"
          style={{ background: 'var(--gradient-primary)' }}
        >
          {logoUrl ? (
            <img src={logoUrl} alt={experience.company}
                 className="w-full h-full object-cover" />
          ) : (
            getInitials(experience.company)
          )}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex flex-wrap items-start justify-between gap-2 mb-1">
          <h3 className="font-bold" style={{ color: 'var(--text-primary)' }}>
            {experience.position}
          </h3>
          {experience.current_job === 1 && (
            <span className="badge text-xs">En cours</span>
          )}
        </div>

        <p className="text-sm font-medium mb-2"
           style={{ color: 'var(--color-primary-light)' }}>
          <FiBriefcase className="inline mr-1" size={12} />
          {experience.company}
        </p>

        <div className="flex flex-wrap gap-3 mb-3">
          <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
            {formatDateRange(experience.start_date, experience.end_date, experience.current_job)}
          </span>
          {experience.location && (
            <span className="text-xs flex items-center gap-1"
                  style={{ color: 'var(--text-muted)' }}>
              <FiMapPin size={10} />
              {experience.location}
            </span>
          )}
        </div>

        {experience.description && (
          <p className="text-sm leading-relaxed"
             style={{ color: 'var(--text-secondary)' }}>
            {experience.description}
          </p>
        )}
      </div>
    </motion.div>
  );
};

export default ExperienceCard;