import { useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  FiFolder, FiZap, FiSettings, FiBriefcase, FiBook, FiAward, FiMail, FiImage, FiUsers, FiFileText,
} from 'react-icons/fi';
import { Link } from 'react-router-dom';
import {
  dashboardApi
} from '@api/dashboardApi';
import useFetch from '@hooks/useFetch';
import Loader from '@components/common/Loader';
import StatsCard from '@components/dashboard/StatsCard';
import {
  extractError
} from '@utils/helpers';

const quickLinks = [
  { label: 'Profil', path: '/admin/profile/edit', icon: FiUsers, color: 'from-indigo-500 to-indigo-600' },
  { label: 'Projets', path: '/admin/projects', icon: FiFolder, color: 'from-sky-500 to-sky-600' },
  { label: 'Compétences', path: '/admin/skills', icon: FiZap, color: 'from-emerald-500 to-emerald-600' },
  { label: 'Expériences', path: '/admin/experiences', icon: FiBriefcase, color: 'from-amber-500 to-amber-600' },
  { label: 'Formations', path: '/admin/educations', icon: FiBook, color: 'from-violet-500 to-violet-600' },
  { label: 'Certifications', path: '/admin/certifications', icon: FiAward, color: 'from-rose-500 to-rose-600' },
  { label: 'Services', path: '/admin/services', icon: FiSettings, color: 'from-indigo-500 to-indigo-600' },
  { label: 'CV', path: '/admin/profile/edit', icon: FiFileText, color: 'from-teal-500 to-teal-600' },
  { label: 'Médias', path: '/admin/media', icon: FiImage, color: 'from-sky-500 to-sky-600' },
  { label: 'Messages', path: '/admin/contacts', icon: FiMail, color: 'from-rose-500 to-rose-600' },
];

const Dashboard = () => {
  const { data, loading, error, execute } = useFetch(() => dashboardApi.getStats(), {
    immediate: false,
  });

  useEffect(() => {
    execute();
  }, [execute]);

  const stats = data?.stats || {};
  const recentMessages = data?.recentMessages || [];
  const topProjects = data?.topProjects || [];

  const statCards = [
    { title: 'Projets', value: stats.totalProjects ?? 0, icon: <FiFolder size={20} />, color: 'sky' },
    { title: 'Compétences', value: stats.totalSkills ?? 0, icon: <FiZap size={20} />, color: 'emerald' },
    { title: 'Services', value: stats.totalServices ?? 0, icon: <FiSettings size={20} />, color: 'amber' },
    { title: 'Messages non lus', value: stats.unreadMessages ?? 0, icon: <FiMail size={20} />, color: 'rose' },
  ];

  return (
    <div>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>
          Dashboard
        </h1>
        <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>
          Vue d'ensemble de votre portfolio
        </p>
      </motion.div>

      {error && (
        <div className="p-4 mb-6 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
          {extractError(error)}
        </div>
      )}

      {loading ? (
        <div className="flex justify-center py-20">
          <Loader size="lg" text="Chargement des statistiques..." />
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
            {statCards.map((stat, i) => (
              <StatsCard key={stat.title} {...stat} index={i} />
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Derniers messages */}
            <div className="admin-card p-5">
              <h2 className="text-sm font-semibold uppercase tracking-wide mb-4"
                  style={{ color: 'var(--text-muted)' }}>
                Derniers messages
              </h2>
              {recentMessages.length === 0 ? (
                <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                  Aucun message pour le moment.
                </p>
              ) : (
                <ul className="space-y-3">
                  {recentMessages.map((msg) => (
                    <li key={msg.id} className="flex items-start gap-3">
                      <span
                        className="w-2 h-2 mt-1.5 rounded-full flex-shrink-0"
                        style={{
                          backgroundColor: msg.is_read ? 'var(--text-muted)' : 'var(--color-primary)',
                        }}
                      />
                      <div className="min-w-0">
                        <p className="text-sm font-medium truncate"
                           style={{ color: 'var(--text-primary)' }}>
                          {msg.fullname}
                        </p>
                        <p className="text-xs truncate" style={{ color: 'var(--text-muted)' }}>
                          {msg.subject || msg.message}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Projets les plus vus */}
            <div className="admin-card p-5">
              <h2 className="text-sm font-semibold uppercase tracking-wide mb-4"
                  style={{ color: 'var(--text-muted)' }}>
                Projets les plus vus
              </h2>
              {topProjects.length === 0 ? (
                <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                  Aucun projet pour le moment.
                </p>
              ) : (
                <ul className="space-y-3">
                  {topProjects.map((project) => (
                    <li key={project.id} className="flex items-center justify-between gap-3">
                      <span className="text-sm truncate" style={{ color: 'var(--text-primary)' }}>
                        {project.title}
                      </span>
                      <span className="text-xs flex-shrink-0"
                            style={{ color: 'var(--color-primary-light)' }}>
                        {project.views} vue{project.views > 1 ? 's' : ''}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </>
      )}

      <h2 className="text-sm font-semibold uppercase tracking-wide mb-4"
          style={{ color: 'var(--text-muted)' }}>
        Gestion rapide
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {quickLinks.map((link, i) => {
          const Icon = link.icon;
          return (
            <motion.div
              key={link.path + link.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
            >
              <Link
                to={link.path}
                className="admin-card flex flex-col items-center gap-3 py-6 transition-all hover:-translate-y-0.5 block"
              >
                <span className={`w-11 h-11 rounded-xl flex items-center justify-center text-white bg-gradient-to-br ${link.color}`}>
                  <Icon size={20} />
                </span>
                <span className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
                  {link.label}
                </span>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default Dashboard;