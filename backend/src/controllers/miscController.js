const path = require('path');
const fs = require('fs');
const {
  Media,
  Contact,
  Download,
  Profile
} = require('../models');
const {
  asyncHandler,
  ApiError
} = require('../middleware/errorHandler');
const {
  UPLOAD_DIR,
  publicPath
} = require('../middleware/upload');

// ---------- Media library ----------
const getMedia = asyncHandler(async (req, res) => {
  const page = Math.max(1, parseInt(req.query.page || '1', 10));
  const limit = Math.min(50, parseInt(req.query.limit || '20', 10));
  const {
    rows,
    count
  } = await Media.findAndCountAll({
    order: [
      ['uploaded_at', 'DESC']
    ],
    offset: (page - 1) * limit,
    limit,
  });
  res.json({
    success: true,
    media: rows,
    pagination: {
      page,
      limit,
      total: count,
      pages: Math.ceil(count / limit)
    }
  });
});

const uploadMedia = asyncHandler(async (req, res) => {
  if (!req.file) throw new ApiError(400, 'No file uploaded');
  const media = await Media.create({
    filename: req.file.filename,
    original_name: req.file.originalname,
    mime_type: req.file.mimetype,
    size: req.file.size,
    path: publicPath(req, req.file),
  });
  res.status(201).json({
    success: true,
    message: 'File uploaded',
    media
  });
});

const deleteMedia = asyncHandler(async (req, res) => {
  const media = await Media.findByPk(req.params.id);
  if (!media) throw new ApiError(404, 'Media not found');
  const filePath = path.join(UPLOAD_DIR, media.path.replace('/uploads/', ''));
  if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
  await media.destroy();
  res.json({
    success: true,
    message: 'Media deleted'
  });
});

// ---------- Contact ----------
const getContacts = asyncHandler(async (req, res) => {
  const page = Math.max(1, parseInt(req.query.page || '1', 10));
  const limit = Math.min(50, parseInt(req.query.limit || '15', 10));
  const where = {};
  if (req.query.unread === 'true') where.is_read = false;
  const {
    rows,
    count
  } = await Contact.findAndCountAll({
    where,
    order: [
      ['created_at', 'DESC']
    ],
    offset: (page - 1) * limit,
    limit,
  });
  res.json({
    success: true,
    contacts: rows,
    pagination: {
      page,
      limit,
      total: count,
      pages: Math.ceil(count / limit)
    }
  });
});

const markContactRead = asyncHandler(async (req, res) => {
  const contact = await Contact.findByPk(req.params.id);
  if (!contact) throw new ApiError(404, 'Message not found');
  await contact.update({
    is_read: true
  });
  res.json({
    success: true,
    message: 'Marked as read',
    contact
  });
});

const deleteContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findByPk(req.params.id);
  if (!contact) throw new ApiError(404, 'Message not found');
  await contact.destroy();
  res.json({
    success: true,
    message: 'Message deleted'
  });
});

// POST /api/contact (public)
const sendContact = asyncHandler(async (req, res) => {
  const {
    fullname,
    email,
    subject,
    message
  } = req.body;
  if (!fullname || !email || !message) throw new ApiError(400, 'Name, email and message are required');
  const contact = await Contact.create({
    fullname,
    email,
    subject: subject || 'No subject',
    message
  });
  res.status(201).json({
    success: true,
    message: 'Message sent successfully',
    contact: {
      id: contact.id
    }
  });
});

// GET /api/cv (public) – track download and redirect to CV file
const downloadCv = asyncHandler(async (req, res) => {
  const profile = await Profile.findOne({
    order: [
      ['id', 'ASC']
    ]
  });
  if (!profile ?.cv) throw new ApiError(404, 'CV not available');
  await Download.create({
    ip_address: req.socket.remoteAddress
  });
  res.redirect(profile.cv);
});

module.exports = {
  getMedia,
  uploadMedia,
  deleteMedia,
  getContacts,
  markContactRead,
  deleteContact,
  sendContact,
  downloadCv,
};