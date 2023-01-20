import { Router } from 'express';
import DespesaController from '../controllers/despesaController.js';
import AuthController from '../controllers/authController.js';

const router = Router();

router
  .route('/despesas')
  .post(AuthController.protect, DespesaController.criarDespesa)
  .get(AuthController.protect, DespesaController.listarDespesas)

router
  .route('/despesas/:id')
  .get(AuthController.protect, DespesaController.listarDespesaPorId)
  .patch(AuthController.protect, DespesaController.atulizarDespesa)
  .delete(AuthController.protect, DespesaController.deletarDespesa)

router
  .get(
    '/despesas/:ano/:mes',
    AuthController.protect,
    DespesaController.resumoDespesasMensal
  );

export default router;