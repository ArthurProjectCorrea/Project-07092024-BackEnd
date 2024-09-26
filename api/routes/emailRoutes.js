// api/routes/emailRoutes.js
const express = require('express');
const { sendEmail } = require('../services/emailService');

const router = express.Router();

// Rota para enviar e-mail
router.post('/send', async (req, res) => {
  const { to, subject, text } = req.body;

  try {
    await sendEmail(to, subject, text);
    res.status(200).json({ message: 'Email enviado com sucesso' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao enviar e-mail' });
  }
});

module.exports = router;
