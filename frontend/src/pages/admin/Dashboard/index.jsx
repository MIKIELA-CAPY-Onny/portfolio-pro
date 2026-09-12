﻿import {
  useEffect
} from 'react';
import {
  motion
} from 'framer-motion';
import {
  FiGrid,
  FiFolder,
  FiZap,
  FiUser,
  FiMail,
  FiSettings,
  FiBriefcase,
  FiBook,
  FiAward,
  FiImage,
} from 'react-icons/fi';
import {
  dashboardApi
} from '@api/dashboardApi';
import useFetch from '@hooks/useFetch';
import Loader from '@components/common/Loader';
import StatsCard from '@components/dashboard/StatsCard';
import {
  extractError
} from '@utils/helpers';

const quickLinks = [{
    label: 'Profil',
    path: '/admin/profile',
    icon: FiUser,
    color: 'from-indigo-500 to-indigo-600'
  },
  {
    label: 'Projets',
    path: '/admin/projects',
    icon: FiFolder,
    color: 'from-sky-500 to-sky-600'
  },
  {
    label: 'CompÃ©tences',
    path: '/admin/skills',
    icon: FiZap,
    color: 'from-emerald-500 to-emerald-600'
  },
  {
    label: 'ExpÃ©riences',
    path: '/admin/experiences',
    icon: FiBriefcase,
    color: 'from-amber-500 to-amber-600'
  },
  {
    label: 'Formations',
    path: '/admin/educations',
    icon: FiBook,
    color: 'from-violet-500 to-violet-600'
  },
  {
    label: 'Certifications',
    path: '/admin/certifications',
    icon: FiAward,
    color: 'from-rose-500 to-rose-600'
  },
  {
    label: 'Services',
    path: '/admin/services',
    icon: FiSettings,
    color: 'from-indigo-500 to-indigo-600'
  },
  {
    label: 'MÃ©dias',
    path: '/admin/media',
    icon: FiImage,
    color: 'from-sky-500 to-sky-600'
  },
];

const Dashboard = () => {
    const {
      data,
      loading,
      error,
      execute
    } = useFetch(() => dashboardApi.getStats(), {
      immediate: false
    });

    useEffect(() => {
      execute();
    }, [execute]);

    const stats = data?.stats || data?.data || data || {};

    const statCards = [{
          title: 'Projets',
          value: stats.totalProjects ?? 0,
          icon: < FiFolder size = {
            20
          }
          />, color: 'sky' }, {
            title: 'CompÃ©tences',
            value: stats.totalSkills ?? 0,
            icon: < FiZap size = {
              20
            }
            />, color: 'emerald' }, {
              title: 'Services',
              value: stats.totalServices ?? 0,
              icon: < FiSettings size = {
                20
              }
              />, color: 'amber' }, {
                title: 'Messages',
                value: stats.unreadMessages ?? 0,
                icon: < FiMail size = {
                  20
                }
                />, color: 'rose' },
              ];

              return ( <
                div >
                <
                motion.div initial = {
                  {
                    opacity: 0,
                    y: 20
                  }
                }
                animate = {
                  {
                    opacity: 1,
                    y: 0
                  }
                }
                className = "mb-8" >
                <
                h1 className = "text-2xl font-bold"
                style = {
                  {
                    color: 'var(--text-primary)'
                  }
                } > Dashboard < /h1> <
                p className = "text-sm mt-1"
                style = {
                  {
                    color: 'var(--text-muted)'
                  }
                } >
                Vue d & apos; ensemble de votre portfolio <
                /p> <
                /motion.div>

                {
                  error && ( <
                    div className = "p-4 mb-6 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm" > {
                      error
                    } <
                    /div>
                  )
                }

                {
                  loading ? ( <
                    div className = "flex justify-center py-20" >
                    <
                    Loader size = "lg"
                    text = "Chargement des statistiques..." / >
                    <
                    /div>
                  ) : ( <
                    div className = "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-8" > {
                      statCards.map((stat, i) => ( <
                        StatsCard key = {
                          stat.title
                        } {
                          ...stat
                        }
                        index = {
                          i
                        }
                        />
                      ))
                    } <
                    /div>
                  )
                }

                <
                h2 className = "text-sm font-semibold uppercase tracking-wide mb-4"
                style = {
                  {
                    color: 'var(--text-muted)'
                  }
                } >
                Gestion rapide <
                /h2> <
                div className = "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4" > {
                  quickLinks.map((link, i) => {
                    const Icon = link.icon;
                    return ( <
                      motion.a key = {
                        link.path
                      }
                      href = {
                        `#${link.path}`
                      }
                      initial = {
                        {
                          opacity: 0,
                          y: 20
                        }
                      }
                      animate = {
                        {
                          opacity: 1,
                          y: 0
                        }
                      }
                      transition = {
                        {
                          delay: i * 0.05
                        }
                      }
                      className = "admin-card flex flex-col items-center gap-3 py-6 transition-all hover:-translate-y-0.5" >
                      <
                      span className = {
                        `w-11 h-11 rounded-xl flex items-center justify-center text-white bg-gradient-to-br ${link.color}`
                      } >
                      <
                      Icon size = {
                        20
                      }
                      /> <
                      /span> <
                      span className = "text-sm font-medium"
                      style = {
                        {
                          color: 'var(--text-primary)'
                        }
                      } > {
                        link.label
                      } <
                      /span> <
                      /motion.a>
                    );
                  })
                } <
                /div> <
                /div>
              );
            };

            export default Dashboard;