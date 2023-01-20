import Despesa from './../models/despesaModel.js';

class DespesaController {

  static criarDespesa = async (req, res) => {
    try {
      const despesa = req.body;
      await Despesa.create(despesa);
      res.status(201).json(despesa);
    } catch (err) {
      res.status(400).json(err.message);
    }
  };

  static listarDespesas = async (req, res) => {
    try {
      if (req.query.descricao === undefined) {
        const despesas = await Despesa.find();
        res.status(200).json(despesas);
      } else {
        const descricao = req.query.descricao;
        const despesa = await Despesa.find({ "descricao": descricao });
        res.status(200).json(despesa);
      }
    } catch (err) {
      res.status(400).json(err.message);
    }
  };

  static listarDespesaPorId = async (req, res) => {
    try {
      const { id } = req.params;
      const despesa = await Despesa.findById(id);
      res.status(200).json(despesa);
    } catch (err) {
      res.status(400).json(err.message);
    }
  };

  static atulizarDespesa = async (req, res) => {
    try {
      const { id } = req.params;
      const despesa = await Despesa.findByIdAndUpdate(id, { $set: req.body });
      res.status(200).json(despesa);
    } catch (err) {
      res.status(400).json(err.message);
    }
  };

  static deletarDespesa = async (req, res) => {
    try {
      const { id } = req.params;
      await Despesa.findByIdAndDelete(id);
      res.status(200).json({ message: 'Despesa deletada com sucesso.'});
    } catch (err) {
      res.status(400).json(err.message);
    }
  };

  static resumoDespesasMensal = async (req, res) => {
    try {
      const { ano, mes } = req.params;
      const dataInicio = new Date(`${ano}-${mes}`);
      const dataFim = new Date(`${ano}-${Number(mes) + 1}`);
      const despesas = await Despesa.find({ data: { $gte: dataInicio, $lt:  dataFim } });
      const totalDespesa = await Despesa.aggregate([
        {
          $match: { data: { $gte: dataInicio, $lt:  dataFim } }
        },
        {
          $group: {
            _id: null,
            valorTotal: { $sum: '$valor' }
          }
        }
      ]);
      res.status(200).json({
        despesas: despesas,
        despesaTotal: totalDespesa,
      });
    } catch (err) {
      res.status(400).json(err.message);
    }
  };

};

export default DespesaController;