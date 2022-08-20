const jwt = require('jsonwebtoken')
const correoServicio = require('../helpers/email.js')
const conexion = require('../config/conexion.js')
const Usuario = function(objUsuario){
    this.nombre = objUsuario.nombre;
    this.apellido = objUsuario.apellido;
    this.correo = objUsuario.correo;
    this.direccion = objUsuario.direccion;
    this.departamento = objUsuario.departamento;
    this.contraseña = objUsuario.contraseña;
    this.telefono = objUsuario.telefono;
};

Usuario.crear = (newObjUsuario, res)=>{
    let buscarCorreo = `select correo from usuario where correo='${newObjUsuario.correo}'`
    let token = jwt.sign({correo: newObjUsuario.correo},process.env.JWT_SECRET)
    //let insertQuery = `insert into usuario (idRol, nombre, apellido, correo, direccion, departamento, contrasenia, estado, telefono) VALUES (2, '${newObjUsuario.nombre}', '${newObjUsuario.apellido}', '${newObjUsuario.correo}','${newObjUsuario.direccion}','${newObjUsuario.departamento}','${newObjUsuario.contraseña}','activado','${newObjUsuario.telefono}')`;
    let insertQuery = `insert into usuario (idRol, nombre, apellido, correo, direccion, departamento, contrasenia, estado, telefono, token) VALUES (2, '${newObjUsuario.nombre}', '${newObjUsuario.apellido}', '${newObjUsuario.correo}','${newObjUsuario.direccion}','${newObjUsuario.departamento}',AES_ENCRYPT('${newObjUsuario.contraseña}','${newObjUsuario.contraseña}'),'activado','${newObjUsuario.telefono}', '${token}')`;


    conexion.query(buscarCorreo, (err, resUsuario)=>{

        if(err){
            return res(err, null)
        }

        if(resUsuario.length) {
            return res(null, {error: 'El correo ya esta en uso', tipo: 'no_permitido'})
        }else {

            

            conexion.query(insertQuery, async (err, resRegistrarUsuario) => {


                if (err) return res({msj: 'El usuario no pudo ser registrado'}, null)
                let data = {
                    correo: newObjUsuario.correo,
                    nombre: newObjUsuario.nombre,
                    token: token
                }

                // Enviar correo al usuario para verificar su cuenta
                try {
                    await correoServicio.emailRegistro(data)
                    return res(null,{msj: 'Se envio un correo con las instrucciones para validar tu cuenta.'})
                } catch (error) {

                    return res({msj: 'No se pudo enviar el correo al usuario'},null)
                    // Borrar el usuario de la base de datos
                    
                }


            })
        }
    });
};

Usuario.validarTokenRegistro = (req, resultado) => {
    let { token } = req.body

    let consulta = `SELECT * FROM usuario WHERE token = '${token}'`
    let consultaActualizarToken = `UPDATE usuario SET token = '', confirmado = '1' WHERE token= '${token}'`;

    conexion.query(consulta, (err, res) => {
        if (res.length) {
            // Borrar el token del usuario 
            conexion.query(consultaActualizarToken, (error, resp) => {
                if(error){

                    return resultado(error, null)
                }else {
                    return resultado(null, res)
                }
               
            })
        }else {

            return resultado(err, [])
        }
    })
}

Usuario.enviarTokenRestablecerContrasenia = (req, respuesta) => {
    let {correo} = req.body;
    let consulta = `SELECT * FROM usuario WHERE correo = '${correo}'`;
    conexion.query(consulta, (err, res) => {
        if (res.length) { // Si existe el usuario en la base de datos
            let token = jwt.sign({correo: correo},process.env.JWT_SECRET)
            let consultaActualizarToken = `UPDATE usuario SET token = '${token}' WHERE correo = '${correo}'`;

            // Guardar el token en la base de datos
            conexion.query(consultaActualizarToken, (error, resp) => {
                if(error){
                    return respuesta(error, null)
                }
                
                if(resp.affectedRows) {

                    // Enviar el correo 
                    try {
                        let data = {
                            correo,
                            nombre: res[0].nombre,
                            token: token
                        }
                        correoServicio.emailRecuperarContrasenia(data)
                        return respuesta(null,{msj: 'Se envio un correo con las instrucciones para recuperar tu contraseña.'})
                    } catch (error) {
                        return respuesta({msj: 'No se pudo enviar el correo al usuario'},null)
                    }

                }else {
                    return respuesta({msj: 'No se pudo generar el token'},null)
                }
            })


        }else {
            return respuesta(err, null)
        }
    })
}

