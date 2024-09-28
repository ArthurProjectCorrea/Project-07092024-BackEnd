const transporter = require('../config/emailConfig.js'); // Mudou para require

const sendEmail = async (to, subject, message) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject,
    text: message,
  };

  return transporter.sendMail(mailOptions);
};

module.exports = { sendEmail }; // Mudou para module.exports
