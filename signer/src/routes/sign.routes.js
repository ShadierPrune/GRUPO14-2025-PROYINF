import express from 'express';
import { requestSign, confirmSign, verifySign } from '../controllers/sign.controller.js';

const router = express.Router();

// Endpoints
router.post('/request', requestSign);
router.post('/confirm', confirmSign);
router.get('/verify/:signature_id', verifySign);

export default router;
