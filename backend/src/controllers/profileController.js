const {
  Profile
} = require('../models');
const {
  asyncHandler,
  ApiError
} = require('../middleware/errorHandler');

// GET /api/profile (public)
const getProfile = asyncHandler(async (req, res) => {
  const profile = await Profile.findOne({
    order: [
      ['id', 'ASC']
    ]
  });
  res.json({
    success: true,
    profile
  });
});

// PUT /api/admin/profile (admin)
const updateProfile = asyncHandler(async (req, res) => {
  let profile = await Profile.findOne({
    order: [
      ['id', 'ASC']
    ]
  });
  if (!profile) profile = await Profile.create({});
  await profile.update(req.body);
  res.json({
    success: true,
    message: 'Profile updated',
    profile
  });
});

// POST /api/admin/profile/cv (admin) – CV upload
const uploadCv = asyncHandler(async (req, res) => {
  if (!req.file) throw new ApiError(400, 'No file uploaded');
  let profile = await Profile.findOne({
    order: [
      ['id', 'ASC']
    ]
  });
  if (!profile) profile = await Profile.create({});
  await profile.update({
    cv: `/uploads/documents/${req.file.filename}`
  });
  res.json({
    success: true,
    message: 'CV uploaded',
    cv: profile.cv
  });
});

module.exports = {
  getProfile,
  updateProfile,
  uploadCv
};