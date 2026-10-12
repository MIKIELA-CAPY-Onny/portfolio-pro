import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { FiArrowDown } from 'react-icons/fi';
import ProfileCard from '@components/portfolio/ProfileCard';
import ProjectCard from '@components/portfolio/ProjectCard';
import SkillCard from '@components/portfolio/SkillCard';
import ServiceCard from '@components/portfolio/ServiceCard';
import Loader from '@components/common/Loader';
import { fetchProfile, fetchProjects, fetchSkills } from '@store/slices/portfolioSlice';
import { APP_NAME } from '@utils/constants';
import { groupBy } from '@utils/helpers';

const Home = () => {
  const dispatch = useDispatch();
  const { profile, projects, skills, loading } = useSelector((s) => s.portfolio);

  useEffect(() => {
    dispatch(fetchProfile());
    dispatch(fetchProjects({ featured: 'true', limit: 3 }));
    dispatch(fetchSkills());
  }, [dispatch]);

  const skillsByCategory = groupBy(skills, 'category');
  const featuredProjects = projects.slice(0, 3);

  if (loading && !profile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader size="lg" text="Chargement..." />
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{profile?.fullname || APP_NAME} – Portfolio</title>
        <meta name="description" content={profile?.slogan || 'Portfolio professionnel'} />
      </Helmet>

      {/* Hero */}
      <section
        className="min-h-screen flex flex-col items-center justify-center
                   relative overflow-hidden pt-20"
      >
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div
            className="absolute top-1/4 -left-40 w-80 h-80 rounded-full blur-3xl opacity-20 animate-float"
            style={{ background: 'var(--color-primary)' }}
          />
          <div
            className="absolute bottom-1/4 -right-40 w-80 h-80 rounded-full blur-3xl opacity-20 animate-float delay-300"
            style={{ background: 'var(--color-secondary)' }}
          />
        </div>

        <div className="container relative z-10">
          <div className="max-w-3xl mx-auto">
            <ProfileCard profile={profile} />
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          style={{ color: 'var(--text-muted)' }}
        >
          <FiArrowDown size={24} />
        </motion.div>
      </section>

      {/* Stats */}
      {profile && (
        <section className="py-16 border-y" style={{ borderColor: 'var(--border-color)' }}>
          <div className="container">
            <div className="grid grid-cols-3 gap-6 max-w-xl mx-auto text-center">
              {[
                { label: "Années d'expérience", value: profile.years_experience },
                { label: 'Projets réalisés', value: profile.projects_completed },
                { label: 'Clients satisfaits', value: profile.clients },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <div className="text-3xl md:text-4xl font-bold text-gradient mb-1">
                    {stat.value ?? 0}+
                  </div>
                  <div className="text-sm" style={{ color: 'var(--text-muted)' }}>
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Featured Projects */}
      {featuredProjects.length > 0 && (
        <section className="section">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="section-title">Projets récents</h2>
              <p className="section-subtitle">
                Quelques réalisations qui illustrent mes compétences
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
              {featuredProjects.map((project, i) => (
                <ProjectCard key={project.id} project={project} index={i} />
              ))}
            </div>

            <div className="text-center">
              <Link to="/projects" className="btn-outline">
                Voir tous les projets
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Skills preview */}
      {skills.length > 0 && (
        <section className="section" style={{ backgroundColor: 'var(--bg-secondary)' }}>
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="section-title">Mes compétences</h2>
              <p className="section-subtitle">
                Technologies et outils que je maîtrise
              </p>
            </motion.div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-10">
              {skills.slice(0, 8).map((skill, i) => (
                <SkillCard key={skill.id} skill={skill} index={i} />
              ))}
            </div>

            <div className="text-center">
              <Link to="/skills" className="btn-outline">
                Voir toutes les compétences
              </Link>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default Home;