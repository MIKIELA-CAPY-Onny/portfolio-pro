const {
  Op,
  fn,
  col,
  literal
} = require('sequelize');
const {
  Project,
  Contact,
  Visitor,
  Skill,
  Experience,
  Education,
  Certification,
  Service,
  Media,
  Profile,
  Log,
} = require('../models');
const {
  asyncHandler
} = require('../middleware/errorHandler');

// GET /api/admin/dashboard
const getDashboard = asyncHandler(async (req, res) => {
  const [totalProjects, unreadMessages, totalVisitors, totalSkills, totalExperiences,
    totalEducations, totalCertifications, totalServices, totalMedia, profile
  ] =
  await Promise.all([
    Project.count(),
    Contact.count({
      where: {
        is_read: false
      }
    }),
    Visitor.count(),
    Skill.count(),
    Experience.count(),
    Education.count(),
    Certification.count(),
    Service.count(),
    Media.count(),
    Profile.findOne({
      order: [
        ['id', 'ASC']
      ]
    }),
  ]);

  // visitors per day, last 14 days
  const since = new Date(Date.now() - 13 * 24 * 60 * 60 * 1000);
  since.setHours(0, 0, 0, 0);
  const dailyVisitors = await Visitor.findAll({
    attributes: [
      [fn('DATE', col('visited_at')), 'date'],
      [fn('COUNT', col('id')), 'count'],
    ],
    where: {
      visited_at: {
        [Op.gte]: since
      }
    },
    group: [fn('DATE', col('visited_at'))],
    order: [
      [fn('DATE', col('visited_at')), 'ASC']
    ],
    raw: true,
  });

  // top projects by views
  const topProjects = await Project.findAll({
    attributes: ['id', 'title', 'views'],
    order: [
      ['views', 'DESC']
    ],
    limit: 5,
    raw: true,
  });

  const recentMessages = await Contact.findAll({
    order: [
      ['created_at', 'DESC']
    ],
    limit: 5
  });

  const recentLogs = await Log.findAll({
    order: [
      ['created_at', 'DESC']
    ],
    limit: 8
  });

  res.json({
    success: true,
    stats: {
      totalProjects,
      unreadMessages,
      totalVisitors,
      totalSkills,
      totalExperiences,
      totalEducations,
      totalCertifications,
      totalServices,
      totalMedia,
      yearsExperience: profile ?.years_experience || 0,
      projectsCompleted: profile ?.projects_completed || 0,
    },
    dailyVisitors,
    topProjects,
    recentMessages,
    recentLogs,
  });
});

// PUT /api/admin/logs – clear logs (optional housekeeping)
const clearLogs = asyncHandler(async (req, res) => {
  await Log.destroy({
    where: {},
    truncate: true
  });
  res.json({
    success: true,
    message: 'Logs cleared'
  });
});

module.exports = {
  getDashboard,
  clearLogs
};