const express = require('express');
const conexion = require('../config/conexion');
const router = express.Router();
const CategoriaController = require('../controllers/categoriaController');
const checkAuth = require('../middleware/checkAuth.js');

router.post('/registro', CategoriaController.crearCategoria);
//router.post('/login',categoriaController.inicioSesion);
router.get('/', CategoriaController.obtenerCategorias);
router.get('/:id', CategoriaController.obtenerCategoria)
router.delete('/eliminar/:id',CategoriaController.eliminarCategoria );
router.put('/editar/:id', CategoriaController.editarCategoria);
router.post('/desinscribirse', CategoriaController.desinscribirseCategoria);
router.put('/suscribirse', CategoriaController.suscripcionCategoria);
router.get('/comprobarSuscripcion/:idCategoria/:correoUsuario',CategoriaController.verificarSuscripcion)


module.exports = router;
