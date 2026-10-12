const {
  Op
} = require('sequelize');
const {
  Project,
  ProjectImage,
  Category,
  Technology
} = require('../models');
const {
  asyncHandler,
  ApiError
} = require('../middleware/errorHandler');

const {
  slugify
} = require('../utils');
const {
  publicPath
} = require('../middleware/upload');

const INCLUDE = [{
    model: Category,
    as: 'category'
  },
  {
    model: ProjectImage,
    as: 'images'
  },
  {
    model: Technology,
    as: 'technologies',
    through: {
      attributes: []
    }
  },
];

// GET /api/projects (public) – supports page, limit, category, search, featured
const getProjects = asyncHandler(async (req, res) => {
  const page = Math.max(1, parseInt(req.query.page || '1', 10));
  const limit = Math.min(50, parseInt(req.query.limit || '9', 10));
  const where = {};

  if (req.query.published !== 'false') where.published = true; // admin can pass published=false to see drafts too
  if (req.query.category) where.category_id = req.query.category;
  if (req.query.featured === 'true') where.featured = true;
  if (req.query.search) {
    where[Op.or] = [{
        title: {
          [Op.like]: `%${req.query.search}%`
        }
      },
      {
        short_description: {
          [Op.like]: `%${req.query.search}%`
        }
      },
    ];
  }

  const {
    rows,
    count
  } = await Project.findAndCountAll({
    where,
    include: INCLUDE,
    distinct: true,
    order: [
      ['sort_order', 'ASC'],
      ['project_date', 'DESC']
    ],
    offset: (page - 1) * limit,
    limit,
  });

  res.json({
    success: true,
    projects: rows,
    pagination: {
      page,
      limit,
      total: count,
      pages: Math.ceil(count / limit)
    },
  });
});

// GET /api/projects/:slug
const getProject = asyncHandler(async (req, res) => {
  const project = await Project.findOne({
    where: isNaN(req.params.id) ? {
      slug: req.params.id
    } : {
      id: req.params.id
    },
    include: INCLUDE,
  });
  if (!project) throw new ApiError(404, 'Project not found');
  await project.increment('views');
  res.json({
    success: true,
    project
  });
});

const createProject = asyncHandler(async (req, res) => {
  const data = {
    ...req.body
  };
  data.slug = data.slug ? slugify(data.slug) : slugify(data.title || `project-${Date.now()}`);
  if (req.files ?.cover ?. [0]) data.cover_image = publicPath(req, req.files.cover[0]);

  const {
    technology_ids = [], images = [], ...projectData
  } = data;
  const project = await Project.create(projectData);

  if (technology_ids.length) {
    const techs = await Technology.findAll({
      where: {
        id: technology_ids
      }
    });
    await project.setTechnologies(techs);
  }
  if (images.length) {
    await ProjectImage.bulkCreate(images.map((img) => ({
      project_id: project.id,
      image: img
    })));
  }
  const full = await Project.findByPk(project.id, {
    include: INCLUDE
  });
  res.status(201).json({
    success: true,
    message: 'Project created',
    project: full
  });
});

const updateProject = asyncHandler(async (req, res) => {
  const project = await Project.findByPk(req.params.id, {
    include: INCLUDE
  });
  if (!project) throw new ApiError(404, 'Project not found');

  const data = {
    ...req.body
  };
  if (req.files ?.cover ?. [0]) data.cover_image = publicPath(req, req.files.cover[0]);
  const {
    technology_ids,
    images,
    ...projectData
  } = data;
  // Un slug vide ou absent : on le retire pour éviter une erreur d'unicité (slug '')
  if (!projectData.slug || !String(projectData.slug).trim()) delete projectData.slug;
  await project.update(projectData);

  if (Array.isArray(technology_ids)) {
    const techs = await Technology.findAll({
      where: {
        id: technology_ids
      }
    });
    await project.setTechnologies(techs);
  }
  if (Array.isArray(images) && images.length) {
    await ProjectImage.destroy({
      where: {
        project_id: project.id
      }
    });
    await ProjectImage.bulkCreate(images.map((img) => ({
      project_id: project.id,
      image: img
    })));
  }
  const full = await Project.findByPk(project.id, {
    include: INCLUDE
  });
  res.json({
    success: true,
    message: 'Project updated',
    project: full
  });
});

const deleteProject = asyncHandler(async (req, res) => {
  const project = await Project.findByPk(req.params.id);
  if (!project) throw new ApiError(404, 'Project not found');
  await ProjectImage.destroy({
    where: {
      project_id: project.id
    }
  });
  await project.setTechnologies([]);
  await project.destroy();
  res.json({
    success: true,
    message: 'Project deleted'
  });
});

module.exports = {
  getProjects,
  getProject,
  createProject,
  updateProject,
  deleteProject
};