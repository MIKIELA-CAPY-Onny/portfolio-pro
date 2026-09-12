const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');
const {
  asyncHandler,
  ApiError
} = require('./errorHandler');

const authenticate = asyncHandler(async (req, res, next) => {
  const header = req.headers.authorization || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : null;

  if (!token) throw new ApiError(401, 'Authentication required');

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const admin = await Admin.findByPk(decoded.id);
  if (!admin) throw new ApiError(401, 'Account no longer exists');

  req.admin = admin;
  next();
});

module.exports = {
  authenticate
};