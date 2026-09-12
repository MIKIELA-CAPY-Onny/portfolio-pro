import { motion } from 'framer-motion';

const ServiceCard = ({ service, index = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="card p-6 text-center group"
    >
      {/* Icon */}
      <div
        className="w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center
                    justify-center text-3xl transition-all duration-300
                    group-hover:scale-110"
        style={{ background: 'rgba(99, 102, 241, 0.15)' }}
      >
        {service.icon || '⚙️'}
      </div>

      {/* Title */}
      <h3 className="text-lg font-bold mb-3"
          style={{ color: 'var(--text-primary)' }}>
        {service.title}
      </h3>

      {/* Description */}
      <p className="text-sm leading-relaxed"
         style={{ color: 'var(--text-secondary)' }}>
        {service.description}
      </p>

      {/* Price */}
      {service.price && (
        <div className="mt-4 pt-4 border-t"
             style={{ borderColor: 'var(--border-color)' }}>
          <span className="text-sm font-semibold"
                style={{ color: 'var(--color-primary-light)' }}>
            {service.price}
          </span>
        </div>
      )}
    </motion.div>
  );
};

export default ServiceCard;