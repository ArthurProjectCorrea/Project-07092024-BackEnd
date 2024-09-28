const express = require('express'); // Mudou para require
const bodyParser = require('body-parser'); // Mudou para require
const { sequelize } = require('./api/models/index.js'); // Mudou para require
const userRoutes = require('./api/routes/userRoutes.js'); // Mudou para require
const codeRoutes = require('./api/routes/codeRoutes.js'); // Mudou para require
const emailRoutes = require('./api/routes/emailRoutes.js'); // Mudou para require
const cors = require('cors'); // Mudou para require
const dotenv = require('dotenv'); // Mudou para require

dotenv.config(); // Certifique-se de carregar as variáveis de ambiente

const app = express();

app.use(bodyParser.json());
app.use(express.json());
app.use(cors());

app.use('/api/users', userRoutes);
app.use('/api/codes', codeRoutes);
app.use('/api', emailRoutes);

const PORT = process.env.PORT || 4000;

sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
  });
}).catch(err => {
  console.error('Erro ao sincronizar com o banco de dados:', err);
});
