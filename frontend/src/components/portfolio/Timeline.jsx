import { motion } from 'framer-motion';

const TimelineItem = ({ children, index = 0, isLast = false }) => (
  <div className="relative flex gap-4">
    {/* Line + Dot */}
    <div className="flex flex-col items-center">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: index * 0.1 }}
        className="w-4 h-4 rounded-full flex-shrink-0 mt-1"
        style={{ background: 'var(--gradient-primary)' }}
      />
      {!isLast && (
        <div
          className="w-0.5 flex-1 mt-2"
          style={{ backgroundColor: 'var(--border-color)' }}
        />
      )}
    </div>
    {/* Content */}
    <div className={`flex-1 ${!isLast ? 'pb-8' : ''}`}>
      {children}
    </div>
  </div>
);

const Timeline = ({ items = [], renderItem }) => {
  return (
    <div className="space-y-0">
      {items.map((item, index) => (
        <TimelineItem
          key={item.id || index}
          index={index}
          isLast={index === items.length - 1}
        >
          {renderItem(item, index)}
        </TimelineItem>
      ))}
    </div>
  );
};

export default Timeline;