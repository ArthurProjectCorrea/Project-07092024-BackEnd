const nodemailer = require('nodemailer'); // Mudou para require
const dotenv = require('dotenv'); // Mudou para require

dotenv.config();

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false, // true para 465, false para outros
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

module.exports = transporter; // Mudou para module.exports
