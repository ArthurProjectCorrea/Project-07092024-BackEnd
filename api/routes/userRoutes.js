import express from 'express';
import * as userController from '../controllers/userController.js'; // Adicione a extensão ".js"

const router = express.Router();

router.post("/signup", userController.signup);
router.post("/login", userController.authenticate); // Nova rota para autenticação
router.delete("/:id", userController.deleteUser);
router.get("/:id", userController.getUserById);
router.get("/", userController.getAllUsers);

export default router;
