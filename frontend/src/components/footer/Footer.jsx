import { Link } from 'react-router-dom';
import { FiGithub, FiLinkedin, FiMail, FiHeart } from 'react-icons/fi';
import { NAV_LINKS } from '@utils/constants';

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer
      className="border-t"
      style={{
        backgroundColor: 'var(--bg-secondary)',
        borderColor: 'var(--border-color)',
      }}
    >
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <Link to="/" className="text-2xl font-bold text-gradient">
              Portfolio<span className="text-white">.</span>
            </Link>
            <p className="mt-3 text-sm leading-relaxed"
               style={{ color: 'var(--text-muted)' }}>
              Portfolio professionnel dynamique. Développeur passionné par
              la création d'expériences web modernes et performantes.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-semibold mb-4"
                style={{ color: 'var(--text-primary)' }}>
              Navigation
            </h4>
            <ul className="space-y-2">
              {NAV_LINKS.slice(0, 6).map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm transition-colors hover:text-indigo-400"
                    style={{ color: 'var(--text-muted)' }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4"
                style={{ color: 'var(--text-primary)' }}>
              Retrouvez-moi
            </h4>
            <div className="flex items-center gap-3">
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl flex items-center justify-center transition-all hover:scale-110"
                style={{
                  backgroundColor: 'var(--bg-tertiary)',
                  color: 'var(--text-secondary)',
                }}
                aria-label="GitHub"
              >
                <FiGithub size={18} />
              </a>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl flex items-center justify-center transition-all hover:scale-110"
                style={{
                  backgroundColor: 'var(--bg-tertiary)',
                  color: 'var(--text-secondary)',
                }}
                aria-label="LinkedIn"
              >
                <FiLinkedin size={18} />
              </a>
              <Link
                to="/contact"
                className="w-10 h-10 rounded-xl flex items-center justify-center transition-all hover:scale-110"
                style={{
                  backgroundColor: 'var(--bg-tertiary)',
                  color: 'var(--text-secondary)',
                }}
                aria-label="Contact"
              >
                <FiMail size={18} />
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div
          className="pt-8 border-t flex flex-col md:flex-row items-center justify-between gap-4"
          style={{ borderColor: 'var(--border-color)' }}
        >
          <p className="text-sm flex items-center gap-1"
             style={{ color: 'var(--text-muted)' }}>
            © {year} Portfolio Pro. Fait avec
            <FiHeart size={14} className="text-red-400" />
          </p>
          <Link
            to="/admin/login"
            className="text-xs transition-colors hover:text-indigo-400"
            style={{ color: 'var(--text-muted)' }}
          >
            Administration
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;