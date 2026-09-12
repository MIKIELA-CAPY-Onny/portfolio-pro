import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { FiSearch } from 'react-icons/fi';
import { projectApi } from '@api/projectApi';
import ProjectCard from '@components/portfolio/ProjectCard';
import Loader from '@components/common/Loader';
import Pagination from '@components/common/Pagination';
import Input from '@components/common/Input';
import usePagination from '@hooks/usePagination';
import { APP_NAME } from '@utils/constants';
import { debounce } from '@utils/helpers';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('');

  const pagination = usePagination(1, 9);
  const { currentPage, limit, setTotal, goToPage } = pagination;

  const loadProjects = debounce(async () => {
    setLoading(true);
    try {
      const { data } = await projectApi.getAll({
        page: currentPage,
        limit,
        search,
        category_id: activeCategory || undefined,
        published: 1,
      });
      setProjects(data?.projects || data?.data || data || []);
      setTotal(data?.pagination?.total || data?.total || 0);
    } finally {
      setLoading(false);
    }
  }, 300);

  useEffect(() => {
    loadProjects();
  }, [currentPage, search, activeCategory]);

  useEffect(() => {
    projectApi.getCategories().then(({ data }) => {
      setCategories(data?.categories || data?.data || data || []);
    });
  }, []);

  return (
    <>
      <Helmet>
        <title>Projets – {APP_NAME}</title>
        <meta name="description" content="Mes projets et réalisations" />
      </Helmet>

      <div className="pt-20">
        <section className="section">
          <div className="container">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <h1 className="section-title">Mes projets</h1>
              <p className="section-subtitle">
                Découvrez mes réalisations et expériences
              </p>
            </motion.div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <div className="flex-1">
                <Input
                  placeholder="Rechercher un projet..."
                  value={search}
                  onChange={(e) => { setSearch(e.target.value); goToPage(1); }}
                  icon={<FiSearch size={16} />}
                />
              </div>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => { setActiveCategory(''); goToPage(1); }}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all`}
                  style={{
                    background: !activeCategory ? 'var(--gradient-primary)' : 'transparent',
                    color: !activeCategory ? '#fff' : 'var(--text-secondary)',
                    border: activeCategory ? '1px solid var(--border-color)' : 'none',
                  }}
                >
                  Tous
                </button>
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => { setActiveCategory(cat.id); goToPage(1); }}
                    className="px-4 py-2 rounded-xl text-sm font-medium transition-all"
                    style={{
                      background: activeCategory === cat.id
                        ? 'var(--gradient-primary)' : 'transparent',
                      color: activeCategory === cat.id ? '#fff' : 'var(--text-secondary)',
                      border: activeCategory !== cat.id
                        ? '1px solid var(--border-color)' : 'none',
                    }}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>

            {loading ? (
              <div className="flex justify-center py-20">
                <Loader size="lg" text="Chargement des projets..." />
              </div>
            ) : projects.length === 0 ? (
              <div className="text-center py-20" style={{ color: 'var(--text-muted)' }}>
                Aucun projet trouvé
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {projects.map((project, i) => (
                    <ProjectCard key={project.id} project={project} index={i} />
                  ))}
                </div>
                <Pagination
                  {...pagination}
                  onPageChange={goToPage}
                />
              </>
            )}
          </div>
        </section>
      </div>
    </>
  );
};

export default Projects;