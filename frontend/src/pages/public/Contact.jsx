import { useState } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { FiSend, FiCheckCircle } from 'react-icons/fi';
import { contactApi } from '@api/contactApi';
import Input from '@components/common/Input';
import Textarea from '@components/common/TextArea';
import Button from '@components/common/Button';
import { APP_NAME } from '@utils/constants';
import { validateContactForm } from '@utils/validators';
import { extractError } from '@utils/helpers';

const initialState = { fullname: '', email: '', subject: '', message: '' };

const Contact = () => {
  const [form, setForm] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setErrors((prev) => ({ ...prev, [e.target.name]: undefined }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validation = validateContactForm(form);
    if (Object.keys(validation).length > 0) {
      setErrors(validation);
      return;
    }
    setLoading(true);
    try {
      await contactApi.send(form);
      setSent(true);
      setForm(initialState);
    } catch (error) {
      setErrors({ global: extractError(error) });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Contact - {APP_NAME}</title>
        <meta name="description" content="Contactez-moi pour vos projets" />
      </Helmet>

      <div className="pt-20">
        <section className="section">
          <div className="container max-w-3xl">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <h1 className="section-title">Me contacter</h1>
              <p className="section-subtitle">
                Une question, un projet ? Ecrivez-moi, je reponds rapidement.
              </p>
            </motion.div>

            {sent ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="card p-10 text-center"
              >
                <FiCheckCircle size={56} className="mx-auto mb-4" style={{ color: 'var(--gold)' }} />
                <h2 className="text-xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
                  Message envoye !
                </h2>
                <p className="text-sm mb-6" style={{ color: 'var(--text-secondary)' }}>
                  Merci pour votre message, je vous repondrai dans les plus brefs delais.
                </p>
                <Button variant="outline" onClick={() => setSent(false)}>
                  Envoyer un autre message
                </Button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="card p-6 md:p-8 space-y-4" noValidate>
                {errors.global && (
                  <p
                    className="text-sm p-3 rounded-xl"
                    style={{
                      background: 'color-mix(in oklab, var(--destructive) 12%, transparent)',
                      color: 'var(--destructive)',
                    }}
                  >
                    {errors.global}
                  </p>
                )}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    label="Nom complet"
                    name="fullname"
                    value={form.fullname}
                    onChange={handleChange}
                    error={errors.fullname}
                    required
                    placeholder="Jean Dupont"
                  />
                  <Input
                    label="Email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    error={errors.email}
                    required
                    placeholder="jean@exemple.com"
                  />
                </div>
                <Input
                  label="Sujet"
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  error={errors.subject}
                  required
                  placeholder="Objet de votre message"
                />
                <Textarea
                  label="Message"
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  error={errors.message}
                  required
                  rows={6}
                  placeholder="Decrivez votre projet ou votre demande..."
                />
                <Button
                  type="submit"
                  loading={loading}
                  icon={<FiSend size={18} />}
                  className="w-full justify-center"
                >
                  Envoyer le message
                </Button>
              </form>
            )}
          </div>
        </section>
      </div>
    </>
  );
};

export default Contact;
