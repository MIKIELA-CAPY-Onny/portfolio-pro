const {
  Setting,
  sequelize
} = require('../models');
const {
  asyncHandler
} = require('../middleware/errorHandler');

// GET /api/settings (public)
const getSettings = asyncHandler(async (req, res) => {
  let setting = await Setting.findOne({
    order: [
      ['id', 'ASC']
    ]
  });
  if (!setting) setting = await Setting.create({
    site_name: 'Portfolio'
  });
  res.json({
    success: true,
    setting
  });
});

// PUT /api/admin/settings (admin)
const updateSettings = asyncHandler(async (req, res) => {
  let setting = await Setting.findOne({
    order: [
      ['id', 'ASC']
    ]
  });
  if (!setting) setting = await Setting.create({});
  if (req.file) setting.logo = `publicPath(req, req.file)`;
  await setting.update(req.body);
  res.json({
    success: true,
    message: 'Settings updated',
    setting
  });
});

module.exports = {
  getSettings,
  updateSettings
};