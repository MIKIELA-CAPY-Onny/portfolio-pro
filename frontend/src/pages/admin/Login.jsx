import { useState } from 'react';
import { useNavigate, useLocation, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiLock, FiMail, FiArrowRight } from 'react-icons/fi';
import toast from 'react-hot-toast';
import useAuth from '@hooks/useAuth';
import Input from '@components/common/Input';
import Button from '@components/common/Button';
import { APP_NAME } from '@utils/constants';
import { extractError } from '@utils/helpers';

const Login = () => {
  const { admin, login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  if (admin) return <Navigate to="/admin" replace />;

  const from = location.state?.from?.pathname || '/admin';

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.email || !form.password) {
      setError('Veuillez remplir tous les champs');
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const result = await login(form);
      if (!result?.success) {
        setError(result?.message || 'Échec de la connexion');
        return;
      }
      toast.success('Connexion réussie !');
      navigate(from, { replace: true });
    } catch (err) {
      setError(extractError(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{ backgroundColor: 'var(--bg-primary)' }}
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <h1
            className="text-3xl font-bold"
            style={{
              fontFamily: 'var(--font-display)',
              background: 'var(--gradient-gold)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            {APP_NAME}
          </h1>
          <p className="text-sm mt-2" style={{ color: 'var(--text-muted)' }}>
            Espace administrateur
          </p>
        </div>

        <form onSubmit={handleSubmit} className="card p-6 md:p-8 space-y-4">
          {error && (
            <p
              className="text-sm p-3 rounded-xl"
              style={{
                background: 'color-mix(in oklab, var(--destructive) 12%, transparent)',
                color: 'var(--destructive)',
              }}
            >
              {error}
            </p>
          )}
          <div className="relative">
            <FiMail
              size={16}
              className="absolute left-3.5 top-[42px] z-10"
              style={{ color: 'var(--text-muted)' }}
            />
            <Input
              label="Email"
              name="email"
              type="email"
              value={form.email}
              onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
              placeholder="admin@portfolio.com"
              className="pl-10"
              autoComplete="email"
              required
            />
          </div>
          <div className="relative">
            <FiLock
              size={16}
              className="absolute left-3.5 top-[42px] z-10"
              style={{ color: 'var(--text-muted)' }}
            />
            <Input
              label="Mot de passe"
              name="password"
              type="password"
              value={form.password}
              onChange={(e) => setForm((p) => ({ ...p, password: e.target.value }))}
              placeholder="••••••••"
              className="pl-10"
              autoComplete="current-password"
              required
            />
          </div>
          <Button
            type="submit"
            loading={loading}
            icon={<FiArrowRight size={18} />}
            className="w-full justify-center"
          >
            Se connecter
          </Button>
        </form>

        <p className="text-center text-xs mt-6" style={{ color: 'var(--text-muted)' }}>
          Acces reserve a l'administrateur du site
        </p>
      </motion.div>
    </div>
  );
};

export default Login;
