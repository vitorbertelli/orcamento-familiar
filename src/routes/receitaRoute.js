import { Router } from 'express';
import ReceitaController from './../controllers/receitaController.js';
import AuthController from '../controllers/authController.js';

const router = Router();

router
  .route('/receitas')
  .post(AuthController.protect, ReceitaController.criarReceitas)
  .get(AuthController.protect, ReceitaController.listarReceitas)

router
  .route('/receitas/:id')
  .get(AuthController.protect, ReceitaController.listarReceitaPorId)
  .patch(AuthController.protect, ReceitaController.atulizarReceita)
  .delete(AuthController.protect, ReceitaController.deletarReceita)

router
  .get(
    '/receitas/:ano/:mes',
    AuthController.protect,
    ReceitaController.resumoReceitasMensal
  );

export default router;