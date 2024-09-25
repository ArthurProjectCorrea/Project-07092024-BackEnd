// api/services/userService.js
const { User } = require("../models");
const bcrypt = require("bcryptjs");

module.exports = {
  async createUser({ name, email, password }) {
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await User.create({ name, email, password: hashedPassword });
      return user;
    } catch (error) {
      throw new Error("Error creating user");
    }
  },

  async findUserByEmail(email) {
    try {
      const user = await User.findOne({ where: { email } });
      return user;
    } catch (error) {
      throw new Error("Error finding user by email");
    }
  },

  async getAllUsers() {
    try {
      const users = await User.findAll();
      return users;
    } catch (error) {
      throw new Error("Error fetching users");
    }
  },
};
