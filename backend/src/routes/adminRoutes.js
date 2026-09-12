const express = require('express');
const profileController = require('../controllers/profileController');
const settingController = require('../controllers/settingController');
const skillController = require('../controllers/skillController');
const careerController = require('../controllers/careerController');
const serviceController = require('../controllers/serviceController');
const projectController = require('../controllers/projectController');
const taxonomyController = require('../controllers/taxonomyController');
const miscController = require('../controllers/miscController');
const dashboardController = require('../controllers/dashboardController');
const {
    authenticate
} = require('../middleware/auth');
const {
    uploadCertFiles,
    upload: multerUpload
} = require('../middleware/upload');

const router = express.Router();
router.use(authenticate);

// Profile
router.put('/profile', profileController.updateProfile);
router.post('/profile/cv', multerUpload.single('file'), profileController.uploadCv);

// Settings
router.put('/settings', multerUpload.single('file'), settingController.updateSettings);

// Skills
router.get('/skills', skillController.getSkills);
router.post('/skills', multerUpload.single('file'), skillController.createSkill);
router.put('/skills/:id', multerUpload.single('file'), skillController.updateSkill);
router.delete('/skills/:id', skillController.deleteSkill);

// Education
router.get('/educations', careerController.getEducations);
router.post('/educations', multerUpload.single('file'), careerController.createEducation);
router.put('/educations/:id', multerUpload.single('file'), careerController.updateEducation);
router.delete('/educations/:id', careerController.deleteEducation);

// Experience
router.get('/experiences', careerController.getExperiences);
router.post('/experiences', multerUpload.single('file'), careerController.createExperience);
router.put('/experiences/:id', multerUpload.single('file'), careerController.updateExperience);
router.delete('/experiences/:id', careerController.deleteExperience);

// Certifications
router.get('/certifications', careerController.getCertifications);
router.post('/certifications', uploadCertFiles, careerController.createCertification);
router.put('/certifications/:id', uploadCertFiles, careerController.updateCertification);
router.delete('/certifications/:id', careerController.deleteCertification);

// Services
router.get('/services', serviceController.getServices);
router.post('/services', multerUpload.single('file'), serviceController.createService);
router.put('/services/:id', multerUpload.single('file'), serviceController.updateService);
router.delete('/services/:id', serviceController.deleteService);

// Projects
router.get('/projects', projectController.getProjects);
router.post('/projects', uploadCertFiles, projectController.createProject);
router.put('/projects/:id', uploadCertFiles, projectController.updateProject);
router.delete('/projects/:id', projectController.deleteProject);

// Categories
router.get('/categories', taxonomyController.getCategories);
router.post('/categories', taxonomyController.createCategory);
router.put('/categories/:id', taxonomyController.updateCategory);
router.delete('/categories/:id', taxonomyController.deleteCategory);

// Technologies
router.get('/technologies', taxonomyController.getTechnologies);
router.post('/technologies', multerUpload.single('file'), taxonomyController.createTechnology);
router.delete('/technologies/:id', taxonomyController.deleteTechnology);

// Media library
router.get('/media', miscController.getMedia);
router.post('/media', multerUpload.single('file'), miscController.uploadMedia);
router.delete('/media/:id', miscController.deleteMedia);

// Contacts
router.get('/contacts', miscController.getContacts);
router.put('/contacts/:id/read', miscController.markContactRead);
router.delete('/contacts/:id', miscController.deleteContact);

// Dashboard & logs
router.get('/dashboard', dashboardController.getDashboard);
router.delete('/logs', dashboardController.clearLogs);

module.exports = router;