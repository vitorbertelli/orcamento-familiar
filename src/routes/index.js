import receita from './receitaRoute.js';
import despesa from './despesaRoute.js';
import resumo from './resumoRoute.js';
import user from './userRoute.js';

const routes = (app) => {
  app.use(
    receita,
    despesa,
    resumo,
    user
  );
};

export default routes;