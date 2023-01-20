import fetch from 'node-fetch';

class ResumoController {

  static listarResumo = async (req, res) => {
    try {
      const { ano, mes} = req.params;

      const options = {
        headers: {
          Cookie: `jwt=${req.cookies.jwt}` 
        }
      };

      const [requestReceita, requestDespesa] = await Promise.all([
        fetch(`/receitas/${ano}/${mes}`, options),
        fetch(`/despesas/${ano}/${mes}`, options)
      ]);

      const receita = await requestReceita.json();
      const despesa = await requestDespesa.json();

      const sumReceita = receita.receitaTotal[0].valorTotal;
      const sumDespesa = despesa.despesaTotal[0].valorTotal;

      const resumoMensal = sumReceita - sumDespesa;
      
      res.status(200).json({
        "Receitas": sumReceita,
        "Despesas": -sumDespesa,
        "Resumo mensal": resumoMensal
      });
    } catch (err) {
      res.status(400).json(err.message);
    };
  };

};

export default ResumoController;