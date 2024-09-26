const { User } = require("../models");
const bcrypt = require("bcrypt");

const createUser = async (userData) => {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(userData.password, saltRounds);

  const user = await User.create({
    name: userData.name,
    email: userData.email,
    password: hashedPassword,
  });

  return user;
};

const emailExists = async (email) => {
  const user = await User.findOne({ where: { email } });
  return user !== null;
};

// Função para verificar se o domínio do e-mail é válido
const isEmailValidDomain = (email) => {
  const validDomains = ["gmail.com", "hotmail.com", "yahoo.com", "outlook.com"];
  const domain = email.split("@")[1];
  return validDomains.includes(domain);
};

// Função para autenticar o usuário
const authenticateUser = async (email, password) => {
  const user = await User.findOne({ where: { email } });
  if (!user) {
    return null; // Usuário não encontrado
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return null; // Senha não corresponde
  }

  return user; // Usuário autenticado
};

// Função para deletar um usuário pelo ID
const deleteUser = async (id) => {
  const deletedCount = await User.destroy({ where: { id } });
  return deletedCount; // Retorna a quantidade de registros deletados
};

// Função para listar um único usuário pelo ID
const getUserById = async (id) => {
  const user = await User.findByPk(id);
  return user; // Retorna o usuário ou null se não encontrado
};

// Função para listar todos os usuários
const getAllUsers = async () => {
  const users = await User.findAll();
  return users; // Retorna todos os usuários
};

module.exports = {
  createUser,
  emailExists,
  isEmailValidDomain,
  authenticateUser,
  deleteUser,
  getUserById,
  getAllUsers,
};
