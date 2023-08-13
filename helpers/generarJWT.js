var jwt = require("jsonwebtoken");
const JWT_SECRET = 'palabraSECRETA'
function generarJWT(id) {
  return jwt.sign({ id: id },JWT_SECRET, {
    expiresIn: "30d",
  });
}

module.exports = generarJWT;
