const multer = require('multer');
const path = require('path');
const fs = require('fs');
const crypto = require('crypto');
const {
  ApiError
} = require('./errorHandler');

const UPLOAD_DIR = path.resolve(__dirname, '../../', process.env.UPLOAD_DIR || 'src/uploads');
const MAX_FILE_SIZE = parseInt(process.env.MAX_FILE_SIZE || '10485760', 10);

const ALLOWED_MIME = [
  'image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml',
  'application/pdf',
];

const ensureDir = (sub) => {
  const dir = path.join(UPLOAD_DIR, sub);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, {
    recursive: true
  });
  return dir;
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const sub = file.mimetype === 'application/pdf' ? 'documents' : 'images';
    cb(null, ensureDir(sub));
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    cb(null, `${Date.now()}-${crypto.randomBytes(6).toString('hex')}${ext}`);
  },
});

const fileFilter = (req, file, cb) => {
  if (!ALLOWED_MIME.includes(file.mimetype)) {
    return cb(new ApiError(400, `File type not allowed: ${file.mimetype}`));
  }
  cb(null, true);
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: MAX_FILE_SIZE },
});

// multi-file upload used by certifications & projects (cover + gallery images + pdf)
const uploadCertFiles = multer({ storage, fileFilter, limits: { fileSize: MAX_FILE_SIZE } }).fields([
  { name: 'file', maxCount: 1 },
  { name: 'cover', maxCount: 1 },
  { name: 'image', maxCount: 1 },
  { name: 'pdf', maxCount: 1 },
  { name: 'gallery', maxCount: 10 },
]);

module.exports = { upload, uploadCertFiles, UPLOAD_DIR, ensureDir };