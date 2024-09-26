// server.js
const express = require('express');
const { sequelize } = require('./api/models');
const userRoutes = require('./api/routes/userRoutes');
const emailRoutes = require('./api/routes/emailRoutes'); // Importar as rotas de e-mail

const app = express();
const cors = require("cors");
app.use(express.json());
app.use(cors());

app.use('/api/users', userRoutes);
app.use('/api/emails', emailRoutes); // Usar as rotas de e-mail

const PORT = process.env.PORT || 3000;

sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
  });
}).catch(err => {
  console.error('Erro ao sincronizar com o banco de dados:', err);
});
