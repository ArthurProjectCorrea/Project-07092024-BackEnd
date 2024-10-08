const transporter = require('../config/emailConfig.js'); // Mudou para require

// Controlador para enviar email via HTTP request
const enviarEmail = async (req, res) => {
  const { to, subject, message } = req.body;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject,
    text: message,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true, message: 'Email enviado com sucesso!' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Erro ao enviar email', error });
  }
};

module.exports = { enviarEmail }; // Mudou para module.exports
