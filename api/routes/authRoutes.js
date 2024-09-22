const express = require("express");
const passport = require("passport");
const router = express.Router();

// Rota para iniciar o login com Google
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

// Rota de callback do Google
router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/login", // Redirecionar em caso de falha
  }),
  (req, res) => {
    // Sucesso, redirecionar ou retornar o usuário
    res.redirect("/"); // Ou redirecionar para onde desejar
  }
);

module.exports = router;
