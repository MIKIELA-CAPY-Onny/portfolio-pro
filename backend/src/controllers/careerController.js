const {
  Education,
  Experience,
  Certification
} = require('../models');
const {
  asyncHandler,
  ApiError
} = require('../middleware/errorHandler');
const {
  publicPath
} = require('../middleware/upload');

// ---------- Education ----------
const getEducations = asyncHandler(async (req, res) => {
  const educations = await Education.findAll({
    order: [
      ['end_year', 'DESC'],
      ['start_year', 'DESC']
    ]
  });
  res.json({
    success: true,
    educations
  });
});

const getEducation = asyncHandler(async (req, res) => {
  const education = await Education.findByPk(req.params.id);
  if (!education) throw new ApiError(404, 'Education not found');
  res.json({ success: true, education });
});

const createEducation = asyncHandler(async (req, res) => {
  const data = {
    ...req.body
  };
  if (req.file) data.logo = publicPath(req, req.file);
  const education = await Education.create(data);
  res.status(201).json({
    success: true,
    message: 'Education created',
    education
  });
});

const updateEducation = asyncHandler(async (req, res) => {
  const education = await Education.findByPk(req.params.id);
  if (!education) throw new ApiError(404, 'Education not found');
  const data = {
    ...req.body
  };
  if (req.file) data.logo = publicPath(req, req.file);
  await education.update(data);
  res.json({
    success: true,
    message: 'Education updated',
    education
  });
});

const deleteEducation = asyncHandler(async (req, res) => {
  const education = await Education.findByPk(req.params.id);
  if (!education) throw new ApiError(404, 'Education not found');
  await education.destroy();
  res.json({
    success: true,
    message: 'Education deleted'
  });
});

// ---------- Experience ----------
const getExperiences = asyncHandler(async (req, res) => {
  const experiences = await Experience.findAll({
    order: [
      ['start_date', 'DESC']
    ],
  });
  res.json({
    success: true,
    experiences
  });
});

const getExperience = asyncHandler(async (req, res) => {
  const experience = await Experience.findByPk(req.params.id);
  if (!experience) throw new ApiError(404, 'Experience not found');
  res.json({ success: true, experience });
});

const createExperience = asyncHandler(async (req, res) => {
  const data = {
    ...req.body
  };
  if (req.file) data.logo = publicPath(req, req.file);
  const experience = await Experience.create(data);
  res.status(201).json({
    success: true,
    message: 'Experience created',
    experience
  });
});

const updateExperience = asyncHandler(async (req, res) => {
  const experience = await Experience.findByPk(req.params.id);
  if (!experience) throw new ApiError(404, 'Experience not found');
  const data = {
    ...req.body
  };
  if (req.file) data.logo = publicPath(req, req.file);
  await experience.update(data);
  res.json({
    success: true,
    message: 'Experience updated',
    experience
  });
});

const deleteExperience = asyncHandler(async (req, res) => {
  const experience = await Experience.findByPk(req.params.id);
  if (!experience) throw new ApiError(404, 'Experience not found');
  await experience.destroy();
  res.json({
    success: true,
    message: 'Experience deleted'
  });
});

// ---------- Certification ----------
const getCertifications = asyncHandler(async (req, res) => {
  const certifications = await Certification.findAll({
    order: [
      ['issue_date', 'DESC']
    ]
  });
  res.json({
    success: true,
    certifications
  });
});

const getCertification = asyncHandler(async (req, res) => {
  const certification = await Certification.findByPk(req.params.id);
  if (!certification) throw new ApiError(404, 'Certification not found');
  res.json({ success: true, certification });
});

const createCertification = asyncHandler(async (req, res) => {
  const data = {
    ...req.body
  };
  if (req.files ?.image ?. [0]) data.image = publicPath(req, req.files.image[0]);
  if (req.files ?.pdf ?. [0]) data.pdf = publicPath(req, req.files.pdf[0]);
  const certification = await Certification.create(data);
  res.status(201).json({
    success: true,
    message: 'Certification created',
    certification
  });
});

const updateCertification = asyncHandler(async (req, res) => {
  const certification = await Certification.findByPk(req.params.id);
  if (!certification) throw new ApiError(404, 'Certification not found');
  const data = {
    ...req.body
  };
  if (req.files ?.image ?. [0]) data.image = publicPath(req, req.files.image[0]);
  if (req.files ?.pdf ?. [0]) data.pdf = publicPath(req, req.files.pdf[0]);
  await certification.update(data);
  res.json({
    success: true,
    message: 'Certification updated',
    certification
  });
});

const deleteCertification = asyncHandler(async (req, res) => {
  const certification = await Certification.findByPk(req.params.id);
  if (!certification) throw new ApiError(404, 'Certification not found');
  await certification.destroy();
  res.json({
    success: true,
    message: 'Certification deleted'
  });
});

module.exports = {
  getEducations,
  getEducation,
  createEducation,
  updateEducation,
  deleteEducation,
  getExperiences,
  getExperience,
  createExperience,
  updateExperience,
  deleteExperience,
  getCertifications,
  getCertification,
  createCertification,
  updateCertification,
  deleteCertification,
};