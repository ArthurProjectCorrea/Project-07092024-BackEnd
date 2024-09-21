const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Registrar um novo usuário
exports.signupUser = async (userData) => {
  const { name, email, password, accessTypeId } = userData;

  const userExists = await User.findOne({ email });
  if (userExists) {
    throw new Error("User already exists");
  }

  // Criptografar a senha
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = new User({
    name,
    email,
    password: hashedPassword,
    accessTypeId,
  });

  await user.save();

  return {
    _id: user._id,
    name: user.name,
    email: user.email,
    token: generateToken(user._id),
  };
};

// Fazer signin do usuário (autenticação)
exports.authenticateUser = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error("User not found");

  // Comparar a senha fornecida com a criptografada no banco
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("Invalid password");

  return {
    _id: user._id,
    name: user.name,
    email: user.email,
    token: generateToken(user._id),
  };
};

// Listar todos os usuários
exports.listUsers = async () => {
  return await User.find({});
};

// Deletar um usuário
exports.deleteUser = async (userId) => {
  return await User.findByIdAndDelete(userId);
};

// Gerar token JWT
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "1h" });
};
