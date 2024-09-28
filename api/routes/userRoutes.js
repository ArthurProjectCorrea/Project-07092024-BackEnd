const express = require('express'); // Mudei para require
const userController = require('../controllers/userController.js'); // Ajuste a importação do controlador
const authenticateToken = require('../middleware/authMiddleware.js');

const router = express.Router();

router.get('/profile', authenticateToken, userController.getProfile);

router.post("/signup", userController.signup);
router.post("/login", userController.authenticate); // Nova rota para autenticação
router.delete("/:id", userController.deleteUser);
router.get("/:id", userController.getUserById);
router.get("/", userController.getAllUsers);
router.post("/sendCode", userController.sendCode ); 
router.post('/checkCode', userController.checkCode);
router.post("/resetPassword", userController.resetPassword);

module.exports = router; // Mudei para module.exports
