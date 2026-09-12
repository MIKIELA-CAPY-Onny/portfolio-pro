const express = require('express');
const profileController = require('../controllers/profileController');
const settingController = require('../controllers/settingController');
const skillController = require('../controllers/skillController');
const careerController = require('../controllers/careerController');
const serviceController = require('../controllers/serviceController');
const projectController = require('../controllers/projectController');
const taxonomyController = require('../controllers/taxonomyController');
const miscController = require('../controllers/miscController');
const {
  asyncHandler
} = require('../middleware/errorHandler');
const {
  Setting,
  Testimonial
} = require('../models');

const router = express.Router();

// Public endpoints (read-only)
router.get('/profile', profileController.getProfile);
router.get('/settings', settingController.getSettings);
router.get('/skills', skillController.getSkills);
router.get('/skills/:id', skillController.getSkill);
router.get('/educations', careerController.getEducations);
router.get('/educations/:id', careerController.getEducation);
router.get('/experiences', careerController.getExperiences);
router.get('/experiences/:id', careerController.getExperience);
router.get('/certifications', careerController.getCertifications);
router.get('/certifications/:id', careerController.getCertification);
router.get('/services', serviceController.getServices);
router.get('/services/:id', serviceController.getService);
router.get('/projects', projectController.getProjects);
router.get('/projects/:id', projectController.getProject);
router.get('/categories', taxonomyController.getCategories);
router.get('/technologies', taxonomyController.getTechnologies);
router.get('/testimonials', asyncHandler(async (req, res) => {
  const testimonials = await Testimonial.findAll({
    where: {
      published: true
    },
    order: [
      ['created_at', 'DESC']
    ]
  });
  res.json({
    success: true,
    testimonials
  });
}));
router.post('/contact', miscController.sendContact);
router.get('/cv', miscController.downloadCv);

module.exports = router;