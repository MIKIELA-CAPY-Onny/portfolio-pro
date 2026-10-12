import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import {
  SiHtml5, SiCss, SiJavascript, SiTypescript, SiReact, SiAngular,
  SiNodedotjs, SiExpress, SiPhp, SiLaravel, SiSymfony, SiPython,
  SiDjango, SiFlask, SiFigma, SiCanvas, SiTailwindcss, SiBootstrap,
  SiSass, SiKalilinux, SiMetasploit, SiMysql, SiPostgresql, SiSqlite,
  SiGit, SiGithub, SiGitlab, SiDocker, SiPostman, SiLinux, SiOpenjdk,
  SiKotlin, SiAndroidstudio, SiFlutter, SiDart, SiXml,
} from 'react-icons/si';
import Loader from '@components/common/Loader';
import { APP_NAME } from '@utils/constants';

/* Catégories fixes — logos officiels uniquement (Simple Icons, vectoriels) */
const CATEGORIES = [
  {
    id: 'web',
    icon: '💻',
    title: 'Développement Web',
    items: [
      { name: 'HTML5', Icon: SiHtml5, color: '#E34F26' },
      { name: 'CSS3', Icon: SiCss, color: '#1572B6' },
      { name: 'JavaScript', Icon: SiJavascript, color: '#F7DF1E' },
      { name: 'TypeScript', Icon: SiTypescript, color: '#3178C6' },
      { name: 'React', Icon: SiReact, color: '#61DAFB' },
      { name: 'Angular', Icon: SiAngular, color: '#DD0031' },
      { name: 'Node.js', Icon: SiNodedotjs, color: '#339933' },
      { name: 'Express', Icon: SiExpress, color: '#e0e0e0' },
      { name: 'PHP', Icon: SiPhp, color: '#777BB4' },
      { name: 'Laravel', Icon: SiLaravel, color: '#FF2D20' },
      { name: 'Symfony', Icon: SiSymfony, color: '#e0e0e0' },
      { name: 'Python', Icon: SiPython, color: '#3776AB' },
      { name: 'Django', Icon: SiDjango, color: '#092E20' },
      { name: 'Flask', Icon: SiFlask, color: '#e0e0e0' },
    ],
  },
  {
    id: 'design',
    icon: '🎨',
    title: 'Design & UI',
    items: [
      { name: 'Figma', Icon: SiFigma, color: '#F24E1E' },
      { name: 'Canva', Icon: SiCanvas, color: '#00C4CC' },
      { name: 'Tailwind CSS', Icon: SiTailwindcss, color: '#06B6D4' },
      { name: 'Bootstrap', Icon: SiBootstrap, color: '#7952B3' },
      { name: 'Sass', Icon: SiSass, color: '#CC6699' },
    ],
  },
  {
    id: 'security',
    icon: '🔐',
    title: 'Cybersécurité',
    items: [
      { name: 'Kali Linux', Icon: SiKalilinux, color: '#3676FE' },
      { name: 'Metasploit', Icon: SiMetasploit, color: '#2596CD' },
    ],
  },
  {
    id: 'db',
    icon: '🗄️',
    title: 'Bases de données',
    items: [
      { name: 'MySQL', Icon: SiMysql, color: '#4479A1' },
      { name: 'PostgreSQL', Icon: SiPostgresql, color: '#4169E1' },
      { name: 'SQLite', Icon: SiSqlite, color: '#003B57' },
    ],
  },
  {
    id: 'devops',
    icon: '⚙️',
    title: 'Outils & DevOps',
    items: [
      { name: 'Git', Icon: SiGit, color: '#F05032' },
      { name: 'GitHub', Icon: SiGithub, color: '#e0e0e0' },
      { name: 'GitLab', Icon: SiGitlab, color: '#FC6D26' },
      { name: 'Docker', Icon: SiDocker, color: '#2496ED' },
      { name: 'Postman', Icon: SiPostman, color: '#FF6C37' },
      { name: 'Linux', Icon: SiLinux, color: '#FCC624' },
    ],
  },
  {
    id: 'mobile',
    icon: '📱',
    title: 'Développement Mobile',
    items: [
      { name: 'Java', Icon: SiOpenjdk, color: '#f89820' },
      { name: 'Kotlin', Icon: SiKotlin, color: '#7F52FF' },
      { name: 'Android Studio', Icon: SiAndroidstudio, color: '#3DDC84' },
      { name: 'Flutter', Icon: SiFlutter, color: '#02569B' },
      { name: 'Dart', Icon: SiDart, color: '#0175C2' },
      { name: 'XML', Icon: SiXml, color: '#F16529' },
    ],
  },
  {
    id: 'watch',
    icon: '📚',
    title: 'Veille technologique',
    items: [{ name: 'GitHub', Icon: SiGithub, color: '#e0e0e0' }],
  },
];

const TechIcon = ({ item, index }) => {
  const { name, Icon, color } = item;
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.03, duration: 0.35 }}
      className="group relative flex items-center justify-center"
      style={{ width: 64, height: 64 }}
    >
      <div
        className="flex items-center justify-center rounded-2xl transition-all duration-300 hover:-translate-y-1"
        style={{
          width: 56,
          height: 56,
          border: '1px solid var(--border-color)',
          backgroundColor: 'var(--bg-tertiary)',
        }}
      >
        <Icon
          size={30}
          className="transition-all duration-300"
          style={{ color: 'var(--text-secondary)' }}
          onMouseEnter={(e) => { e.currentTarget.style.color = color; }}
          onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--text-secondary)'; }}
        />
      </div>
      {/* Tooltip au survol uniquement */}
      <span
        className="pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-lg px-2.5 py-1 text-xs font-medium opacity-0 translate-y-1 transition-all duration-200 group-hover:opacity-100 group-hover:translate-y-0 z-10"
        style={{
          backgroundColor: 'var(--bg-primary)',
          color: 'var(--text-primary)',
          border: '1px solid var(--border-color)',
          boxShadow: '0 4px 12px rgba(0,0,0,0.25)',
        }}
      >
        {name}
      </span>
    </motion.div>
  );
};

const CategorySection = ({ category }) => (
  <motion.section
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.1 }}
    transition={{ duration: 0.5 }}
    className="rounded-2xl p-6 sm:p-8"
    style={{
      border: '1px solid var(--border-color)',
      backgroundColor: 'var(--bg-secondary)',
    }}
  >
    <h2
      className="text-lg font-semibold mb-6 flex items-center gap-3"
      style={{ color: 'var(--text-primary)' }}
    >
      <span className="text-xl">{category.icon}</span>
      {category.title}
    </h2>
    <div className="flex flex-wrap gap-3 sm:gap-4">
      {category.items.map((item, i) => (
        <TechIcon key={`${category.id}-${item.name}`} item={item} index={i} />
      ))}
    </div>
  </motion.section>
);

const Skills = () => {

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

            <div className="flex flex-col gap-6">
              {CATEGORIES.map((category) => (
                <CategorySection key={category.id} category={category} />
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Skills;