// api/models/index.js
const { Sequelize } = require('sequelize');
const sequelize = require('../config/database');
const UserModel = require('./user');

const User = UserModel(sequelize, Sequelize.DataTypes);

module.exports = {
  sequelize,
  User,
};
