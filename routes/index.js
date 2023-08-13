const express = require('express');
const router = express.Router();

const {
    registrar,
    autenticar,
    confirmar,
    olvidePassword,
    comprobarToken,
    nuevoPassword,
    perfil,
  } = require("../controller/usuarioController");
  
  const checkAuth = require("../middleware/checkAuth.js");
  

// const estudianteController = require('../controller/estudianteController');
const  nuevoEstudianteCtrl  = require('../controller/nuevoEstudianteCtrl');

module.exports = function() {



    // estudiante rute

    router.get('/estudiante',nuevoEstudianteCtrl.mostrarEstudiante)
    //muestra un estudiante en espesifico ID
    router.get('/estudiante/:id', nuevoEstudianteCtrl.mostrarEstudianteId)

    router.post('/estudiante',
    nuevoEstudianteCtrl.subirArchivo,
    nuevoEstudianteCtrl.nuevoEstudiante
    );

    router.put('/estudiante/:id/cambiar-estatus', nuevoEstudianteCtrl.cambiarEstatusEstudianteID);

    router.get('/estudianteina',nuevoEstudianteCtrl.getEstudiantesInactivos)

    router.put('/estudiante/cambiar-estatus', nuevoEstudianteCtrl.cambiarEstatusEstudiantesInac);

    router.put('/estudiante/cambiar-stats', nuevoEstudianteCtrl.cambiarEstatusEstudiantesAct);
    // Autenticación, Registro y Confirmación de Usuarios
    router.post("/", registrar); // Crea un nuevo usuario

    router.post("/login", autenticar);

    router.get("/confirmar/:token", confirmar);

    router.post("/olvide-password", olvidePassword);

    router.get("/olvide-password/:token", comprobarToken);

    router.post("/olvide-password/:token", nuevoPassword);

    router.get("/perfil", checkAuth, perfil);


    return router;

}

