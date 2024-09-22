const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');
const userRoutes = require("./api/routes/userRoutes");
const authRoutes = require("./api/routes/authRoutes"); // Importa as rotas de autenticação
const passport = require('passport');
const session = require('express-session');
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

// Configuração da sessão
app.use(session({
    secret: process.env.JWT_SECRET, // Use a chave secreta do JWT
    resave: false,
    saveUninitialized: true,
}));

app.use(passport.initialize());
app.use(passport.session());

// Conexão ao MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB", err);
  });

// Usando as rotas de usuário
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes); // Usando as rotas de autenticação

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
