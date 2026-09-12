import { motion } from 'framer-motion';

const StatsCard = ({
  title,
  value,
  icon,
  trend,
  trendValue,
  color = 'indigo',
  index = 0,
}) => {
  const colors = {
    indigo: 'from-indigo-500 to-indigo-600',
    sky: 'from-sky-500 to-sky-600',
    emerald: 'from-emerald-500 to-emerald-600',
    amber: 'from-amber-500 to-amber-600',
    rose: 'from-rose-500 to-rose-600',
    violet: 'from-violet-500 to-violet-600',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08 }}
      className="admin-card flex items-center gap-4"
    >
      {/* Icon */}
      <div
        className={`
          w-12 h-12 rounded-xl flex items-center justify-center
          text-white flex-shrink-0 bg-gradient-to-br ${colors[color]}
        `}
      >
        {icon}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <p className="text-xs font-medium mb-1"
           style={{ color: 'var(--text-muted)' }}>
          {title}
        </p>
        <p className="text-2xl font-bold"
           style={{ color: 'var(--text-primary)' }}>
          {value ?? 0}
        </p>
        {trend && (
          <p className={`text-xs mt-0.5 ${
            trend === 'up' ? 'text-emerald-400' : 'text-red-400'
          }`}>
            {trend === 'up' ? '▲' : '▼'} {trendValue}
          </p>
        )}
      </div>
    </motion.div>
  );
};

export default StatsCard;