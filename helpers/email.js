const nodemailer = require("nodemailer");

const emailRegistro = async function(datos) {
  const { email, nombre, token } = datos;

  const transport = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'krisnaspiral@gmail.com',
        pass: 'wmingyhpgzydjerp'
      }
  });

  const info = await transport.sendMail({
    from: '"Travelero - Nuevo estudiante registrado" <cuentas@travelero.com>',
    to: email,
    subject: "Travelero - Comprueba tu cuenta",
    text: "Comprueba tu cuenta en travelero",
    html: `<p>Hola: ${nombre} Comprueba tu cuenta en travelero</p>
    <p>Tu cuenta ya esta casi lista, solo debes comprobarla en el siguiente enlace: 

    <a href="${process.env.FRONTEND_URL}/confirmar/${token}">Comprobar Cuenta</a>
    
    <p>Si tu no creaste esta cuenta, puedes ignorar el mensaje</p>
    
    
    `,
  });
};

const emailOlvidePassword = async function(datos) {
  const { email, nombre, token } = datos;

  const transport = nodemailer.createTransport({
    hservice: 'Gmail',
    auth: {
        user: 'krisnaspiral@gmail.com',
        pass: 'wmingyhpgzydjerp'
      }
  });

  const info = await transport.sendMail({
    from: '"Travelero - Administrador de Proyectos" <cuentas@travelero.com>',
    to: email,
    subject: "Travelero - Reestablece tu Password",
    text: "Reestablece tu Password",
    html: `<p>Hola: ${nombre} has solicitado reestablecer tu password</p>

    <p>Sigue el siguiente enlace para generar un nuevo password: 

    <a href="${process.env.FRONTEND_URL}/olvide-password/${token}">Reestablecer Password</a>
    
    <p>Si tu no solicitaste este email, puedes ignorar el mensaje</p>
    
    
    `,
  });
};

module.exports = {
  emailRegistro: emailRegistro,
  emailOlvidePassword: emailOlvidePassword,
};
