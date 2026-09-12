import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { FiPlus, FiEdit2, FiTrash2, FiSettings } from 'react-icons/fi';
import { serviceApi } from '@api/serviceApi';
import Loader from '@components/common/Loader';
import ConfirmDialog from '@components/common/ConfirmDialog';
import { truncate, extractError } from '@utils/helpers';

const ServiceList = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toDelete, setToDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    serviceApi.getAll({ all: true })
      .then(({ data }) => setServices(data?.services || []))
      .catch((err) => toast.error(extractError(err)))
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await serviceApi.delete(toDelete.id);
      setServices((prev) => prev.filter((x) => x.id !== toDelete.id));
      toast.success('Service supprimé');
      setToDelete(null);
    } catch (err) {
      toast.error(extractError(err));
    } finally {
      setDeleting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <Loader size="lg" text="Chargement des services..." />
      </div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>
          Services
        </h1>
        <Link to="/admin/services/create" className="btn-primary">
          <FiPlus size={16} /> Nouveau service
        </Link>
      </div>

      {services.length === 0 ? (
        <div className="admin-card p-10 text-center">
          <FiSettings size={40} className="mx-auto mb-4" style={{ color: 'var(--text-muted)' }} />
          <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
            Aucun service pour le moment. Créez-en un !
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {services.map((service, i) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="admin-card p-4"
            >
              <div className="flex items-start justify-between gap-2 mb-2">
                <h3 className="font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>
                  {service.title}
                </h3>
                <span
                  className={`text-[10px] px-2 py-0.5 rounded-full flex-shrink-0 ${
                    service.active
                      ? 'bg-emerald-500/15 text-emerald-400'
                      : 'bg-zinc-500/15 text-zinc-400'
                  }`}
                >
                  {service.active ? 'Actif' : 'Inactif'}
                </span>
              </div>
              <p className="text-xs mb-4" style={{ color: 'var(--text-muted)' }}>
                {truncate(service.description, 100)}
              </p>
              <div className="flex gap-1">
                <Link
                  to={`/admin/services/edit/${service.id}`}
                  className="p-2 rounded-lg hover:bg-white/10"
                  style={{ color: 'var(--color-primary-light)' }}
                >
                  <FiEdit2 size={15} />
                </Link>
                <button
                  onClick={() => setToDelete(service)}
                  className="p-2 rounded-lg hover:bg-red-500/10 text-red-400"
                >
                  <FiTrash2 size={15} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      <ConfirmDialog
        isOpen={!!toDelete}
        loading={deleting}
        message={`Supprimer le service « ${toDelete?.title} » ?`}
        onCancel={() => setToDelete(null)}
        onConfirm={handleDelete}
      />
    </motion.div>
  );
};

export default ServiceList;
