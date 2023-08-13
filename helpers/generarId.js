function generarId() {
  var random = Math.random().toString(32).substring(2);
  var fecha = Date.now().toString(32);
  return random + fecha;
}

module.exports = generarId;