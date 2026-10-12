import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import {
  FiGithub, FiExternalLink, FiCalendar,
  FiArrowLeft, FiTag,
} from 'react-icons/fi';
import { projectApi } from '@api/projectApi';
import Loader from '@components/common/Loader';
import { formatDate } from '@utils/formatters';
import { APP_NAME } from '@utils/constants';
import { getFileUrl } from '@utils/helpers';

const ProjectDetails = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const { data } = await projectApi.getBySlug(slug);
        setProject(data?.project);
      } catch {
        navigate('/projects', { replace: true });
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [slug, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <Loader size="lg" text="Chargement du projet..." />
      </div>
    );
  }

  if (!project) return null;

  const coverUrl = getFileUrl(project.cover_image);

  return (
    <>
      <Helmet>
        <title>{project.title} – {APP_NAME}</title>
        <meta name="description" content={project.short_description || ''} />
      </Helmet>

      <div className="pt-20">
        {/* Hero Cover */}
        {coverUrl && (
          <div className="relative h-64 md:h-96 overflow-hidden">
            <img src={coverUrl} alt={project.title}
                 className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
          </div>
        )}

        <div className="container py-12">
          {/* Back */}
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 mb-6 text-sm transition-colors hover:text-indigo-400"
            style={{ color: 'var(--text-muted)' }}
          >
            <FiArrowLeft size={16} />
            Retour aux projets
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main */}
            <div className="lg:col-span-2">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                {project.category_name && (
                  <div className="flex items-center gap-2 mb-3">
                    <FiTag size={14} style={{ color: 'var(--text-muted)' }} />
                    <span className="badge">{project.category_name}</span>
                  </div>
                )}
                <h1 className="text-3xl md:text-4xl font-bold mb-4"
                    style={{ color: 'var(--text-primary)' }}>
                  {project.title}
                </h1>
                {project.short_description && (
                  <p className="text-lg mb-6" style={{ color: 'var(--text-secondary)' }}>
                    {project.short_description}
                  </p>
                )}
                {project.description && (
                  <div className="prose prose-invert max-w-none"
                       style={{ color: 'var(--text-secondary)' }}>
                    {project.description.split('\n').map((p, i) => (
                      <p key={i} className="mb-4 text-sm leading-relaxed">{p}</p>
                    ))}
                  </div>
                )}

                {/* Gallery */}
                {project.images && project.images.length > 0 && (
                  <div className="mt-8">
                    <h3 className="text-lg font-semibold mb-4"
                        style={{ color: 'var(--text-primary)' }}>
                      Captures d'écran
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                      {project.images.map((img) => (
                        <img
                          key={img.id}
                          src={getFileUrl(img.image)}
                          alt={project.title}
                          className="rounded-xl w-full h-48 object-cover"
                          loading="lazy"
                        />
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            </div>

            {/* Sidebar */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-4"
            >
              {/* Links */}
              <div className="card p-5 space-y-3">
                <h3 className="font-semibold" style={{ color: 'var(--text-primary)' }}>
                  Liens
                </h3>
                {project.github_url && (
                  <a
                    href={project.github_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 rounded-xl transition-all hover:bg-white/5"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    <FiGithub size={18} />
                    <span className="text-sm">Code source</span>
                  </a>
                )}
                {project.demo_url && (
                  <a
                    href={project.demo_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 rounded-xl transition-all hover:bg-white/5"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    <FiExternalLink size={18} />
                    <span className="text-sm">Démonstration live</span>
                  </a>
                )}
              </div>

              {/* Info */}
              <div className="card p-5 space-y-4">
                <h3 className="font-semibold" style={{ color: 'var(--text-primary)' }}>
                  Informations
                </h3>
                {project.project_date && (
                  <div className="flex items-center gap-3 text-sm"
                       style={{ color: 'var(--text-secondary)' }}>
                    <FiCalendar size={16} style={{ color: 'var(--text-muted)' }} />
                    {formatDate(project.project_date)}
                  </div>
                )}
              </div>

              {/* Technologies */}
              {project.technologies && project.technologies.length > 0 && (
                <div className="card p-5">
                  <h3 className="font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>
                    Technologies
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <span key={tech.id || tech} className="badge">
                        {tech.name || tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProjectDetails;