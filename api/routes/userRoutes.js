const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Rotas de usuários
router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/', userController.listUsers); // Listar usuários
router.delete('/:userId', userController.deleteUser); // Deletar usuário

module.exports = router;
