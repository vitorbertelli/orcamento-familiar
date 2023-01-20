import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({

  nome: {
    type: String,
    required: [true, 'O usuário deve conter um nome.']
  },
  email: {
    type: String,
    required: [true, 'O usuário deve conter um email.'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Email invalido, tente novamente.']
  },
  senha: {
    type: String,
    required: [true, 'Por favor, informe uma senha.'],
    minlength: 8,
    select: false
  },
  confirmarSenha: {
    type: String,
    required: [true, 'Por favor, confirme a senha.'],
    validate: {
      validator: function (el) {
        return el === this.senha;
      },
      message: 'Senhas diferentes, tente novamente.'
    }
  }
});

userSchema.pre('save', async function (next) {
  if(!this.isModified('senha')) return next();

  this.senha = await bcrypt.hash(this.senha, 12);

  this.confirmarSenha = undefined;
});

userSchema.methods.verificaSenha = async function (novaSenha, senhaAtual) {
  return await bcrypt.compare(novaSenha, senhaAtual);
};

const User = mongoose.model('User', userSchema);

export default User;