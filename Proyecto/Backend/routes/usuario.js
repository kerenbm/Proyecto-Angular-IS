

const express = require('express');
const conexion = require('../config/conexion');
const router = express.Router();
const checkAuth = require('../middleware/checkAuth.js')
const usuarioController = require('../controllers/usuarioController');

router.post('/registro', usuarioController.crearUsuario);
router.delete('/eliminar/:id', usuarioController.eliminarUsuario);
router.post('/login', usuarioController.inicioSesion);
router.put('/registro/:token', usuarioController.validarTokenRegistro);

router.put('/recuperar-contrasenia', usuarioController.enviarTokenRestablecerContrasenia);
router.get('/recuperar-contrasenia/:token', usuarioController.validarTokenRestablecerContrasenia);
router.put('/recuperar-contrasenia/nueva-contrasenia', usuarioController.restablecerContrasenia);
router.get('/obtenerDenuncias', usuarioController.obtenerDenunciasP) //obtiene todas las denuncias pendientes
router.get('/obtenerUsuario/:idUsuario', usuarioController.obtenerUsuarioPorId)

router.get('/', checkAuth,  usuarioController.obtenerUsuario); // Obtener todos los usuarios
router.get('/:correo', checkAuth,  usuarioController.obtenerUsuarioPorCorreo);  // Obtener el usuario por correo



module.exports = router;
