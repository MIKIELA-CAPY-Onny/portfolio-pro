import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { experienceApi } from '@api/experienceApi';
import ExperienceCard from '@components/portfolio/ExperienceCard';
import Timeline from '@components/portfolio/Timeline';
import Loader from '@components/common/Loader';
import { APP_NAME } from '@utils/constants';

const Experiences = () => {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    experienceApi.getAll()
      .then(({ data }) => setExperiences(data?.data || data || []))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <Helmet>
        <title>Expériences – {APP_NAME}</title>
        <meta name="description" content="Mon parcours professionnel" />
      </Helmet>

      <div className="pt-20">
        <section className="section">
          <div className="container max-w-3xl">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <h1 className="section-title">Expériences professionnelles</h1>
              <p className="section-subtitle">
                Mon parcours et mes expériences
              </p>
            </motion.div>

            {loading ? (
              <div className="flex justify-center py-20">
                <Loader size="lg" text="Chargement..." />
              </div>
            ) : experiences.length === 0 ? (
              <div className="text-center py-20" style={{ color: 'var(--text-muted)' }}>
                Aucune expérience disponible
              </div>
            ) : (
              <Timeline
                items={experiences}
                renderItem={(exp, i) => (
                  <ExperienceCard experience={exp} index={i} />
                )}
              />
            )}
          </div>
        </section>
      </div>
    </>
  );
};

export default Experiences;