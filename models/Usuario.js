const mongoose = require('mongoose');
const bcrypt = require("bcrypt")
const Schema = mongoose.Schema;

const usuarioSchema = new Schema({
    nombre: {
        type: String,
        required: true,
        trim: true,
      },
      password: {
        type: String,
        required: true,
        trim: true,
      },
      email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
      },
      token: {
        type: String,
      },
      confirmado: {
        type: Boolean,
        default: false,
      },
});

usuarioSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
      next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  });
  
  usuarioSchema.methods.comprobarPassword = async function (passwordFormulario) {
    return await bcrypt.compare(passwordFormulario, this.password);
  };

module.exports = mongoose.model("Usuario", usuarioSchema);
