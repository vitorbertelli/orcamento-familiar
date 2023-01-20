import mongoose from 'mongoose';

const receitaSchema = new mongoose.Schema({
  descricao: {
    type: String,
    required: [true, 'Receita deve conter uma descricao.'],
    validate: {
      validator: async function(val) {

        const anoAtual = new Date(this.data).getFullYear();
        const mesAtual = new Date(this.data).getMonth();
        const busca = { descricao: val, data: { $gte: new Date(anoAtual, mesAtual, 1), $lt: new Date(anoAtual, mesAtual + 1, 1) } };
        const receita = await Receita.find(busca)

        if (receita.length > 0) {
          return false;
        }
        return true;
      },
      message: 'O campo descricão é único por mês'
    }
  },
  valor: {
    type: Number,
    required: [true, 'Receita deve conter um valor.']
  },
  data: {
    type: Date,
    default: Date.now,
  }
});

const Receita = mongoose.model('Receita', receitaSchema);
export default Receita;
