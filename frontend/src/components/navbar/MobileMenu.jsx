import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiX } from 'react-icons/fi';
import { isActivePath } from '@utils/helpers';

const MobileMenu = ({ isOpen, onClose, links, currentPath }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm lg:hidden"
            onClick={onClose}
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed top-0 right-0 bottom-0 z-50 w-72 lg:hidden flex flex-col"
            style={{
              backgroundColor: 'var(--bg-secondary)',
              borderLeft: '1px solid var(--border-color)',
            }}
          >
            {/* Header */}
            <div
              className="flex items-center justify-between p-6 border-b"
              style={{ borderColor: 'var(--border-color)' }}
            >
              <span className="text-lg font-bold text-gradient">
                Portfolio<span className="text-white">.</span>
              </span>
              <button
                onClick={onClose}
                className="p-2 rounded-lg transition-all hover:bg-white/10"
                style={{ color: 'var(--text-secondary)' }}
              >
                <FiX size={20} />
              </button>
            </div>

            {/* Nav Links */}
            <nav className="flex-1 overflow-y-auto p-4">
              <ul className="space-y-1">
                {links.map((link, index) => {
                  const active = isActivePath(link.path, currentPath);
                  return (
                    <motion.li
                      key={link.path}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Link
                        to={link.path}
                        onClick={onClose}
                        className={`
                          flex items-center px-4 py-3 rounded-xl text-sm font-medium
                          transition-all duration-200
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
                        {link.label}
                      </Link>
                    </motion.li>
                  );
                })}
              </ul>
            </nav>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default MobileMenu;