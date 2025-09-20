import express from 'express';
import { SignIn, loginAsAgent } from '../controller/UserController.js';
import { validate } from '../middleware/validation.middleware.js';
import { loginSchema } from '../schemas/auth.schemas.js';

const router = express.Router();

router.post('/signin', validate(loginSchema), SignIn);
router.post('/loginAsAgent', loginAsAgent);

export default router;
