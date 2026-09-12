import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiGithub, FiExternalLink, FiCalendar } from 'react-icons/fi';
import { truncate, getFileUrl } from '@utils/helpers';
import { formatDateShort } from '@utils/formatters';

const ProjectCard = ({ project, index = 0 }) => {
  const coverUrl = getFileUrl(project.cover_image);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="card overflow-hidden flex flex-col h-full"
    >
      {/* Cover Image */}
      <div
        className="relative h-48 overflow-hidden bg-gradient-to-br from-indigo-900/50 to-sky-900/50"
        style={{ flexShrink: 0 }}
      >
        {coverUrl ? (
          <img
            src={coverUrl}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-4xl opacity-30">🖥️</span>
          </div>
        )}

        {/* Featured badge */}
        {project.featured === 1 && (
          <div className="absolute top-3 left-3">
            <span className="badge text-xs">⭐ Mis en avant</span>
          </div>
        )}

        {/* Category */}
        {project.category_name && (
          <div className="absolute top-3 right-3">
            <span
              className="px-2 py-1 rounded-lg text-xs font-medium"
              style={{
                backgroundColor: 'rgba(0,0,0,0.6)',
                color: '#fff',
              }}
            >
              {project.category_name}
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        {/* Title */}
        <h3 className="text-lg font-bold mb-2"
            style={{ color: 'var(--text-primary)' }}>
          {project.title}
        </h3>

        {/* Description */}
        <p className="text-sm leading-relaxed flex-1 mb-4"
           style={{ color: 'var(--text-secondary)' }}>
          {truncate(project.short_description, 120)}
        </p>

        {/* Technologies */}
        {project.technologies && project.technologies.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {project.technologies.slice(0, 4).map((tech) => (
              <span key={tech.id || tech} className="badge text-xs">
                {tech.name || tech}
              </span>
            ))}
            {project.technologies.length > 4 && (
              <span className="badge text-xs">
                +{project.technologies.length - 4}
              </span>
            )}
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t"
             style={{ borderColor: 'var(--border-color)' }}>
          {/* Date */}
          {project.project_date && (
            <div className="flex items-center gap-1.5 text-xs"
                 style={{ color: 'var(--text-muted)' }}>
              <FiCalendar size={12} />
              {formatDateShort(project.project_date)}
            </div>
          )}

          {/* Links */}
          <div className="flex items-center gap-2 ml-auto">
            {project.github_url && (
              <a
                href={project.github_url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 rounded-lg transition-all hover:scale-110"
                style={{ color: 'var(--text-secondary)' }}
                onClick={(e) => e.stopPropagation()}
              >
                <FiGithub size={16} />
              </a>
            )}
            {project.demo_url && (
              <a
                href={project.demo_url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 rounded-lg transition-all hover:scale-110"
                style={{ color: 'var(--text-secondary)' }}
                onClick={(e) => e.stopPropagation()}
              >
                <FiExternalLink size={16} />
              </a>
            )}
            <Link
              to={`/projects/${project.slug}`}
              className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
              style={{
                background: 'var(--gradient-primary)',
                color: '#fff',
              }}
            >
              Voir plus
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;