const {
  Op
} = require('sequelize');
const {
  Skill
} = require('../models');
const {
  asyncHandler,
  ApiError
} = require('../middleware/errorHandler');

const getSkills = asyncHandler(async (req, res) => {
  const {
    category,
    search
  } = req.query;
  const where = {};
  if (category) where.category = category;
  if (search) where.name = {
    [Op.like]: `%${search}%`
  };
  const skills = await Skill.findAll({
    where,
    order: [
      ['sort_order', 'ASC'],
      ['name', 'ASC']
    ]
  });
  res.json({
    success: true,
    skills
  });
});

const getSkill = asyncHandler(async (req, res) => {
  const skill = await Skill.findByPk(req.params.id);
  if (!skill) throw new ApiError(404, 'Skill not found');
  res.json({
    success: true,
    skill
  });
});

const createSkill = asyncHandler(async (req, res) => {
  const data = {
    ...req.body
  };
  if (req.file) data.icon = `/uploads/images/${req.file.filename}`;
  const skill = await Skill.create(data);
  res.status(201).json({
    success: true,
    message: 'Skill created',
    skill
  });
});

const updateSkill = asyncHandler(async (req, res) => {
  const skill = await Skill.findByPk(req.params.id);
  if (!skill) throw new ApiError(404, 'Skill not found');
  const data = {
    ...req.body
  };
  if (req.file) data.icon = `/uploads/images/${req.file.filename}`;
  await skill.update(data);
  res.json({
    success: true,
    message: 'Skill updated',
    skill
  });
});

const deleteSkill = asyncHandler(async (req, res) => {
  const skill = await Skill.findByPk(req.params.id);
  if (!skill) throw new ApiError(404, 'Skill not found');
  await skill.destroy();
  res.json({
    success: true,
    message: 'Skill deleted'
  });
});

module.exports = {
  getSkills,
  getSkill,
  createSkill,
  updateSkill,
  deleteSkill
};