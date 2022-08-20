const { json } = require('express');
const Producto = require('../models/producto');
const Usuario = require('../models/usuario');

/*---------------Crear Producto---------------*/
exports.crearProducto = (req,res)=>{
    if(!req.body){
        return res.status(400).send({msj: 'Error del cliente'})
    }
    console.log(req.body);
    const producto = new Producto({
        categoria: req.body.categoria,
        nombre: req.body.nombre,
        costo: req.body.costo,
        estado: req.body.estado,
        descripcion: req.body.descripcion,
        ubicacion: req.body.ubicacion,
        idUsuario: req.body.idUsuario,
        imagen: req.body.imagen
    })

    /*----Llamdo de la funcion crear en models----*/
    Producto.crear(producto, (err, data)=>{
        if(err){
            return res.status(500).send({
                mensaje: err.mensaje || "Error al guardar en la base de datos",
                error: err
            });
        }
        if(data.error){
            return res.status(502).send({msj: data.error})
        }else{
            console.log(data)
            return res.status(200).json(data)
        }
    })    
};

/*--------Obtener Todos los Productos--------*/
exports.obtenerProductos = (req,res)=>{
    Producto.obtenerTodos((err, data) => {
        if(err)
            return res.status(404).send({msj: err.msj || 'Error al buscar en la base d datos'})
        else if(data.error)
            return res.status(502).send({msj: data.error})
        else
            return res.status(200).json(data)
    })
};

exports.actualizarContador = (req,res)=>{
    let id = req.params.id
    Producto.actualizarContador(id,(error,data)=>{
        if(error){
            res.status(404).json({msj: 'Hubo un problema al actualizar el contador' + error})
        }else{
            res.status(200).json(data)
        }
    })
};

exports.obtenerProductosMasVistos = (req,res)=>{
    let { id, departamento } = req.body;
    Producto.obtenerProductosMasVistos(id, departamento, (error,data)=>{
        if(error){
            res.status(404).json({msj: 'Hubo un problema al obtener los productos mas vistos' + error})
        }else{
            res.status(200).json(data)
        }
    })
};


/*---------Obtener un solo producto----------*/
exports.obtenerProducto = (req, res) =>{
    let id = req.params.id
    if(!id)
        return res.status(404).send({msj: 'Error del cliente'})
    else
        Producto.obtenerPorId(id, (err, data) => {
            if(err)
                return res.status(404).send({msj: 'Error del servidor'})
            /*else if(err.data)  el err.data lanza un error de null
                return res.status(502).send({msj: `Error encontrando el producto con el id = '${id}'`})*/
            else
                return res.json(data)
        })
}
exports.obtenerPorCategoria = (req, res) =>{
    Producto.obtenerPorCat(req.params.id, (error, data) =>{
        if(error){
            res.status(404).json({msj: 'Hubo un problema al obtener el producto' + error})
        }else{
            res.status(200).json(data)
        }
    })
};
/*-------------Filtrar Productos-------------*/
exports.filtrarProductos = (req, res) => {
    let filter = req.params.filter
    let value1 = req.params.value1
    let producto = req.body
    let data;
    console.log(producto)
    console.log(value1, "Valores")
    console.log(filter, "Los filtros")
    if(!filter || !value1)
        return console.log('hay parametros vacios')
    else
        switch(filter){
            case 'cat':
                data = producto.filter(el => el.idCategoria == value1)
                break;
            case 'ubi':
                data = producto.filter(el => el.ubicacion == value1)
                break;
            case 'precMas':
                data = producto.filter(el => el.costo >= value1)
            case 'precMenos':
                data = producto.filter(el => el.costo <= value1)
            case 'busq':
                data = producto.filter(el => el.nombre.ubicacion.toLowerCase().indexOf(value1) > -1)
        }
        return res.json(data,)
}

/*-------------Actualizar por id-------------*/
exports.actualizarProducto = (req, res) => {
    let id = req.params.id
    if(!id)
        return res.status(404).send({msj: 'Error del cliente'})

        console.log("Esto recibe de frontend. ",req.body);
        const productoActualizado = new Producto({
        nombre: req.body.nombre,
        costo: req.body.costo,
        estado: req.body.estado,
        descripcion: req.body.descripcion,
        ubicacion: req.body.ubicacion
        })
           Producto.actualizarPorId(id, productoActualizado, (err, data) => {
            if(err)
                return res.status(502).send({msj: `Error encontrando el producto con el id = '${id}' para actualizarlo`})
            else
                return res.json(data)
        })
    
}

/*--------------Eliminar por id--------------*/
exports.eliminarProducto = (req, res) => {
    let id = req.params.idP
        if(!id)
            return res.status(404).send({msj: 'Error del cliente'})
        else
            Producto.eliminarPorId(id, (err, data) => {
               console.log(err)
                if(err)
                    return res.status(502).send({msj: `Error al eliminar el producto con el id = '${id}'`})
                else
                    return res.json(data)
            })
}

/*----------------Funcion para las denuncias----------------*/
exports.denunciarUsuario = (req, res) => {
    idP = req.params.id
    idU = req.body.idU
    opcion = req.body.opcion
    razon = req.body.motivo
    otro = req.body.otro
    console.log(idU)
    //asunto = req.body.asunto
    Producto.denuncia(idP, idU, (err, data) => {
        if(err)
            return res.status(502).send({msj: err})
        else
            Producto.crearDenuncia(data[0], data[1], opcion, razon, otro, (err, data1) => {
                if(err)
                    return res.status(502).send({msj: err})
                else
                    return res.json(data1)
            })
    })
}

