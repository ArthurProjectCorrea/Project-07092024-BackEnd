// api/services/emailService.js
const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  service: 'gmail', // ou outro serviço de e-mail que você estiver usando
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendEmail = async (to, subject, text) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject,
    text,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Email enviado com sucesso');
  } catch (error) {
    console.error('Erro ao enviar e-mail:', error);
    throw error; // Re-throw para que o erro seja tratado na camada superior
  }
};

module.exports = {
  sendEmail,
};
