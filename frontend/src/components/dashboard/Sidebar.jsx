import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiGrid, FiUser, FiFolder, FiZap, FiSettings,
  FiBriefcase, FiBook, FiAward, FiMail, FiImage,
  FiUsers, FiLogOut, FiX,
} from 'react-icons/fi';
import useAuth from '@hooks/useAuth';
import { isActivePath, getInitials, getFileUrl } from '@utils/helpers';

const iconMap = {
  FiGrid, FiUser, FiFolder, FiZap, FiSettings,
  FiBriefcase, FiBook, FiAward, FiMail, FiImage,
  FiUsers,
};

const NAV_ITEMS = [
  { label: 'Dashboard', path: '/admin', icon: FiGrid, exact: true },
  { label: 'Profil', path: '/admin/profile', icon: FiUser },
  { label: 'Projets', path: '/admin/projects', icon: FiFolder },
  { label: 'Compétences', path: '/admin/skills', icon: FiZap },
  { label: 'Expériences', path: '/admin/experiences', icon: FiBriefcase },
  { label: 'Formations', path: '/admin/educations', icon: FiBook },
  { label: 'Certifications', path: '/admin/certifications', icon: FiAward },
  { label: 'Services', path: '/admin/services', icon: FiSettings },
  { label: 'Messages', path: '/admin/contacts', icon: FiMail },
  { label: 'Médias', path: '/admin/media', icon: FiImage },
  { label: 'Paramètres', path: '/admin/settings', icon: FiSettings },
];

const SidebarContent = ({ onClose }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { admin, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    navigate('/admin/login');
  };

  const isActive = (item) => {
    if (item.exact) return location.pathname === item.path;
    return isActivePath(item.path, location.pathname);
  };

  return (
    <div
      className="h-full flex flex-col"
      style={{
        backgroundColor: 'var(--bg-secondary)',
        borderRight: '1px solid var(--border-color)',
      }}
    >
      {/* Header */}
      <div
        className="p-5 border-b flex items-center justify-between"
        style={{ borderColor: 'var(--border-color)' }}
      >
        <Link to="/" className="text-xl font-bold text-gradient">
          Portfolio<span className="text-white">.</span>
        </Link>
        {onClose && (
          <button
            onClick={onClose}
            className="lg:hidden p-1.5 rounded-lg hover:bg-white/10 transition-colors"
            style={{ color: 'var(--text-muted)' }}
          >
            <FiX size={18} />
          </button>
        )}
      </div>

      {/* Admin info */}
      {admin && (
        <div className="p-4 border-b" style={{ borderColor: 'var(--border-color)' }}>
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-xl overflow-hidden flex items-center
                          justify-center font-bold text-white text-sm flex-shrink-0"
              style={{ background: 'var(--gradient-primary)' }}
            >
              {admin.avatar
                ? <img src={getFileUrl(admin.avatar)} alt={admin.fullname}
                       className="w-full h-full object-cover" />
                : getInitials(admin.fullname)
              }
            </div>
            <div className="min-w-0">
              <p className="text-sm font-semibold truncate"
                 style={{ color: 'var(--text-primary)' }}>
                {admin.fullname}
              </p>
              <p className="text-xs truncate" style={{ color: 'var(--text-muted)' }}>
                {admin.email}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-3">
        <ul className="space-y-1">
          {NAV_ITEMS.map((item) => {
            const active = isActive(item);
            const Icon = item.icon;
            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  onClick={onClose}
                  className={`
                    flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm
                    font-medium transition-all duration-200
                  `}
                  style={{
                    backgroundColor: active
                      ? 'rgba(99, 102, 241, 0.15)'
                      : 'transparent',
                    color: active
                      ? 'var(--color-primary-light)'
                      : 'var(--text-secondary)',
                    borderLeft: active
                      ? '3px solid var(--color-primary)'
                      : '3px solid transparent',
                  }}
                >
                  <Icon size={18} className="flex-shrink-0" />
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Logout */}
      <div className="p-3 border-t" style={{ borderColor: 'var(--border-color)' }}>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl
                     text-sm font-medium transition-all hover:bg-red-500/10
                     text-red-400"
        >
          <FiLogOut size={18} />
          Déconnexion
        </button>
      </div>
    </div>
  );
};

const Sidebar = ({ isOpen, onClose }) => {
  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex flex-col h-screen sticky top-0">
        <SidebarContent />
      </aside>

      {/* Mobile drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
              onClick={onClose}
            />
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed top-0 left-0 bottom-0 z-50 w-72 lg:hidden flex flex-col"
            >
              <SidebarContent onClose={onClose} />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Sidebar;