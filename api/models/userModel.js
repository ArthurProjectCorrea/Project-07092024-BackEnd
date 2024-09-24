const pool = require('../../config/db');

const UserModel = {
  createUser: async (name, email, hashedPassword, accesses_id) => {
    try {
      const [result] = await pool.query(
        'INSERT INTO USERS (NAME, EMAIL, PASSWORD, ACCESSES_ID) VALUES (?, ?, ?, ?)',
        [name, email, hashedPassword, accesses_id]
      );
      return result;
    } catch (error) {
      console.error('Error creating user:', error.message);
      throw error; // Lança o erro para o controller lidar
    }
  },
};

module.exports = UserModel;
