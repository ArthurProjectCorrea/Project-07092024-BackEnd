import { Sequelize } from 'sequelize';
import sequelize from '../config/database.js'; // Adicione a extensão ".js"
import UserModel from './user.js'; // Adicione a extensão ".js"

const User = UserModel(sequelize, Sequelize.DataTypes);

export {
  sequelize,
  User,
};
