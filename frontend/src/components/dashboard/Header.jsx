import { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiMenu, FiSun, FiMoon, FiBell, FiExternalLink } from 'react-icons/fi';
import { ThemeContext } from '@contexts/ThemeContext';

const pageTitles = {
  '/admin': 'Dashboard',
  '/admin/profile': 'Profil',
  '/admin/projects': 'Projets',
  '/admin/skills': 'Compétences',
  '/admin/experiences': 'Expériences',
  '/admin/educations': 'Formations',
  '/admin/certifications': 'Certifications',
  '/admin/services': 'Services',
  '/admin/contacts': 'Messages',
  '/admin/media': 'Médiathèque',
  '/admin/settings': 'Paramètres',
};

const Header = ({ onMenuToggle }) => {
  const location = useLocation();
  const { isDark, toggleTheme } = useContext(ThemeContext);

  const title = Object.entries(pageTitles).find(([path]) =>
    location.pathname === path ||
    (path !== '/admin' && location.pathname.startsWith(path))
  )?.[1] || 'Administration';

  return (
    <header
      className="sticky top-0 z-30 border-b h-16 flex items-center px-4 md:px-6"
      style={{
        backgroundColor: 'var(--bg-secondary)',
        borderColor: 'var(--border-color)',
      }}
    >
      {/* Menu toggle (mobile) */}
      <button
        onClick={onMenuToggle}
        className="lg:hidden p-2 mr-3 rounded-lg hover:bg-white/10 transition-colors"
        style={{ color: 'var(--text-secondary)' }}
      >
        <FiMenu size={20} />
      </button>

      {/* Title */}
      <h1 className="text-lg font-bold flex-1"
          style={{ color: 'var(--text-primary)' }}>
        {title}
      </h1>

      {/* Actions */}
      <div className="flex items-center gap-2">
        <Link
          to="/"
          className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium
                     transition-all hover:opacity-80"
          style={{
            border: '1px solid var(--border-color)',
            color: 'var(--color-primary-light)',
          }}
          title="Voir le site public"
        >
          <FiExternalLink size={14} />
          Voir le site
        </Link>
        <button
          onClick={toggleTheme}
          className="p-2 rounded-lg hover:bg-white/10 transition-colors"
          style={{ color: 'var(--text-secondary)' }}
        >
          {isDark ? <FiSun size={18} /> : <FiMoon size={18} />}
        </button>
        <button
          className="p-2 rounded-lg hover:bg-white/10 transition-colors relative"
          style={{ color: 'var(--text-secondary)' }}
        >
          <FiBell size={18} />
        </button>
      </div>
    </header>
  );
};

export default Header;