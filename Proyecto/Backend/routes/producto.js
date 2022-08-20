/*--------------------------------------IMPORTS----------------------------------*/
const express = require('express');
const router = express.Router();
const productoController = require('../controllers/productoController');

/*---------------------------------------CRUD------------------------------------*/
router.post('/registro', productoController.crearProducto);
router.post('/denuncia/:id',productoController.denunciarUsuario);
router.get('/', productoController.obtenerProductos);
router.get('/detalle/:id', productoController.obtenerProducto);


router.post('/aniadirDeseos', productoController.aniadirFavoritos);
router.get('/lista-de-deseos/:idUsuario', productoController.obtenerFavoritos);
router.delete('/eliminarDeseos/:idUsuario/:idProducto', productoController.eliminarFavorito);
router.get('/filtrarProductos/:filter/:value1', productoController.filtrarProductos);

router.post('/anuncio', productoController.crearAnuncios);
router.delete('/eliminarAnuncio/:idProducto/:idUsuario', productoController.eliminarAnuncio);
router.get('/obtenerAnuncios', productoController.obtenerAnuncios);

router.get('/mas-visitados', productoController.obtenerMasVisitados);
router.get('/categorias-mas-visitadas', productoController.obtenerCategoriasMasVisitadas);
router.get('/mas-visitados-departamento', productoController.obtenerProductosMasVisitadosDepartamentos);


router.get('/:id', productoController.obtenerPorCategoria);
router.put('/actualizar/:id', productoController.actualizarProducto);
router.delete('/:idP', productoController.eliminarProducto);
router.put('/contador/:id', productoController.actualizarContador);
router.post('/subir-imagen', productoController.subirImagen);
router.get('/imagenes/:idProducto', productoController.obtenerImagenes);
router.post('/calificar', productoController.calificarProducto);
router.get('/calificar/obtener-calificacion/:idProducto/:idUsuario/', productoController.obtenerCalificacionUsuario);
router.get('/calificar/obtener-calificacion/:idProducto', productoController.obtenerCalificacionProducto);
router.get('/denuncia/obtenerDenuncias', productoController.obtenerDenuncias);
router.get('/graficoDepartamentos', productoController.departamentosLlenos);
router.delete('/denuncia/eliminar/:id', productoController.eliminarDenuncia);


/*-------------------------------------------------------------------------------*/
module.exports = router;

