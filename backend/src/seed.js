/**
 * Seed script – creates default admin, profile and settings.
 * Usage: node src/seed.js
 */
require('dotenv').config({
  path: require('path').resolve(__dirname, '../.env')
});
const sequelize = require('./config/database');
const {
  Admin,
  Profile,
  Setting,
  Category,
  Technology,
  Education,
  Experience,
  Skill
} = require('./models');

const seed = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();

    const [admin] = await Admin.findOrCreate({
      where: {
        email: 'admin@portfolio.com'
      },
      defaults: {
        fullname: 'Portfolio Admin',
        email: 'admin@portfolio.com',
        password: 'Admin@2026',
        role: 'ADMIN',
      },
    });

    const [profile, profileCreated] = await Profile.findOrCreate({
      where: {
        id: 1
      },
      defaults: {
        fullname: 'MIKIELA CAPY ONNY TYBURS',
        profession: 'Développeur Full-Stack et Entrepreneur',
        slogan: 'Des solutions digitales innovantes et performantes',
        biography:
          'Développeur Web Full Stack passionné, étudiant en Licence 3 Génie Informatique (INPTIC – DTS). ' +
          'Entrepreneur, je allie compétences techniques et stratégie business pour créer des solutions digitales ' +
          'innovantes et performantes. Autonome, rigoureux et créatif, je vise des projets web ambitieux et impactants.\n\n' +
          'Langues : Français (bien), Anglais (intermédiaire).\n' +
          "Centres d'intérêt : Sport, Art, Voyage, Musique, Photographie.",
        email: 'mikielaonny9@gmail.com',
        phone: '077 75 99 38 / 065 74 28 37',
        github: 'https://github.com/OnnyMIKIELA-CAPY',
        website: 'https://portfolio-groupe.netlify.app/',
        portfolio: 'https://portfolio-groupe.netlify.app/',
        city: 'Owendo',
        country: 'Gabon',
      }
    });
    // Refresh profile with seed values when it's still empty/default
    if (!profileCreated && (!profile.email || profile.fullname === 'Your Name')) {
      await profile.update({
        fullname: 'MIKIELA CAPY ONNY TYBURS',
        profession: 'Développeur Full-Stack et Entrepreneur',
        slogan: 'Des solutions digitales innovantes et performantes',
        biography:
          'Développeur Web Full Stack passionné, étudiant en Licence 3 Génie Informatique (INPTIC – DTS). ' +
          'Entrepreneur, je allie compétences techniques et stratégie business pour créer des solutions digitales ' +
          'innovantes et performantes. Autonome, rigoureux et créatif, je vise des projets web ambitieux et impactants.\n\n' +
          'Langues : Français (bien), Anglais (intermédiaire).\n' +
          "Centres d'intérêt : Sport, Art, Voyage, Musique, Photographie.",
        email: 'mikielaonny9@gmail.com',
        phone: '077 75 99 38 / 065 74 28 37',
        github: 'https://github.com/OnnyMIKIELA-CAPY',
        website: 'https://portfolio-groupe.netlify.app/',
        portfolio: 'https://portfolio-groupe.netlify.app/',
        city: 'Owendo',
        country: 'Gabon',
      });
    }
    await Setting.findOrCreate({
      where: {
        id: 1
      },
      defaults: {
        site_name: 'Portfolio Pro'
      }
    });

    const categories = ['Web Application', 'Mobile App', 'API', 'E-Commerce', 'Dashboard'];
    for (const name of categories) {
      await Category.findOrCreate({
        where: {
          slug: name.toLowerCase().replace(/\s+/g, '-')
        },
        defaults: {
          name
        }
      });
    }

    const technologies = ['JavaScript', 'TypeScript', 'React', 'Node.js', 'Express', 'MySQL', 'PostgreSQL', 'MongoDB', 'Docker', 'Git'];
    for (const name of technologies) {
      await Technology.findOrCreate({
        where: {
          name
        },
        defaults: {
          name
        }
      });
    }

    // ---------- Formations ----------
    const educations = [{
        school: 'INPTIC',
        diploma: 'Licence 3 en Développement web (en cours)',
        start_year: 2025,
        end_year: 2026,
        description: 'Licence 3 Génie Informatique – Développement web.',
      },
      {
        school: 'INPTIC',
        diploma: 'Diplôme de Technicien Supérieur',
        start_year: 2024,
        end_year: 2025,
        description: 'Diplôme de Technicien Supérieur (DTS).',
      },
      {
        school: 'L.R.L / MDA',
        diploma: 'Baccalauréat B',
        start_year: 2020,
        end_year: 2021,
        description: 'Baccalauréat série B.',
      },
    ];
    for (const edu of educations) {
      const [existing] = await Education.findOrCreate({
        where: {
          school: edu.school,
          diploma: edu.diploma
        },
        defaults: edu,
      });
      await existing.update(edu);
    }

    // ---------- Expériences professionnelles ----------
    const experiences = [{
        company: 'Airtel',
        position: 'Technicien Installation Wi-Fi',
        start_date: '2026-02-15',
        end_date: '2026-02-25',
        description:
          'Installation et configuration de box Wi-Fi chez les particuliers, mise en place des équipements réseau, ' +
          "test et optimisation du signal à l'aide des applications Speedtest by Ookla et G-NetTrack, " +
          'support technique et assistance aux utilisateurs.',
      },
      {
        company: 'L.G.I.T',
        position: 'Stagiaire en Développeur Web',
        start_date: '2025-08-01',
        end_date: '2025-10-31',
        description:
          'Réalisation de plusieurs tâches techniques du domaine, incluant le développement front-end, back-end ' +
          'et la résolution de problèmes applicatifs.',
      },
      {
        company: 'Freelance',
        position: "Entrepreneur Freelance – Commerce d'articles",
        start_date: '2022-01-01',
        current_job: true,
        description:
          'Vente en ligne et physique, +30% de CA en 1 an via la digitalisation, ' +
          'système de gestion de stocks & commandes.',
      },
      {
        company: 'Sobraga',
        position: 'Aide Mécanicien',
        start_date: '2022-08-01',
        end_date: '2022-09-30',
        description:
          'Maintenance préventive et diagnostic, assistance aux réparations et à entretien des machines.',
      },
    ];
    for (const exp of experiences) {
      const [existing] = await Experience.findOrCreate({
        where: {
          company: exp.company,
          position: exp.position
        },
        defaults: exp,
      });
      await existing.update(exp);
    }

    // ---------- Compétences ----------
    const skills = [
      'Gestion de projet',
      'Développement Web',
      'Langages de programmation',
      'Design',
      'Tests et qualité du code',
      'Veille technologique',
      'Cybersécurité',
    ];
    for (const name of skills) {
      const [existing] = await Skill.findOrCreate({
        where: {
          name
        },
        defaults: {
          name,
          category: 'Compétences',
          level: 3,
        },
      });
      await existing.update({
        category: 'Compétences'
      });
    }

    console.log('✔ Seed completed');
    console.log('  Admin login → email: admin@portfolio.com | password: Admin@2026');
    process.exit(0);
  } catch (err) {
    console.error('✖ Seed failed:', err.message);
    process.exit(1);
  }
};

seed();