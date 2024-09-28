const { User } = require('../models'); // Certifique-se de que o modelo User está corretamente importado
const bcrypt = require('bcrypt');

// Função para verificar se o email já existe
const emailExists = async (email) => {
  const user = await User.findOne({ where: { email } });
  return !!user; // Retorna true se o email já estiver em uso, caso contrário, false
};

// Função para validar o domínio do email
const isEmailValidDomain = (email) => {
  const validDomains = ['gmail.com', 'yahoo.com']; // Defina os domínios válidos
  const domain = email.split('@')[1];
  return validDomains.includes(domain);
};

// Função para obter um usuário pelo email
const getUserByEmail = async (email) => {
  return User.findOne({ where: { email } });
};

// Função para criar um novo usuário
const createUser = async (userData) => {
  const { password } = userData;

  // Criptografar a senha antes de salvar o usuário
  const hashedPassword = await bcrypt.hash(password, 10); // "10" é o fator de custo para o hashing

  const newUser = await User.create({
    ...userData,
    password: hashedPassword, // Usando a senha criptografada
  });

  return newUser;
};

const authenticateUser = async (email, password) => {
  // Buscar o usuário pelo email
  const user = await User.findOne({ where: { email } });
  
  if (!user) {
    return null; // Se o usuário não for encontrado, retorna null
  }

  // Comparar a senha fornecida com a senha criptografada no banco
  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return null; // Se a senha estiver incorreta, retorna null
  }

  return user; // Retorna o usuário se a senha estiver correta
};

// Função para deletar um usuário pelo ID
const deleteUser = async (id) => {
  const deletedCount = await User.destroy({ where: { id } });
  return deletedCount; // Retorna o número de registros deletados (0 ou 1)
};

// Função para buscar um usuário pelo ID
const getUserById = async (id) => {
  const user = await User.findByPk(id);
  return user; // Retorna o usuário encontrado ou null
};

// Função para buscar todos os usuários
const getAllUsers = async () => {
  const users = await User.findAll();
  return users; // Retorna todos os usuários
};



const resetPassword = async (email, newPassword) => {
  const user = await User.findOne({ where: { email } });

  if (!user) {
    throw new Error('Usuário não encontrado');
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10); // Hash da senha
  user.password = hashedPassword; 
  await user.save();
  return user; // Retorna o usuário atualizado
};

module.exports = {
  emailExists,
  getUserByEmail,
  isEmailValidDomain,
  createUser,
  authenticateUser,
  deleteUser,
  getUserById,
  getAllUsers,
  resetPassword,
};
