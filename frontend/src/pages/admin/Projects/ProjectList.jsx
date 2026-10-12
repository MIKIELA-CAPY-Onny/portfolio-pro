import {
  useEffect,
  useState
} from 'react';
import {
  Link
} from 'react-router-dom';
import {
  motion
} from 'framer-motion';
import toast from 'react-hot-toast';
import {
  FiPlus,
  FiEdit2,
  FiTrash2
} from 'react-icons/fi';
import {
  projectApi
} from '@api/projectApi';
import Loader from '@components/common/Loader';
import ConfirmDialog from '@components/common/ConfirmDialog';
import {
  truncate,
  getFileUrl,
  extractError
} from '@utils/helpers';

const ProjectList = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toDelete, setToDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const load = () => {
    projectApi
      .getAll()
      .then(({ data }) => setProjects(data?.projects || []))
      .catch((err) => toast.error(extractError(err)))
      .finally(() => setLoading(false));
  };
  useEffect(load, []);

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await projectApi.delete(toDelete.id);
      setProjects((p) => p.filter((x) => x.id !== toDelete.id));
      toast.success('Projet supprimé');
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
        <Loader size="lg" text="Chargement des projets..." />
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>
          Projets
        </h1>
        <Link to="/admin/projects/create" className="btn-primary">
          <FiPlus size={16} />
          Nouveau projet
        </Link>
      </div>

      {projects.length === 0 ? (
        <div className="admin-card p-10 text-center text-sm"
             style={{ color: 'var(--text-muted)' }}>
          Aucun projet. Créez-en un !
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {projects.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="admin-card overflow-hidden"
            >
              {project.cover_image && (
                <img
                  src={getFileUrl(project.cover_image)}
                  alt={project.title}
                  className="w-full h-36 object-cover"
                  loading="lazy"
                />
              )}
              <div className="p-4">
                <h3
                  className="font-semibold text-sm mb-1"
                  style={{ color: 'var(--text-primary)' }}
                >
                  {project.title}
                </h3>
                <p
                  className="text-xs mb-3"
                  style={{ color: 'var(--text-muted)' }}
                >
                  {truncate(project.short_description || project.description, 90)}
                </p>
                <div className="flex gap-2">
                  <Link
                    to={`/admin/projects/edit/${project.id}`}
                    className="p-2 rounded-lg hover:bg-white/10"
                    style={{ color: 'var(--color-primary-light)' }}
                  >
                    <FiEdit2 size={15} />
                  </Link>
                  <button
                    onClick={() => setToDelete(project)}
                    className="p-2 rounded-lg hover:bg-red-500/10 text-red-400"
                  >
                    <FiTrash2 size={15} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      <ConfirmDialog
        isOpen={!!toDelete}
        loading={deleting}
        message={`Supprimer le projet « ${toDelete?.title} » ?`}
        onCancel={() => setToDelete(null)}
        onConfirm={handleDelete}
      />
    </motion.div>
  );
};

export default ProjectList;