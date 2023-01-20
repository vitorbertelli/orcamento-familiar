import mongoose from 'mongoose';

const despesaSchema = new mongoose.Schema({
  descricao: {
    type: String,
    required: [true, 'Despesa deve conter uma descricao.'],
    validate: {
      validator: async function(val) {

        const anoAtual = new Date(this.data).getFullYear();
        const mesAtual = new Date(this.data).getMonth();
        const busca = { descricao: val, data: { $gte: new Date(anoAtual, mesAtual, 1), $lt: new Date(anoAtual, mesAtual + 1, 1) } };
        const despesa = await Despesa.find(busca)

        if (despesa.length > 0) {
          return false
        }
        return true

      },
      message: 'O campo descrição é único por mês'
    }
  },
  valor: {
    type: Number,
    required: [true, 'Despesa deve conter um valor.']
  },
  categoria: {
    type: String,
    default: 'outras',
    enum: ['alimentacao', 'saude', 'moradia', 'transporte', 'educacao', 'lazer', 'imprevistos', 'outras']
  },
  data: {
    type: Date,
    default: Date.now
  }
});

const Despesa = mongoose.model('Despesa', despesaSchema);
export default Despesa;