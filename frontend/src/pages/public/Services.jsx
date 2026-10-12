import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { serviceApi } from '@api/serviceApi';
import ServiceCard from '@components/portfolio/ServiceCard';
import Loader from '@components/common/Loader';
import { APP_NAME } from '@utils/constants';

const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    serviceApi.getAll({ active: 1 })
      .then(({ data }) => setServices(data?.services || []))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <Helmet>
        <title>Services – {APP_NAME}</title>
        <meta name="description" content="Mes services professionnels" />
      </Helmet>

      <div className="pt-20">
        <section className="section">
          <div className="container">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <h1 className="section-title">Mes services</h1>
              <p className="section-subtitle">
                Ce que je peux faire pour vous
              </p>
            </motion.div>

            {loading ? (
              <div className="flex justify-center py-20">
                <Loader size="lg" text="Chargement..." />
              </div>
            ) : services.length === 0 ? (
              <div className="text-center py-20" style={{ color: 'var(--text-muted)' }}>
                Aucun service disponible
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {services.map((service, i) => (
                  <ServiceCard key={service.id} service={service} index={i} />
                ))}
              </div>
            )}
          </div>
        </section>
      </div>
    </>
  );
};

export default Services;