const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./config/db");
const userRoutes = require("./api/routes/userRoutes");
const PORT = process.env.PORT || 4000;
const testDBConnection = async () => {
  try {
    const connection = await pool.getConnection();
    console.log("Conexão com o banco de dados bem-sucedida!");
    connection.release();
  } catch (error) {
    console.error("Erro ao conectar ao banco de dados:", error);
  }
};

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use("/api/users", userRoutes);
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API funcionando!");
});

app.listen(PORT, async () => {
  console.log(`Servidor rodando na porta ${PORT}`);
  await testDBConnection(); 
});
