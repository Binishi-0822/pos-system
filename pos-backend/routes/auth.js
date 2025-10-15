import express from 'express'
import {login,register,verify} from '../controllers/authController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router()

router.post('/login', login)
router.post('/register', register)
router.get('/verify', authMiddleware, verify)


export default router;