exports.subirImagen = (req, res) => {
    Producto.subirImagen(req, (err, data) => {
        if(err)
            return res.status(502).send({msj: err})
        else
            return res.json(data)
    })
}

exports.obtenerImagenes = (req, res) => {

    let idProducto = req.params.idProducto

    Producto.obtenerImagenes( idProducto, (err, data) => {


        if(err)
            return res.status(502).send({msj: err})
        else
            return res.status(200).json(data)
    })
}

exports.calificarProducto = (req, res) => {
    let { idProducto, idUsuario, calificacion } = req.body;
    Producto.calificar(idProducto, idUsuario, calificacion, (err, data) => {
        if(err)
            return res.status(502).send({msj: err})
        else
            return res.json(data)
    })
}

exports.obtenerCalificacionUsuario = (req, res) => {

    let { idProducto, idUsuario } = req.params;
    Producto.obtenerCalificacionUsuario(idProducto, idUsuario, (err, data) => {
        if(err)
            return res.status(502).send({msj: err})
        else
            return res.json(data)
    })
}
exports.obtenerCalificacionProducto = ( req, res ) => {
    let { idProducto } = req.params;
    Producto.obtenerCalificacionProducto(idProducto, (err, data) => {
        if(err)
            return res.status(502).send({msj: err})
        else
            return res.json(data)
    })
}
exports.obtenerDenuncias = (req,res)=>{
    Producto.obtenerDenuncias((err,data)=>{
        if(err){
            return res.status(502).send({msj:err})
        } 
        else{ 
            return res.status(200).json(data)
        }
    })
}

exports.eliminarDenuncia = (req,res)=>{
    Producto.eliminarDenuncia(req.params.id,(err, data)=>{
        if(err) return res.status(502).send({msj:err})
        return res.status(200).json(data)
    })
}

/*funciones para las listas*/
exports.aniadirFavoritos = (req, res) => {
    let idU = req.body.idUsuario
    let idP = req.body.idProducto
    Producto.aniadirFavoritos(idU, idP, (err, data) => {
        if(err) 
            return res.status(500).send({msj:err})
        else
            return res.status(200).json(data)
    })
}

exports.obtenerFavoritos = (req, res) => {
    let idU = req.params.idUsuario
    Producto.obtenerFavoritos(idU, (err, data) => {
        if(err)
            return res.status(404).send({msj: err.msj || 'Error al buscar en la base d datos'})
        else if(data.error)
            return res.status(502).send({msj: data.error})
        else
            return res.status(200).json(data)
    })
}

exports.eliminarFavorito = (req, res) => {
    let idU = req.params.idUsuario
    let idP = req.params.idProducto
    Producto.eliminarFavorito(idU, idP, (err, data) => {
        if(err) 
            return res.status(500).send({msj:err})
        else
            return res.status(200).json(data)
    })
}

/**nuevo */
exports.crearAnuncios = (req, res) => {
    Producto.crearAnuncios((err, data) => {
        if(err) 
            return res.status(500).send({msj:err})
        else
            console.log('se ha usado la funcion Producto.crearAnuncios')
            return res.status(200).json(data)
    })
}

exports.obtenerAnuncios = (req, res) => {
    
    Producto.obtenerAnuncios((err, data) => {
        if(err)
            return res.status(404).send({msj: err.msj || 'Error al buscar en la base d datos'})
        else if(data.error)
            return res.status(502).send({msj: data.error})
        else
            return res.status(200).json(data)
    })
    
}



exports.eliminarAnuncio = (req, res) => {
    let idU = req.params.idUsuario
    let idP = req.params.idProducto
    console.log(req.params)
    Producto.eliminarAnuncioPorDuenio(idP, idU, (err, data) => {
        if(err) 
            return res.status(500).send({msj:err})
        else
            return res.status(200).json(data)
    })
}

exports.obtenerMasVisitados = (req, res) => {
    Producto.obtenerMasVisitados((err, data) => {
        if(err)
            return res.status(404).send({msj: err.msj || 'Error al buscar en la base d datos'})
        else if(data.error)
            return res.status(502).send({msj: data.error})
        else
            return res.status(200).json(data)
    })
}

exports.obtenerCategoriasMasVisitadas = (req, res) => {
    Producto.obtenerCategoriasMasVisitadas((err, data) => {
        if(err)
            return res.status(404).send({msj: err.msj || 'Error al buscar en la base d datos'})
        else if(data.error)
            return res.status(502).send({msj: data.error})
        else
            return res.status(200).json(data)
    })
}

exports.obtenerProductosMasVisitadosDepartamentos = (req, res) => {
    Producto.obtenerProductosMasVisitadosDepartamentos((err, data) => {
        if(err)
        return res.status(404).send({msj: err.msj || 'Error al buscar en la base d datos'})
        else if(data.error)
        return res.status(502).send({msj: data.error})
        else {
            
            let items = {}
            // Agrupar productos por ubicacion
            for(let i = 0; i < data.length; i++) {
                if(!items[data[i].ubicacion]) {
                    items[data[i].ubicacion] = { data: [data[i].contador], label: [data[i].nombre] }
                }else {
                    items[data[i].ubicacion].data.push(data[i].contador)
                    items[data[i].ubicacion].label.push(data[i].nombre)
                }
            }


            return res.status(200).json(data)

        }

    })
}

exports.departamentosLlenos = (req,res) =>{
    Producto.departamentosLlenos((err,data)=>{
        if(err)
            return res.status(404).send({msj: err.msj || 'Error al buscar en la base de datos'})
        else{
            return res.status(200).json(data)
        }
    })
}
