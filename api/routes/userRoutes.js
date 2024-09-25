// api/routes/userRoutes.js
const express = require("express");
const userController = require("../controllers/userController");
const router = express.Router();

// Rota de registro de usuário
router.post("/signup", userController.signup);

// Rota para listar todos os usuários
router.get("/users", userController.getUsers);

module.exports = router;
