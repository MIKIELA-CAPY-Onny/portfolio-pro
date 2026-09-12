import { forwardRef } from 'react';
import { motion } from 'framer-motion';
import Loader from './Loader';

const variants = {
  primary: 'btn-primary',
  outline: 'btn-outline',
  danger:
    'inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white transition-all duration-300 bg-red-500 hover:bg-red-600',
  ghost:
    'inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:bg-white/10',
  success:
    'inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white transition-all duration-300 bg-emerald-500 hover:bg-emerald-600',
};

const sizes = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg',
};

const Button = forwardRef(
  (
    {
      children,
      variant = 'primary',
      size = 'md',
      loading = false,
      disabled = false,
      icon,
      iconRight,
      className = '',
      type = 'button',
      onClick,
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || loading;

    return (
      <motion.button
        ref={ref}
        type={type}
        onClick={onClick}
        disabled={isDisabled}
        whileTap={{ scale: isDisabled ? 1 : 0.97 }}
        className={`
          ${variants[variant]}
          ${size !== 'md' ? sizes[size] : ''}
          ${isDisabled ? 'opacity-60 cursor-not-allowed pointer-events-none' : ''}
          ${className}
        `}
        {...props}
      >
        {loading ? (
          <Loader size="sm" color="white" />
        ) : (
          icon && <span className="flex-shrink-0">{icon}</span>
        )}
        {children}
        {!loading && iconRight && (
          <span className="flex-shrink-0">{iconRight}</span>
        )}
      </motion.button>
    );
  }
);

Button.displayName = 'Button';
export default Button;