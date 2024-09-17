const express = require('express');
const router = express.Router();

// GET: Test route
router.get('/', (req, res) => {
  res.status(200).json({ message: 'GET request successful!' });
});

// POST: Test route
router.post('/', (req, res) => {
  const { message } = req.body;

  // Validação simples para verificar se a mensagem foi enviada
  if (!message) {
    return res.status(400).json({ message: 'Please provide a message in the request body' });
  }

  res.status(201).json({ message: `POST request successful: ${message}` });
});

module.exports = router;
