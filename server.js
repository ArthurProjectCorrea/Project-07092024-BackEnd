const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const userRoutes = require('./api/routes/userRoutes'); // Importando as rotas dos usuários

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors()); // Permitir requisições do frontend
app.use(express.json());

// Conectar ao MongoDB
mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Conectado ao MongoDB'))
    .catch(err => console.error('Erro ao conectar ao MongoDB:', err));

// Rotas
app.use('/api/users', userRoutes); // Configurando as rotas de usuários

// Iniciar o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
