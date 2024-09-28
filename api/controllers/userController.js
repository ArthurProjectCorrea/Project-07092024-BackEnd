import * as userService from "../services/userService.js"; // Adicione a extensão ".js"

// Função para registrar um novo usuário
export const signup = async (req, res) => {
  try {
    const { email } = req.body;

    const emailInUse = await userService.emailExists(email);
    if (emailInUse) {
      return res.status(400).json({ error: "Email already in use." });
    }

    const emailIsValid = userService.isEmailValidDomain(email);
    if (!emailIsValid) {
      return res.status(400).json({
        error: "Invalid email domain. Please use a valid email provider.",
      });
    }

    const user = await userService.createUser(req.body);
    return res.status(201).json({ message: "User created successfully", user });
  } catch (error) {
    console.error("Error creating user:", error);
    return res.status(400).json({ error: "Failed to create user" });
  }
};

// Função para autenticar o usuário
export const authenticate = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userService.authenticateUser(email, password);
    if (!user) {
      return res.status(401).json({ error: "Invalid email or password." });
    }
    // Você pode adicionar um token JWT aqui se necessário
    return res
      .status(200)
      .json({ message: "Authenticated successfully", user });
  } catch (error) {
    console.error("Error authenticating user:", error);
    return res.status(400).json({ error: "Authentication failed" });
  }
};

// Função para deletar um usuário
export const deleteUser = async (req, res) => {
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
export const getUserById = async (req, res) => {
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
export const getAllUsers = async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    return res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    return res.status(400).json({ error: "Failed to fetch users." });
  }
};
