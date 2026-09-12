import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { FiAward, FiCalendar, FiDownload, FiEye } from 'react-icons/fi';
import { certificationApi } from '@api/certificationApi';
import Loader from '@components/common/Loader';
import { formatDateShort } from '@utils/formatters';
import { UPLOADS_URL, APP_NAME } from '@utils/constants';

const CertificationCard = ({ cert, index }) => {
  const imageUrl = cert.image ? `${UPLOADS_URL}/${cert.image}` : null;
  const pdfUrl = cert.pdf ? `${UPLOADS_URL}/${cert.pdf}` : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08 }}
      className="card overflow-hidden"
    >
      {/* Thumbnail */}
      <div
        className="h-40 overflow-hidden flex items-center justify-center"
        style={{ backgroundColor: 'var(--bg-tertiary)' }}
      >
        {imageUrl ? (
          <img src={imageUrl} alt={cert.title}
               className="w-full h-full object-cover" loading="lazy" />
        ) : (
          <FiAward size={48} style={{ color: 'var(--color-primary-light)', opacity: 0.5 }} />
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-bold text-sm mb-1"
            style={{ color: 'var(--text-primary)' }}>
          {cert.title}
        </h3>
        <p className="text-xs mb-2" style={{ color: 'var(--color-primary-light)' }}>
          {cert.organization}
        </p>
        {cert.issue_date && (
          <div className="flex items-center gap-1.5 text-xs mb-3"
               style={{ color: 'var(--text-muted)' }}>
            <FiCalendar size={11} />
            {formatDateShort(cert.issue_date)}
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-2">
          {imageUrl && (
            <a
              href={imageUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs
                         font-medium transition-all hover:opacity-80"
              style={{ backgroundColor: 'rgba(99,102,241,0.1)', color: 'var(--color-primary-light)' }}
            >
              <FiEye size={12} />
              Voir
            </a>
          )}
          {pdfUrl && (
            <a
              href={pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs
                         font-medium transition-all hover:opacity-80"
              style={{ backgroundColor: 'rgba(99,102,241,0.1)', color: 'var(--color-primary-light)' }}
            >
              <FiDownload size={12} />
              PDF
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const Certifications = () => {
  const [certifications, setCertifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    certificationApi.getAll()
      .then(({ data }) => setCertifications(data?.certifications || data?.data || data || []))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <Helmet>
        <title>Certifications – {APP_NAME}</title>
        <meta name="description" content="Mes certifications professionnelles" />
      </Helmet>

      <div className="pt-20">
        <section className="section">
          <div className="container">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <h1 className="section-title">Certifications</h1>
              <p className="section-subtitle">
                Mes certifications et diplômes professionnels
              </p>
            </motion.div>

            {loading ? (
              <div className="flex justify-center py-20">
                <Loader size="lg" text="Chargement..." />
              </div>
            ) : certifications.length === 0 ? (
              <div className="text-center py-20" style={{ color: 'var(--text-muted)' }}>
                Aucune certification disponible
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                {certifications.map((cert, i) => (
                  <CertificationCard key={cert.id} cert={cert} index={i} />
                ))}
              </div>
            )}
          </div>
        </section>
      </div>
    </>
  );
};

export default Certifications;
