import { Router } from 'express';
import ResumoController from '../controllers/resumoController.js';
import AuthController from '../controllers/authController.js';

const router = Router();

router.get('/resumo/:ano/:mes', AuthController.protect, ResumoController.listarResumo);

export default router;
