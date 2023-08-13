const jwt = require("jsonwebtoken");
const Usuario = require("../models/Usuario.js");

function checkAuth(req, res, next) {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const JWT_SECRET = 'palabraSECRETA'
      
      const decoded = jwt.verify(token,JWT_SECRET);

      Usuario.findById(decoded.id)
        .select(
          "-password -confirmado -token -createdAt -updatedAt -__v"
        )
        .then(function(usuario) {
          req.usuario = usuario;
          return next();
        })
        .catch(function(error) {
          return res.status(404).json({ msg: "Hubo un error" });
        });
    } catch (error) {
      return res.status(404).json({ msg: "Hubo un error" });
    }
  }

  if (!token) {
    const error = new Error("Token no válido");
    return res.status(401).json({ msg: error.message });
  }

  next();
}

module.exports = checkAuth;
