const conexion = require('../config/conexion');
const Usuario = require('../models/usuario');
var jwt = require('jsonwebtoken');

exports.crearUsuario = (req,res)=>{


    const usuario = new Usuario({
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        correo: req.body.correo,
        direccion: req.body.direccion,
        departamento: req.body.departamento,
        contraseña: req.body.contrasenia,
        telefono: req.body.telefono
    })


    Usuario.crear(usuario, (err, data)=>{
        if(err){

            return res.status(500).send({
                mensaje: err.mensaje || "Error al guardar en la base de datos",
                error: err
            });
        }

        if(data.error){

            return res.status(502).send({msj: data.error})
        }else{
            return res.status(200).json({msj:'El usuario se registro correctamente'})

        }
    })    
};

exports.obtenerUsuario = (req,res)=>{
    Usuario.obtener((error,data)=>{
        if(error){
            res.status(404).json({mensaje: 'No se pudieron obtener los datos'})
        }else{
            res.status(200).json(data);
        }
    });
};
exports.obtenerUsuarioPorCorreo = (req,res)=>{
    Usuario.obtenerPorCorreo(req, (error,data) => {
        if(error){
            res.status(404).json({mensaje: 'No se pudo obtener el usuario'})
        }else{
            
            res.status(200).json(data[0]);
        }
    });
};

exports.verificarCorreoUsuario = async (req,res)=>{


    Usuario.verificarCorreo(req,(error,data)=> {
        if(error){
            res.status(404).json({mensaje: 'No se pudieron obtener los datos'})
        }

        return data
        if(data){
            console.log("El usuario se puede registrar")
        }else {
            console.log("El usuario no se puede registrar")

        }

        return data;
    });
    
};

exports.validarTokenRegistro = (req, res) => {
    Usuario.validarTokenRegistro( req, (err, data) => {

        if(err){
            return res.status(500).json({msj: 'Token no válido'})
        }
        if(data.length) {
            return res.status(200).json({msj: 'Correo verificado correctamente'})
        }
        return res.status(500).json({msj: 'Error al validar correo'})
    }) 
}

exports.enviarTokenRestablecerContrasenia = (req, res) => {
    Usuario.enviarTokenRestablecerContrasenia( req, (error, data) => {
        if(error) {
            // No se puede enviar el token
            return res.status(500).json(error)
        }
        
        if(data){
            return res.status(200).json(data)
        }else {
            return res.status(500).json({msj: 'Error, no se pudo enviar el correo'})
        }
                
        
        
    })
}

exports.validarTokenRestablecerContrasenia = (req, res) => {
    Usuario.validarTokenRestablecerContrasenia( req, (err, data) => {

        if(err){
            return res.status(500).json({msj: 'Token no válido'})
        }
        if(data.length) {
            return res.status(200).json({msj: 'Token válido'})
        }
        return res.status(500).json({msj: 'Error al validar token'})
    }) 
}

exports.restablecerContrasenia = (req, res) => {
    Usuario.restablecerContrasenia( req, (error, data) => {
        if(error) {
            // No se puede restablecer la contrasenia
            return res.status(500).json({msj: 'Error al restablecer contraseña, solicita un nuevo enlace'})
        }
        if(data.length){
            let token = jwt.sign({correo: data[0].correo, idUsuario: data[0].idUsuario},process.env.JWT_SECRET, {
                expiresIn: '3h'
            })
            return res.status(200).json({token: token})
        }else {
            return res.status(500).json({msj: 'Error al restablecer contraseña'})

        }

        
    })
}

exports.inicioSesion = (req, res) => {
    Usuario.iniciarSesion( req, (error, data) => {
        if(error) {
            // No se puede iniciar sesion

            return res.status(500).json(error)
        }
        if(data){

            if(data.length){

                
                let token = jwt.sign({correo: data[0].correo, idUsuario: data[0].idUsuario},process.env.JWT_SECRET, {
                    expiresIn: '3h'
                })
                return res.status(200).json({token: token})
            }else {
                return res.status(500).json({msj: 'Error, correo o contraseña incorrectos'})

            }
                    
        }
        
    })
}
exports.eliminarUsuario =(req,res)=>{
    Usuario.eliminarUsuario(req.params.id, (err,data)=>{
        if(err) return res.status(500).send({msj:err})
        return res.status(200).json(data)
    })
};

exports.obtenerDenunciasP = (req, res) => {
    Usuario.obtenerDenunciasP((err, data) => {
        if(err)
            return res.status(404).send({msj: err.msj || 'Error al buscar en la base d datos'})
        else if(data.error)
            return res.status(502).send({msj: data.error})
        else
            return res.status(200).json(data)
    })
}

exports.obtenerUsuarioPorId = (req,res)=>{
    Usuario.obtenerUsuarioPorId(req.params.idUsuario, (err,data)=>{
        if(err) return res.status(500).send({msj:err})
        return res.status(200).json(data)
    })
}
