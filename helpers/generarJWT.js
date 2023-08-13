var jwt = require("jsonwebtoken");

function generarJWT(id) {
  return jwt.sign({ id: id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
}

module.exports = generarJWT;