// api/routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Rota de cadastro
router.post('/signup', userController.signup);

module.exports = router;
