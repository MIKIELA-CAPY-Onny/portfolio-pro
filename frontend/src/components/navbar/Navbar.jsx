import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiSun, FiMoon } from 'react-icons/fi';
import { NAV_LINKS, GITHUB_URL } from '@utils/constants';
import { isActivePath } from '@utils/helpers';
import { useContext } from 'react';
import { ThemeContext } from '@contexts/ThemeContext';
import MobileMenu from './MobileMenu';

const Navbar = () => {
  const location = useLocation();
  const { isDark, toggleTheme } = useContext(ThemeContext);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  return (
    <>
      <motion.header
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className={`
          fixed top-0 left-0 right-0 z-40 transition-all duration-300
          ${scrolled ? 'bg-glass shadow-lg' : 'bg-transparent'}
        `}
      >
        <div className="container">
          <nav className="flex items-center justify-between h-16 md:h-20">
            {/* Logo – renvoie vers le GitHub */}
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2"
              aria-label="GitHub"
            >
              <span className="text-xl md:text-2xl font-bold text-gradient">
                Portfolio<span className="text-white">.</span>
              </span>
            </a>

            {/* Desktop Nav */}
            <ul className="hidden lg:flex items-center gap-1">
              {NAV_LINKS.map((link) => {
                const active = isActivePath(link.path, location.pathname);
                return (
                  <li key={link.path}>
                    <Link
                      to={link.path}
                      className={`
                        relative px-4 py-2 rounded-lg text-sm font-medium
                        transition-all duration-200
                        ${active
                          ? 'text-white'
                          : 'hover:text-white'
                        }
                      `}
                      style={{
                        color: active ? 'var(--color-primary-light)' : 'var(--text-secondary)',
                      }}
                    >
                      {link.label}
                      {active && (
                        <motion.div
                          layoutId="navbar-indicator"
                          className="absolute inset-0 rounded-lg -z-10"
                          style={{ background: 'var(--gradient-primary)', opacity: 0.15 }}
                        />
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>

            {/* Actions */}
            <div className="flex items-center gap-3">
              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg transition-all hover:bg-white/10"
                style={{ color: 'var(--text-secondary)' }}
                aria-label="Changer le thème"
              >
                {isDark ? <FiSun size={20} /> : <FiMoon size={20} />}
              </button>

              {/* Mobile Menu */}
              <button
                onClick={() => setMobileOpen(true)}
                className="lg:hidden p-2 rounded-lg transition-all hover:bg-white/10"
                style={{ color: 'var(--text-secondary)' }}
                aria-label="Menu"
              >
                <FiMenu size={22} />
              </button>
            </div>
          </nav>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
        links={NAV_LINKS}
        currentPath={location.pathname}
      />
    </>
  );
};

export default Navbar;