import { motion, AnimatePresence } from 'framer-motion';
import {
  FiCheckCircle,
  FiAlertCircle,
  FiInfo,
  FiAlertTriangle,
  FiX,
} from 'react-icons/fi';

const icons = {
  success: FiCheckCircle,
  error: FiAlertCircle,
  info: FiInfo,
  warning: FiAlertTriangle,
};

const styles = {
  success: {
    bg: 'bg-emerald-500/10',
    border: 'border-emerald-500/30',
    text: 'text-emerald-400',
  },
  error: {
    bg: 'bg-red-500/10',
    border: 'border-red-500/30',
    text: 'text-red-400',
  },
  info: {
    bg: 'bg-blue-500/10',
    border: 'border-blue-500/30',
    text: 'text-blue-400',
  },
  warning: {
    bg: 'bg-yellow-500/10',
    border: 'border-yellow-500/30',
    text: 'text-yellow-400',
  },
};

const Alert = ({
  type = 'info',
  message,
  title,
  onClose,
  className = '',
  show = true,
}) => {
  const Icon = icons[type];
  const style = styles[type];

  return (
    <AnimatePresence>
      {show && message && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className={`
            flex items-start gap-3 p-4 rounded-xl border
            ${style.bg} ${style.border} ${className}
          `}
        >
          <Icon className={`flex-shrink-0 mt-0.5 ${style.text}`} size={18} />
          <div className="flex-1 min-w-0">
            {title && (
              <p className={`font-semibold text-sm mb-0.5 ${style.text}`}>
                {title}
              </p>
            )}
            <p className={`text-sm ${style.text}`}>{message}</p>
          </div>
          {onClose && (
            <button
              onClick={onClose}
              className={`flex-shrink-0 ${style.text} hover:opacity-70 transition-opacity`}
            >
              <FiX size={16} />
            </button>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Alert;