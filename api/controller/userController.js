// api/controllers/userController.js
const userService = require("../services/userService");

module.exports = {
  async signup(req, res) {
    const { name, email, password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    const existingUser = await userService.findUserByEmail(email);

    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    try {
      const newUser = await userService.createUser({ name, email, password });
      return res.status(201).json(newUser);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },

  async getUsers(req, res) {
    try {
      const users = await userService.getAllUsers();
      return res.status(200).json(users);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
};
