// server.js

import express from 'express';
import bodyParser from 'body-parser';
import { sequelize } from './api/models/index.js';
import userRoutes from './api/routes/userRoutes.js';
import emailRoutes from './api/routes/emailRoutes.js';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config(); // Certifique-se de carregar as variáveis de ambiente

const app = express();

app.use(bodyParser.json());
app.use(express.json());
app.use(cors());

app.use('/api/users', userRoutes);
app.use('/api', emailRoutes);

const PORT = process.env.PORT || 3000;

sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
  });
}).catch(err => {
  console.error('Erro ao sincronizar com o banco de dados:', err);
});
