// api/routes/emailRoutes.js

import express from 'express';
import { enviarEmail } from '../controllers/emailController.js';

const router = express.Router();

router.post('/send-email', enviarEmail);

export default router;
