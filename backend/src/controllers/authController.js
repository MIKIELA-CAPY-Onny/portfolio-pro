const jwt = require('jsonwebtoken');
const {
  Admin,
  Log
} = require('../models');
const {
  asyncHandler,
  ApiError
} = require('../middleware/errorHandler');

const signToken = (admin) =>
  jwt.sign({
      id: admin.id,
      email: admin.email,
      role: admin.role
    },
    process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN || '7d'
    });

// POST /api/auth/login
const login = asyncHandler(async (req, res) => {
  const {
    email,
    password
  } = req.body;
  if (!email || !password) throw new ApiError(400, 'Email and password are required');

  const admin = await Admin.findOne({
    where: {
      email: email.toLowerCase()
    }
  });
  if (!admin || !(await admin.comparePassword(password))) {
    throw new ApiError(401, 'Invalid credentials');
  }

  await admin.update({
    last_login: new Date()
  });
  await Log.create({
    admin_id: admin.id,
    action: 'LOGIN',
    description: `${admin.email} logged in`,
    ip_address: req.socket.remoteAddress,
  });

  res.json({
    success: true,
    message: 'Logged in',
    token: signToken(admin),
    admin: admin.safe()
  });
});

// GET /api/auth/me
const me = asyncHandler(async (req, res) => {
  res.json({
    success: true,
    admin: req.admin.safe()
  });
});

// PUT /api/auth/profile
const updateProfile = asyncHandler(async (req, res) => {
  const {
    fullname,
    email,
    password
  } = req.body;
  const updates = {};
  if (fullname) updates.fullname = fullname;
  if (email) updates.email = email.toLowerCase();
  if (req.file) updates.avatar = `/uploads/images/${req.file.filename}`;
  if (password) updates.password = password;

  await req.admin.update(updates);
  res.json({
    success: true,
    message: 'Profile updated',
    admin: req.admin.safe()
  });
});

module.exports = {
  login,
  me,
  updateProfile
};