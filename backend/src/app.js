require('dotenv').config({
  path: require('path').resolve(__dirname, '../.env')
});
const path = require('path');
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const compression = require('compression');
const cookieParser = require('cookie-parser');
const rateLimit = require('express-rate-limit');

const sequelize = require('./config/database');
const {
  errorHandler
} = require('./middleware/errorHandler');
const {
  trackVisitor
} = require('./middleware/visitor');
const publicRoutes = require('./routes/publicRoutes');
const adminRoutes = require('./routes/adminRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();

// security & parsing
app.set('trust proxy', 1);
app.use(helmet({
  crossOriginResourcePolicy: {
    policy: 'cross-origin'
  }
}));
const corsOrigins = (process.env.CORS_ORIGIN || 'http://localhost:3000')
  .split(',')
  .map((o) => o.trim())
  .filter(Boolean);

app.use(cors({
  origin: corsOrigins,
  credentials: true,
}));
app.use(compression());
app.use(express.json({
  limit: '2mb'
}));
app.use(express.urlencoded({
  extended: true
}));
app.use(cookieParser());
if (process.env.NODE_ENV !== 'test') app.use(morgan('dev'));

// rate limiting for API – désactivé en développement, configurable via env
const apiLimiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000', 10),
  max: parseInt(process.env.RATE_LIMIT_MAX || '1000', 10),
  standardHeaders: true,
  legacyHeaders: false,
  skip: () => process.env.NODE_ENV === 'development',
  message: {
    success: false,
    message: 'Too many requests, please try again later.'
  },
});
app.use('/api', apiLimiter);

// stricter limiter for login & contact (toujours actif, c'est le but)
const strictLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 30,
  message: {
    success: false,
    message: 'Too many attempts, please try again later.'
  },
});

// visitor tracking + static uploads
app.use(trackVisitor);
app.use('/uploads', express.static(path.resolve(__dirname, '../', process.env.UPLOAD_DIR || 'src/uploads'), {
  maxAge: '7d'
}));

// routes
app.get('/api/health', (req, res) => res.json({
  success: true,
  message: 'API is running'
}));
app.use('/api/auth', strictLimiter, authRoutes);
app.use('/api', publicRoutes);
app.use('/api/admin', adminRoutes);

// 404
app.use((req, res) => res.status(404).json({
  success: false,
  message: 'Route not found'
}));

// error handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const start = async () => {
  try {
    await sequelize.authenticate();
    console.log('✔ Database connected');
    if (process.env.NODE_ENV === 'development') {
      await sequelize.sync({
        alter: true
      });
      console.log('✔ Models synchronized');
    }
    app.listen(PORT, () => console.log(`✔ Server running on http://localhost:${PORT}`));
  } catch (err) {
    console.error('✖ Failed to start:', err.message);
    process.exit(1);
  }
};

if (require.main === module) start();

module.exports = app;