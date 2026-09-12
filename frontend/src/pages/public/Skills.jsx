import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { skillApi } from '@api/skillApi';
import SkillCard from '@components/portfolio/SkillCard';
import Loader from '@components/common/Loader';
import { groupBy } from '@utils/helpers';
import { SKILL_CATEGORIES, APP_NAME } from '@utils/constants';

const Skills = () => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('Tous');

  useEffect(() => {
    const load = async () => {
      try {
        const { data } = await skillApi.getAll();
        setSkills(data?.data || data || []);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const grouped = groupBy(skills, 'category');
  const categories = ['Tous', ...Object.keys(grouped)];
  const displayed = activeCategory === 'Tous'
    ? skills
    : (grouped[activeCategory] || []);

  return (
    <>
      <Helmet>
        <title>Compétences – {APP_NAME}</title>
        <meta name="description" content="Mes compétences techniques et outils" />
      </Helmet>

      <div className="pt-20">
        <section className="section">
          <div className="container">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <h1 className="section-title">Mes compétences</h1>
              <p className="section-subtitle">
                Technologies et outils que je maîtrise
              </p>
            </motion.div>

            {/* Category Filter */}
            <div className="flex flex-wrap justify-center gap-2 mb-10">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`
                    px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200
                    ${activeCategory === cat
                      ? 'text-white shadow-lg'
                      : 'hover:bg-white/10'
                    }
                  `}
                  style={{
                    background: activeCategory === cat ? 'var(--gradient-primary)' : 'transparent',
                    color: activeCategory === cat ? '#fff' : 'var(--text-secondary)',
                    border: activeCategory !== cat ? '1px solid var(--border-color)' : 'none',
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>

            {loading ? (
              <div className="flex justify-center py-20">
                <Loader size="lg" text="Chargement des compétences..." />
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {displayed.map((skill, i) => (
                  <SkillCard key={skill.id} skill={skill} index={i} />
                ))}
              </div>
            )}

            {!loading && displayed.length === 0 && (
              <div className="text-center py-20" style={{ color: 'var(--text-muted)' }}>
                Aucune compétence trouvée
              </div>
            )}
          </div>
        </section>
      </div>
    </>
  );
};

export default Skills;