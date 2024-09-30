const userService = require("../services/userService.js"); // Importa o serviço de usuário
const { sendEmail } = require("../services/emailService.js"); // Importa o serviço de email
const codeService = require("../services/codeService.js"); // Importa o serviço de código
const { randomInt } = require("crypto"); // Para gerar números aleatórios
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

// Função para verificar o código
const sendCode = async (req, res) => {
  const { email } = req.body;

  try {
    // Verificar se o email existe
    const userExists = await userService.emailExists(email);
    if (!userExists) {
      return res.status(404).json({ error: "Email not found." });
    }

    // Gerar um código aleatório de 6 dígitos
    const codeValue = Math.floor(100000 + Math.random() * 900000);

    // Enviar o código por e-mail
    const message = `Your verification code is: ${codeValue}`;
    await sendEmail(email, "Verification Code", message); // Usando o serviço de e-mail

    // Obter o ID do usuário
    const user = await userService.getUserByEmail(email); // Você precisa ter essa função no seu service
    const userId = user.id;

    // Armazenar o código na tabela de códigos
    await codeService.createCode(userId, codeValue);

    return res.status(200).json({ message: "Code sent successfully." });
  } catch (error) {
    console.error("Error in sendCode:", error);
    return res.status(500).json({ error: "Failed to send code." });
  }
};

const getProfile = async (req, res) => {
  try {
    const user = await userService.getUserById(req.user.id);
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }
    return res.status(200).json({ user });
  } catch (error) {
    console.error("Error fetching user profile:", error);
    return res.status(500).json({ error: "Internal server error." });
  }
};

// Função para registrar um novo usuário
const signup = async (req, res) => {
  try {
    const { email } = req.body;

    // Verificar se o email já está em uso
    const emailInUse = await userService.emailExists(email);
    if (emailInUse) {
      return res.status(400).json({ error: "Email already in use." });
    }

    // Validar o domínio do email
    const emailIsValid = userService.isEmailValidDomain(email);
    if (!emailIsValid) {
      return res.status(400).json({
        error: "Invalid email domain. Please use a valid email provider.",
      });
    }

    // Criar o usuário com a senha criptografada
    const user = await userService.createUser(req.body);
    return res.status(201).json({ message: "User created successfully", user });
  } catch (error) {
    console.error("Error creating user:", error);
    return res.status(400).json({ error: "Failed to create user" });
  }
};

// Função para autenticar o usuário
const authenticate = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Autenticar o usuário com email e senha
    const user = await userService.authenticateUser(email, password);

    if (!user) {
      return res.status(401).json({ error: "Invalid email or password." });
    }

    // Gerar o token JWT
    const token = jwt.sign(
      { id: user.id, email: user.email }, // Payload do token
      process.env.JWT_SECRET, // Segredo definido no .env
      { expiresIn: "1h" } // Expiração do token (1 hora)
    );

    // Retornar o token e o usuário
    return res.status(200).json({
      message: "Authenticated successfully",
      token, // Retorna o token gerado
      user, // Retorna as informações do usuário
    });
  } catch (error) {
    console.error("Error authenticating user:", error);
    return res.status(400).json({ error: "Authentication failed" });
  }
};

// Função para deletar um usuário
const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedCount = await userService.deleteUser(id);
    if (deletedCount === 0) {
      return res.status(404).json({ error: "User not found." });
    }
    return res.status(200).json({ message: "User deleted successfully." });
  } catch (error) {
    console.error("Error deleting user:", error);
    return res.status(400).json({ error: "Failed to delete user." });
  }
};

// Função para listar um único usuário
const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await userService.getUserById(id);
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }
    return res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    return res.status(400).json({ error: "Failed to fetch user." });
  }
};

// Função para listar todos os usuários
const getAllUsers = async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    return res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    return res.status(400).json({ error: "Failed to fetch users." });
  }
};

// Função para verificar o código
const checkCode = async (req, res) => {
  const { codeValue } = req.body;

  try {
    // Busca o código na tabela de códigos
    const codeEntry = await codeService.getCodeByValue(codeValue);
    if (!codeEntry) {
      return res.status(400).json({ error: "Code not found." });
    }

    // Se o código for encontrado, exclua-o da tabela
    await codeService.deleteCode(codeEntry.id);

    // Retorna uma resposta de sucesso
    return res
      .status(200)
      .json({ message: "Code is valid and has been deleted." });
  } catch (error) {
    console.error("Error checking code:", error);
    return res.status(500).json({ error: "Error checking code." });
  }
};

const resetPassword = async (req, res) => {
  const { email, password } = req.body;

  try {
    await userService.resetPassword(email, password);
    res
      .status(200)
      .json({ success: true, message: "Senha redefinida com sucesso!" });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Exporta as funções usando module.exports
module.exports = {
  signup,
  authenticate,
  deleteUser,
  getUserById,
  getAllUsers,
  sendCode,
  checkCode,
  resetPassword,
  getProfile,
};
