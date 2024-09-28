// api/services/emailService.js

import transporter from '../config/emailConfig.js';

const sendEmail = async (to, subject, message) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject,
    text: message,
  };

  return transporter.sendMail(mailOptions);
};

export { sendEmail };
