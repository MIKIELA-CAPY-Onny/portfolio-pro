const {
  DataTypes
} = require('sequelize');
const sequelize = require('../config/database');

// ---------- helpers ----------
const id = {
  type: DataTypes.BIGINT.UNSIGNED,
  autoIncrement: true,
  primaryKey: true,
};
const ts = {
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
};

// ---------- Profile ----------
const Profile = sequelize.define('Profile', {
  id,
  fullname: {
    type: DataTypes.STRING(150),
    allowNull: false
  },
  profession: DataTypes.STRING(200),
  slogan: DataTypes.STRING(255),
  biography: DataTypes.TEXT('long'),
  avatar: DataTypes.STRING(255),
  cv: DataTypes.STRING(255),
  birthday: DataTypes.DATEONLY,
  nationality: DataTypes.STRING(100),
  city: DataTypes.STRING(120),
  country: DataTypes.STRING(120),
  email: DataTypes.STRING(150),
  phone: DataTypes.STRING(50),
  website: DataTypes.STRING(255),
  github: DataTypes.STRING(255),
  linkedin: DataTypes.STRING(255),
  portfolio: DataTypes.STRING(255),
  years_experience: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  projects_completed: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  clients: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
}, {
  ...ts,
  tableName: 'profiles'
});

// ---------- Setting ----------
const Setting = sequelize.define('Setting', {
  id,
  site_name: DataTypes.STRING(150),
  logo: DataTypes.STRING(255),
  favicon: DataTypes.STRING(255),
  email: DataTypes.STRING(150),
  phone: DataTypes.STRING(50),
  address: DataTypes.STRING(255),
  github: DataTypes.STRING(255),
  linkedin: DataTypes.STRING(255),
  facebook: DataTypes.STRING(255),
  twitter: DataTypes.STRING(255),
  instagram: DataTypes.STRING(255),
  seo_title: DataTypes.STRING(255),
  seo_description: DataTypes.TEXT,
  seo_keywords: DataTypes.TEXT,
  maintenance_mode: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
}, {
  ...ts,
  tableName: 'settings'
});

// ---------- Skill ----------
const Skill = sequelize.define('Skill', {
  id,
  name: DataTypes.STRING(100),
  category: DataTypes.STRING(100),
  level: {
    type: DataTypes.TINYINT,
    defaultValue: 3
  },
  icon: DataTypes.STRING(255),
  description: DataTypes.TEXT,
  sort_order: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
}, {
  ...ts,
  tableName: 'skills'
});

// ---------- Education ----------
const Education = sequelize.define('Education', {
  id,
  school: DataTypes.STRING(200),
  diploma: DataTypes.STRING(200),
  description: DataTypes.TEXT,
  start_year: DataTypes.INTEGER,
  end_year: DataTypes.INTEGER,
  logo: DataTypes.STRING(255),
}, {
  ...ts,
  tableName: 'educations'
});

// ---------- Experience ----------
const Experience = sequelize.define('Experience', {
  id,
  company: DataTypes.STRING(200),
  position: DataTypes.STRING(200),
  description: DataTypes.TEXT('long'),
  location: DataTypes.STRING(150),
  logo: DataTypes.STRING(255),
  start_date: DataTypes.DATEONLY,
  end_date: DataTypes.DATEONLY,
  current_job: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
}, {
  ...ts,
  tableName: 'experiences'
});

// ---------- Certification ----------
const Certification = sequelize.define('Certification', {
  id,
  title: DataTypes.STRING(255),
  organization: DataTypes.STRING(200),
  issue_date: DataTypes.DATEONLY,
  pdf: DataTypes.STRING(255),
  image: DataTypes.STRING(255),
}, {
  ...ts,
  tableName: 'certifications'
});

// ---------- Service ----------
const Service = sequelize.define('Service', {
  id,
  title: DataTypes.STRING(200),
  description: DataTypes.TEXT,
  icon: DataTypes.STRING(255),
  price: DataTypes.STRING(100),
  active: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
}, {
  ...ts,
  tableName: 'services'
});

// ---------- Category ----------
const Category = sequelize.define('Category', {
  id,
  name: {
    type: DataTypes.STRING(100),
    unique: true
  },
  slug: {
    type: DataTypes.STRING(120),
    unique: true
  },
}, {
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: false,
  tableName: 'categories'
});

