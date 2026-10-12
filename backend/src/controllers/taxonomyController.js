const {
  Op
} = require('sequelize');
const {
  Category,
  Technology,
  Project
} = require('../models');
const {
  asyncHandler,
  ApiError
} = require('../middleware/errorHandler');

const slugify = (s) =>
  s.toString().toLowerCase().trim()
  .replace(/[^a-z0-9\s-]/g, '').replace(/[\s_]+/g, '-')
  .replace(/-+/g, '-').replace(/^-|-$/g, '');

// ---------- Category ----------
const getCategories = asyncHandler(async (req, res) => {
  const categories = await Category.findAll({
    include: [{
      model: Project,
      attributes: ['id']
    }],
    order: [
      ['name', 'ASC']
    ],
  });
  const withCount = categories.map((c) => ({
    ...c.get(),
    projects_count: c.Projects ? c.Projects.length : 0,
    Projects: undefined,
  }));
  res.json({
    success: true,
    categories: withCount
  });
});

const createCategory = asyncHandler(async (req, res) => {
  const name = req.body.name ?.trim();
  if (!name) throw new ApiError(400, 'Name is required');
  const category = await Category.create({
    name,
    slug: slugify(name)
  });
  res.status(201).json({
    success: true,
    message: 'Category created',
    category
  });
});

const updateCategory = asyncHandler(async (req, res) => {
  const category = await Category.findByPk(req.params.id);
  if (!category) throw new ApiError(404, 'Category not found');
  const name = req.body.name ?.trim() || category.name;
  await category.update({
    name,
    slug: slugify(name)
  });
  res.json({
    success: true,
    message: 'Category updated',
    category
  });
});

const deleteCategory = asyncHandler(async (req, res) => {
  const category = await Category.findByPk(req.params.id);
  if (!category) throw new ApiError(404, 'Category not found');
  const count = await Project.count({
    where: {
      category_id: category.id
    }
  });
  if (count > 0) throw new ApiError(400, `Cannot delete: ${count} project(s) use this category`);
  await category.destroy();
  res.json({
    success: true,
    message: 'Category deleted'
  });
});

// ---------- Technology ----------
const getTechnologies = asyncHandler(async (req, res) => {
  const technologies = await Technology.findAll({
    order: [
      ['name', 'ASC']
    ]
  });
  res.json({
    success: true,
    technologies
  });
});

const createTechnology = asyncHandler(async (req, res) => {
  if (!req.body.name ?.trim()) throw new ApiError(400, 'Name is required');
  const data = {
    name: req.body.name.trim()
  };
  if (req.file) data.icon = `publicPath(req, req.file)`;
  const technology = await Technology.create(data);
  res.status(201).json({
    success: true,
    message: 'Technology created',
    technology
  });
});

const deleteTechnology = asyncHandler(async (req, res) => {
  const technology = await Technology.findByPk(req.params.id);
  if (!technology) throw new ApiError(404, 'Technology not found');
  await technology.destroy();
  res.json({
    success: true,
    message: 'Technology deleted'
  });
});

module.exports = {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
  getTechnologies,
  createTechnology,
  deleteTechnology,
};