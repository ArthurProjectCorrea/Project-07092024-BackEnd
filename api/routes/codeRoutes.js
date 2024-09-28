const express = require("express");
const codeController = require("../controllers/codeController.js"); // Ajuste a importação do controlador

const router = express.Router();

// Rota para criar um novo código
router.post("/createCode", codeController.createCode);

// Rota para deletar um código pelo ID
router.delete("/:id", codeController.deleteCode);

// Rota para listar todos os códigos de um usuário
router.get("/:userId", codeController.getCodesByUserId);

// Rota para listar todos os códigos
router.get("/", codeController.getAllCodes);


module.exports = router;