// ---------- Technology ----------
const Technology = sequelize.define('Technology', {
  id,
  name: DataTypes.STRING(120),
  icon: DataTypes.STRING(255),
}, {
  timestamps: false,
  tableName: 'technologies'
});

// ---------- Project ----------
const Project = sequelize.define('Project', {
  id,
  category_id: DataTypes.BIGINT.UNSIGNED,
  title: DataTypes.STRING(200),
  slug: {
    type: DataTypes.STRING(255),
    unique: true
  },
  short_description: DataTypes.TEXT,
  description: DataTypes.TEXT('long'),
  github_url: DataTypes.STRING(255),
  demo_url: DataTypes.STRING(255),
  cover_image: DataTypes.STRING(255),
  featured: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  published: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  project_date: DataTypes.DATEONLY,
  views: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  sort_order: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
}, {
  ...ts,
  tableName: 'projects'
});

// ---------- ProjectImage ----------
const ProjectImage = sequelize.define('ProjectImage', {
  id,
  project_id: {
    type: DataTypes.BIGINT.UNSIGNED,
    allowNull: false
  },
  image: DataTypes.STRING(255),
}, {
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: false,
  tableName: 'project_images'
});

// ---------- Media ----------
const Media = sequelize.define('Media', {
  id,
  filename: DataTypes.STRING(255),
  original_name: DataTypes.STRING(255),
  mime_type: DataTypes.STRING(100),
  size: DataTypes.BIGINT,
  path: DataTypes.STRING(255),
}, {
  timestamps: true,
  createdAt: 'uploaded_at',
  updatedAt: false,
  tableName: 'media'
});

// ---------- Contact ----------
const Contact = sequelize.define('Contact', {
  id,
  fullname: DataTypes.STRING(150),
  email: DataTypes.STRING(150),
  subject: DataTypes.STRING(255),
  message: DataTypes.TEXT('long'),
  is_read: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  replied: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
}, {
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: false,
  tableName: 'contacts'
});

// ---------- Visitor ----------
const Visitor = sequelize.define('Visitor', {
  id,
  ip_address: DataTypes.STRING(45),
  browser: DataTypes.STRING(255),
  os: DataTypes.STRING(255),
  country: DataTypes.STRING(120),
  city: DataTypes.STRING(120),
}, {
  timestamps: true,
  createdAt: 'visited_at',
  updatedAt: false,
  tableName: 'visitors'
});

// ---------- Download ----------
const Download = sequelize.define('Download', {
  id,
  ip_address: DataTypes.STRING(45),
}, {
  timestamps: true,
  createdAt: 'downloaded_at',
  updatedAt: false,
  tableName: 'downloads'
});

// ---------- Testimonial ----------
const Testimonial = sequelize.define('Testimonial', {
  id,
  fullname: DataTypes.STRING(150),
  company: DataTypes.STRING(150),
  photo: DataTypes.STRING(255),
  message: DataTypes.TEXT,
  rating: {
    type: DataTypes.TINYINT,
    defaultValue: 5
  },
  published: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
}, {
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: false,
  tableName: 'testimonials'
});

// ---------- Log ----------
const Log = sequelize.define('Log', {
  id,
  admin_id: DataTypes.BIGINT.UNSIGNED,
  action: DataTypes.STRING(255),
  description: DataTypes.TEXT,
  ip_address: DataTypes.STRING(45),
}, {
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: false,
  tableName: 'logs'
});

// ---------- Associations ----------
Project.belongsTo(Category, {
  foreignKey: 'category_id',
  as: 'category'
});
Category.hasMany(Project, {
  foreignKey: 'category_id'
});
Project.hasMany(ProjectImage, {
  foreignKey: 'project_id',
  as: 'images'
});
ProjectImage.belongsTo(Project, {
  foreignKey: 'project_id'
});
Project.belongsToMany(Technology, {
  through: 'project_technologies',
  foreignKey: 'project_id',
  otherKey: 'technology_id',
  as: 'technologies',
});
Technology.belongsToMany(Project, {
  through: 'project_technologies',
  foreignKey: 'technology_id',
  otherKey: 'project_id',
});

module.exports = {
  sequelize,
  Admin: require('./Admin'),
  Profile,
  Setting,
  Skill,
  Education,
  Experience,
  Certification,
  Service,
  Category,
  Technology,
  Project,
  ProjectImage,
  Media,
  Contact,
  Visitor,
  Download,
  Testimonial,
  Log,
};