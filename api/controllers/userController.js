// api/controllers/userController.js
const pool = require("../../config/db");
const bcrypt = require("bcrypt");

// Função para verificar se o email já existe no banco de dados
const checkEmailExists = async (email) => {
  const [rows] = await pool.query("SELECT * FROM users WHERE email = ?", [
    email,
  ]);
  return rows.length > 0;
};

// Função para cadastrar o usuário
exports.signup = async (req, res) => {
  const { name, email, password, accesses_id } = req.body;

  try {
    // Verifica se o email já existe
    const emailExists = await checkEmailExists(email);
    if (emailExists) {
      return res.status(400).json({ error: "Email already registered" });
    }

    // Gera hash da senha
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insere o novo usuário no banco de dados
    const query = `
      INSERT INTO users (name, email, password, accesses_id)
      VALUES (?, ?, ?, ?)
    `;
    await pool.query(query, [name, email, hashedPassword, accesses_id]);

    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error("Erro ao cadastrar usuário:", error);
    res.status(500).json({ error: "Failed to create user" });
  }
};
