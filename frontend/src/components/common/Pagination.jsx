import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const Pagination = ({ currentPage, totalPages, getPageNumbers, onPageChange }) => {
  const [pages, setPages] = useState([]);

  useEffect(() => {
    if (getPageNumbers) setPages(getPageNumbers());
  }, [currentPage, totalPages, getPageNumbers]);

  if (totalPages <= 1) return null;

  const btnBase =
    'w-10 h-10 flex items-center justify-center rounded-xl text-sm font-medium transition-all duration-200';

  return (
    <motion.nav
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex items-center justify-center gap-2 mt-10"
      aria-label="Pagination"
    >
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage <= 1}
        className={`${btnBase} disabled:opacity-30 disabled:cursor-not-allowed`}
        style={{ border: '1px solid var(--border-color)', color: 'var(--text-secondary)' }}
        aria-label="Page precedente"
      >
        <FiChevronLeft size={16} />
      </button>

      {pages.map((page, i) =>
        page === '...' ? (
          <span key={`dots-${i}`} className="w-8 text-center text-sm" style={{ color: 'var(--text-muted)' }}>
            ...
          </span>
        ) : (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={btnBase}
            style={{
              background: page === currentPage ? 'var(--gradient-gold)' : 'transparent',
              color: page === currentPage ? 'oklch(0.15 0.02 60)' : 'var(--text-secondary)',
              border: page === currentPage ? 'none' : '1px solid var(--border-color)',
              fontWeight: page === currentPage ? 700 : 500,
            }}
            aria-current={page === currentPage ? 'page' : undefined}
          >
            {page}
          </button>
        )
      )}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage >= totalPages}
        className={`${btnBase} disabled:opacity-30 disabled:cursor-not-allowed`}
        style={{ border: '1px solid var(--border-color)', color: 'var(--text-secondary)' }}
        aria-label="Page suivante"
      >
        <FiChevronRight size={16} />
      </button>
    </motion.nav>
  );
};

export default Pagination;
