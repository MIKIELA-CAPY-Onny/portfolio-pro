const {
  DataTypes
} = require('sequelize');
const sequelize = require('../config/database');
const bcrypt = require('bcryptjs');

const Admin = sequelize.define('Admin', {
  id: {
    type: DataTypes.BIGINT.UNSIGNED,
    autoIncrement: true,
    primaryKey: true
  },
  fullname: {
    type: DataTypes.STRING(150),
    allowNull: false
  },
  email: {
    type: DataTypes.STRING(150),
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  password: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  avatar: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  role: {
    type: DataTypes.ENUM('ADMIN'),
    defaultValue: 'ADMIN'
  },
  last_login: {
    type: DataTypes.DATE,
    allowNull: true
  },
}, {
  tableName: 'admins',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  hooks: {
    beforeSave: async (admin) => {
      if (admin.changed('password')) admin.password = await bcrypt.hash(admin.password, 12);
    },
  },
});

Admin.prototype.comparePassword = function (candidate) {
  return bcrypt.compare(candidate, this.password);
};

Admin.prototype.safe = function () {
  const {
    password,
    ...rest
  } = this.get();
  return rest;
};

module.exports = Admin;