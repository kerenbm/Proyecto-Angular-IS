const conexion = require('../config/conexion');
const Categoria= require('../models/categoria');


exports.crearCategoria = (req,res)=>{


    const categoria = new Categoria({
        nombre: req.body.nombre,
        descripcion: req.body.descripcion,
        imagen: req.body.imagen
    })


    Categoria.crear(categoria, (err, data)=>{
        if(err){

            return res.status(500).send({
                mensaje: err.mensaje || "Error al guardar en la base de datos",
                error: err
            });
        }
        if(data.error){
            console.log(data)
            return res.status(502).send({msj: data.error})
        }else{
            return res.status(200).json({msj:'La categoria se agregó correctamente'})

        }
    })    
};


exports.obtenerCategorias = (req,res)=>{
    Categoria.obtener((error,data)=>{
        if(error){
            res.status(404).json({mensaje: 'No se pudieron obtener los datos'})
        }else{
            res.status(200).json(data);
        }
    });
};
exports.obtenerCategoria = (req,res)=>{
    Categoria.obtenerPorId(req.params.id,(error,data)=>{
        if(error){
            res.status(404).json({mensaje: 'No se pudo obtener los datos'})
        }else{
            res.status(200).json(data[0]);
        }
    });
};

exports.eliminarCategoria = (req,res) =>{
    Categoria.eliminar(req.params.id, (error, data)=>{
        if(error){
            res.status(404).json({mensaje: 'No se pudo eliminar la categoria'})
        }else{
            res.status(200).json({mensaje:'Se eliminó la categoria correctamente'});
        }
    })
};

exports.editarCategoria = (req, res) =>{
    Categoria.editarCategoria(req, (error,data)=>{
        if(error){
            res.status(404).json({mensaje:'No se puedo editar la categoria'})
        }else{
            res.status(200).json({mensaje: 'Se editó la categoria'})
        }
    })
};

exports.suscripcionCategoria = (req,res)=>{
    let {idCategoria, idUsuario, correoUsuario} = req.body;
    Categoria.suscribirse(idCategoria, idUsuario, correoUsuario, (error,data)=>{
        if(error){
            res.status(404).json({mensaje: 'Error al suscribirse a la categoria'})
        }else{
            res.status(200).json(data);
        }
    })
}

exports.desinscribirseCategoria = (req,res)=>{
    let {idCategoria, idUsuario} = req.body;
    Categoria.desinscribirse(idCategoria, idUsuario, (error,data)=>{
        if(error){
            res.status(404).json({mensaje: 'No se pudo desinscribir'})
        }else{
            res.status(200).json(data);
        }
    })
}

exports.verificarSuscripcion = (req,res)=>{
    let {idCategoria, correoUsuario} = req.params;
    Categoria.comprobarSuscripcion(idCategoria,correoUsuario, (error, data)=>{
        if(error){
            res.status(404).json({mensaje: 'Error'})
        }else{
            res.status(200).json(data);
        }
    })
}
