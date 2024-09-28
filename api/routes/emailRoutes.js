const express = require('express'); // Mudou para require
const { enviarEmail } = require('../controllers/emailController.js'); // Mudou para require

const router = express.Router();

router.post('/send-email', enviarEmail);

module.exports = router; // Mudou para module.exports
