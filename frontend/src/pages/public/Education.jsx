import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { FiBook, FiCalendar } from 'react-icons/fi';
import { educationApi } from '@api/educationApi';
import Loader from '@components/common/Loader';
import { APP_NAME } from '@utils/constants';
import { getInitials, getFileUrl } from '@utils/helpers';

const EducationCard = ({ edu, index }) => {
  const logoUrl = getFileUrl(edu.logo);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="card p-6 flex gap-4"
    >
      <div className="flex-shrink-0">
        <div
          className="w-12 h-12 rounded-xl overflow-hidden flex items-center
                      justify-center font-bold text-white text-sm"
          style={{ background: 'var(--gradient-primary)' }}
        >
          {logoUrl
            ? <img src={logoUrl} alt={edu.school} className="w-full h-full object-cover" />
            : <FiBook size={20} />
          }
        </div>
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="font-bold mb-1" style={{ color: 'var(--text-primary)' }}>
          {edu.diploma}
        </h3>
        <p className="text-sm font-medium mb-2"
           style={{ color: 'var(--color-primary-light)' }}>
          {edu.school}
        </p>
        {(edu.start_year || edu.end_year) && (
          <div className="flex items-center gap-1.5 text-xs mb-2"
               style={{ color: 'var(--text-muted)' }}>
            <FiCalendar size={12} />
            {edu.start_year} – {edu.end_year || 'En cours'}
          </div>
        )}
        {edu.description && (
          <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
            {edu.description}
          </p>
        )}
      </div>
    </motion.div>
  );
};

const Education = () => {
  const [educations, setEducations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    educationApi.getAll()
      .then(({ data }) => setEducations(data?.data || data || []))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <Helmet>
        <title>Formations – {APP_NAME}</title>
        <meta name="description" content="Mon parcours académique et mes formations" />
      </Helmet>

      <div className="pt-20">
        <section className="section">
          <div className="container max-w-3xl">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <h1 className="section-title">Formations</h1>
              <p className="section-subtitle">Mon parcours académique</p>
            </motion.div>

            {loading ? (
              <div className="flex justify-center py-20">
                <Loader size="lg" text="Chargement..." />
              </div>
            ) : educations.length === 0 ? (
              <div className="text-center py-20" style={{ color: 'var(--text-muted)' }}>
                Aucune formation disponible
              </div>
            ) : (
              <div className="space-y-4">
                {educations.map((edu, i) => (
                  <EducationCard key={edu.id} edu={edu} index={i} />
                ))}
              </div>
            )}
          </div>
        </section>
      </div>
    </>
  );
};

export default Education;