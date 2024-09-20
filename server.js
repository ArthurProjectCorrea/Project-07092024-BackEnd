const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');
const userRoutes = require("./api/routes/userRoutes");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

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

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
