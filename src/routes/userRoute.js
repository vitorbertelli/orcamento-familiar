import { Router } from 'express';
import AuthController from  '../controllers/authController.js';

const router = Router();

router
  .route('/user/signup')
  .post(AuthController.signup)

router
  .route('/user/login')
  .post(AuthController.login)

export default router;