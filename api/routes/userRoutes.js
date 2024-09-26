const express = require("express");
const userController = require("../controllers/userController");

const router = express.Router();

router.post("/signup", userController.signup);
router.post("/login", userController.authenticate); // Nova rota para autenticação
router.delete("/:id", userController.deleteUser);
router.get("/:id", userController.getUserById);
router.get("/", userController.getAllUsers);

module.exports = router;