Usuario.validarTokenRestablecerContrasenia = (req, respuesta) => {
    let {token} = req.params;
    let consulta = `SELECT * FROM usuario WHERE token = '${token}' AND confirmado = '1'`
    conexion.query(consulta, (err, res) => {
        if (res.length) {
            return respuesta(null, res)
        }else {
            return respuesta(err, [])
        }
    })
}

Usuario.restablecerContrasenia = (req, respuesta) => {
    let { token, contrasenia} = req.body;
    let consulta = `UPDATE usuario SET contrasenia = AES_ENCRYPT('${contrasenia}','${contrasenia}'), token = '' WHERE token = '${token}'`;
    let consultaUsuario = `SELECT * FROM usuario WHERE token = '${token}'`;


    //conexion.query(consulta)

    conexion.query(consultaUsuario, (error, resp) => {
        if(error){
            return respuesta({msj: 'Error al buscar el usuario en la base de datos'}, null)
        }else {
            if(resp.length) {
                conexion.query(consulta, (err, res) => {
        
                    if (err) {
                        return respuesta({msj: 'Error al actualizar la contraseña'}, null)
                    
                    }
                    if(res.affectedRows) {
            
                        return respuesta(null, resp)
            
                    }else {
                        return respuesta({msj: "Token o correo no válido"}, null)
                    }
                })
            }else {
                return respuesta({msj: 'Error al buscar el usuario en la base de datos'}, null)
            }
        }
    })

    
}

Usuario.eliminarUsuario = (id, res)=>{
    let eliminar =`delete from usuario where idUsuario =${id}`;
    conexion.query(eliminar, (err, data)=>{
        if(err) return res(err, null)
        return res(null, {msj:'Usuario eliminado por picaro'})
    })
}

Usuario.obtener = (resultado)=>{
    conexion.query("select * from usuario", (err, rows)=>{
        if(err) throw err;
        resultado(null, rows);

    });
};

Usuario.iniciarSesion = (req, respuesta) => {
    //var decoded = jwt.verify(req.body.password, 'shhhhh');

    let consulta = `SELECT * FROM usuario where correo = '${req.body.correo}' and contrasenia = AES_ENCRYPT('${req.body.contrasenia}','${req.body.contrasenia}')`
    conexion.query(consulta, (err, resUsuario) => {
        if(err) return respuesta(err, null)


        if(!resUsuario.length) return respuesta({msj: 'Usuario o contraseña no válido'})

        if(resUsuario[0].confirmado == '0'){
            return respuesta({msj: 'Confirma tu cuenta para poder iniciar sesión'}, null)
        }

        return respuesta(null, resUsuario )
   
    } )
    
}

Usuario.obtenerPorCorreo = ( req, respuesta ) => {

    let correo = req.params ? req.params.correo : req
    let buscarCorreo = `select idUsuario, idRol, nombre, apellido, correo, direccion, departamento, estado, telefono from usuario where correo='${correo}'`
    conexion.query(buscarCorreo, (err, resUsuario) => {
        if(err) {
            return respuesta(err, null)
        }
        return respuesta(null, resUsuario)
    
    })
}

/*Funcion para obtener denuncias pendientes*/
Usuario.obtenerDenunciasP = (resultado) => {
    let obtenerQuery = 'select * from denuncias where estado = "pendiente"'
    conexion.query(obtenerQuery, (err, rows) => {
        if(err)
            return resultado(err, null)
        else
            return resultado(null, rows)
    })
}

Usuario.obtenerUsuarioPorId = (idUsuario, res) =>{
    let query = `SELECT * FROM usuario WHERE idUsuario = ${idUsuario};`
    conexion.query(query, (err,rows)=>{
        if(err) return res(err,null)
        return res(null, rows)
    })
}


module.exports = Usuario;
