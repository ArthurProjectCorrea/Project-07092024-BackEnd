const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const authenticateToken = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verifica o token
    req.user = decoded; // Adiciona os dados decodificados do token à requisição
    next(); // Continua para a próxima função
  } catch (err) {
    return res.status(400).json({ error: 'Invalid token.' });
  }
};

module.exports = authenticateToken;
