import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiHome, FiArrowLeft } from 'react-icons/fi';
import Button from '@components/common/Button';
import { APP_NAME } from '@utils/constants';

const NotFound = () => {
  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{ backgroundColor: 'var(--bg-primary)' }}
    >
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center">
        <h1
          className="text-8xl md:text-9xl font-bold mb-4"
          style={{
            background: 'var(--gradient-gold)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            fontFamily: 'var(--font-display)',
          }}
        >
          404
        </h1>
        <h2 className="text-2xl font-bold mb-3" style={{ color: 'var(--text-primary)' }}>
          Page introuvable
        </h2>
        <p className="text-sm md:text-base mb-8 max-w-md mx-auto" style={{ color: 'var(--text-muted)' }}>
          La page que vous recherchez n'existe pas ou a ete deplacee. Retournez a l'accueil pour
          continuer votre visite.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link to="/">
            <Button icon={<FiHome size={18} />}>Retour a l'accueil</Button>
          </Link>
          <Button
            variant="outline"
            icon={<FiArrowLeft size={18} />}
            onClick={() => window.history.back()}
          >
            Page precedente
          </Button>
        </div>
        <p className="mt-10 text-xs" style={{ color: 'var(--text-muted)' }}>{APP_NAME}</p>
      </motion.div>
    </div>
  );
};

export default NotFound;
