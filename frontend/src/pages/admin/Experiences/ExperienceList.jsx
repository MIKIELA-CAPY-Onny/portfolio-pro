import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { FiPlus, FiEdit2, FiTrash2, FiBriefcase } from 'react-icons/fi';
import { experienceApi } from '@api/experienceApi';
import Loader from '@components/common/Loader';
import ConfirmDialog from '@components/common/ConfirmDialog';
import { truncate, extractError } from '@utils/helpers';
import { formatDate } from '@utils/formatters';

const ExperienceList = () => {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toDelete, setToDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    experienceApi.getAll()
      .then(({ data }) => setExperiences(data?.experiences || []))
      .catch((err) => toast.error(extractError(err)))
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await experienceApi.delete(toDelete.id);
      setExperiences((prev) => prev.filter((x) => x.id !== toDelete.id));
      toast.success('Expérience supprimée');
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
        <Loader size="lg" text="Chargement des expériences..." />
      </div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>
          Expériences professionnelles
        </h1>
        <Link to="/admin/experiences/create" className="btn-primary">
          <FiPlus size={16} /> Nouvelle expérience
        </Link>
      </div>

      {experiences.length === 0 ? (
        <div className="admin-card p-10 text-center">
          <FiBriefcase size={40} className="mx-auto mb-4" style={{ color: 'var(--text-muted)' }} />
          <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
            Aucune expérience pour le moment. Créez-en une !
          </p>
        </div>
      ) : (
        <div className="admin-card divide-y" style={{ borderColor: 'var(--border-color)' }}>
          {experiences.map((exp, i) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.04 }}
              className="flex items-center justify-between gap-4 py-3 px-4"
              style={{ borderColor: 'var(--border-color)' }}
            >
              <div className="min-w-0">
                <p className="text-sm font-medium truncate" style={{ color: 'var(--text-primary)' }}>
                  {exp.position}
                  {exp.current_job && (
                    <span className="ml-2 text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400">
                      Actuel
                    </span>
                  )}
                </p>
                <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
                  {exp.company} · {formatDate(exp.start_date)} → {exp.current_job ? 'Présent' : formatDate(exp.end_date) || '—'}
                </p>
                {exp.description && (
                  <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>
                    {truncate(exp.description, 120)}
                  </p>
                )}
              </div>
              <div className="flex items-center gap-1 flex-shrink-0">
                <Link
                  to={`/admin/experiences/edit/${exp.id}`}
                  className="p-2 rounded-lg hover:bg-white/10"
                  style={{ color: 'var(--color-primary-light)' }}
                >
                  <FiEdit2 size={15} />
                </Link>
                <button
                  onClick={() => setToDelete(exp)}
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
        message={`Supprimer l'expérience « ${toDelete?.position} chez ${toDelete?.company} » ?`}
        onCancel={() => setToDelete(null)}
        onConfirm={handleDelete}
      />
    </motion.div>
  );
};

export default ExperienceList;
