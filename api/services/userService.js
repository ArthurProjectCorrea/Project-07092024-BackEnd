const bcrypt = require('bcryptjs');
const UserModel = require('../models/userModel');

const UserService = {
  signup: async (name, email, password, accesses_id) => {
    try {
      // Criptografar a senha
      const hashedPassword = await bcrypt.hash(password, 10);
      
      // Tentar criar o usuário
      const newUser = await UserModel.createUser(name, email, hashedPassword, accesses_id);
      return newUser;
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        throw new Error('Email already exists');
      }
      throw error;
    }
  },
};

module.exports = UserService;
