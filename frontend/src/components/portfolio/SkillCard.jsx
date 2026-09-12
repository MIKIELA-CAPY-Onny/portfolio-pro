import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { levelToPercent } from '@utils/formatters';
import { getSkillLevelLabel } from '@utils/helpers';

const SkillCard = ({ skill, index = 0 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const percent = levelToPercent(skill.level);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.05, duration: 0.4 }}
      className="card p-4 hover:border-indigo-500/50"
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          {skill.icon && (
            <span className="text-2xl">{skill.icon}</span>
          )}
          <span className="font-medium text-sm"
                style={{ color: 'var(--text-primary)' }}>
            {skill.name}
          </span>
        </div>
        <span className="text-xs px-2 py-1 rounded-full"
              style={{
                backgroundColor: 'rgba(99, 102, 241, 0.1)',
                color: 'var(--color-primary-light)',
              }}>
          {getSkillLevelLabel(skill.level)}
        </span>
      </div>

      {/* Progress bar */}
      <div
        className="h-1.5 rounded-full overflow-hidden"
        style={{ backgroundColor: 'var(--bg-tertiary)' }}
      >
        <motion.div
          initial={{ width: 0 }}
          animate={isInView ? { width: `${percent}%` } : { width: 0 }}
          transition={{ delay: index * 0.05 + 0.2, duration: 0.8, ease: 'easeOut' }}
          className="h-full rounded-full"
          style={{ background: 'var(--gradient-primary)' }}
        />
      </div>
      <div className="flex justify-end mt-1">
        <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
          {percent}%
        </span>
      </div>
    </motion.div>
  );
};

export default SkillCard;