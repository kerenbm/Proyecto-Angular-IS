const express = require('express');
const mensajeController = require('../controllers/mensajeController');
const router = express.Router();

router.post('/crearMensaje',mensajeController.crearMensaje);
router.get('/obtenerMensajes/:emisor_id/:receptor_id', mensajeController.obtenerMensajes);
router.get('/conversaciones/:emisor_id', mensajeController.obtenerConversacion);


module.exports = router;