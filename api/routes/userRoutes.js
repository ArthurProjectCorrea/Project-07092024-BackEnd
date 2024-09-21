const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

// Rotas de usuários
router.post("/signup", userController.signup); // Registro de usuário
router.post("/signin", userController.signin); // signin de usuário (autenticação)
router.get("/", userController.listUsers); // Listar usuários
router.delete("/:userId", userController.deleteUser); // Deletar usuário

module.exports = router;
