const conexion = require('../config/conexion');
const generarHTML = require('../helpers/generarHTML.js')
const enviarCorreo = require('../helpers/email.js')
var pdf = require('html-pdf');
var fs = require('fs');
const nombrePdf = require('../helpers/generarNombre.js')

const Categoria = function(objCategoria){
    this.nombre = objCategoria.nombre;
    this.descripcion = objCategoria.descripcion;
    this.imagen = objCategoria.imagen;
};

//CREAMOS UNA CATEGORIA
Categoria.crear = (newObjCategoria, res)=>{


    let agregaCategoria = `insert into categoria (nombreCategoria, descripcion, imagen) VALUES ('${newObjCategoria.nombre}','${newObjCategoria.descripcion}','${newObjCategoria.imagen}')`;
    
    conexion.query(agregaCategoria,(err, resultado)=>{
        if (err) return res({msj: 'Ha ocurrido un error'+err}, null)
        
        return res(null,{msj: 'La categoria fue agregada correctamente'})
    })
};

Categoria.obtener = (resultado) =>{
    conexion.query("select * from categoria", (err, rows)=>{
        if(err) throw err;

        rows = rows.map( categoria => {
            categoria.imagen = categoria.imagen?.toString('ascii')
            return categoria;
        } )

        resultado(null, rows);
    });
};

Categoria.eliminar = (id, res) =>{
    let eliminar = `delete from categoria where idCategoria='${id}'`
    conexion.query(eliminar, (err, data)=>{
        if(err) return res(error,null)
        return res(null,{msj:'Categoria eliminada'})
    })
};

Categoria.obtenerPorId = (id, resultado) =>{
    conexion.query(`select * from categoria where idCategoria = ${id}`, (err, rows)=>{
        if(err) throw err;

        rows = rows.map( categoria => {
            categoria.imagen = categoria.imagen?.toString('ascii')
            return categoria;
        } )

        resultado(null, rows);
    });
};

Categoria.editarCategoria = (req, res) =>{
    let edit=`update categoria set nombreCategoria = '${req.body.nombre}', descripcion = '${req.body.descripcion}', imagen='${req.body.imagen}' where idCategoria='${req.params.id}' `
    conexion.query(edit, (error,data)=>{
        if(error){
            //console.log(error)
            return res(error, null)
        }else{
            return res(null, {msj:'Se actualizó la categoria'})
        }
    } )
};

Categoria.suscribirse = (idCategoria, idUsuario, corroUsuario, resultado) =>{
    let consulta = `INSERT INTO suscripcion (idCategoria, idUsuario, correoUsuario) VALUES ('${idCategoria}','${idUsuario}','${corroUsuario}')`;
    let select = `SELECT * FROM suscripcion WHERE idCategoria = '${idCategoria}' AND idUsuario = '${idUsuario}'`;
    conexion.query(select, (err, data)=>{
        if(err) return resultado(err, null)
        if(data.length){
            return resultado({msj: 'Ya estas suscrito a esta categoria'}, null)
        }else{
            conexion.query(consulta, (err, data)=>{
                if(err) return resultado(err, null)
                return resultado(null, {msj: 'Suscrito correctamente'})
            }
            )
        }
    })

}

Categoria.desinscribirse = (idCategoria, idUsuario, resultado) =>{
    let consulta = `DELETE FROM suscripcion WHERE idCategoria = '${idCategoria}' AND idUsuario = '${idUsuario}'`;
    conexion.query(consulta, (err, data)=>{
        if(err) return resultado(err, null)
        return resultado(null, {msj: 'Suscripción eliminada'})
    })
}

Categoria.comprobarSuscripcion = (idCategoria, correoUsuario, resultado) =>{
    
    let verificarSup = `select * from suscripcion where idCategoria = '${idCategoria}' AND correoUsuario = '${correoUsuario}'`;
    conexion.query(verificarSup, (err, data)=>{
        if(err) return resultado(err, null)
        if(data.length){
            return resultado(null, true)
        }
        return resultado(null, false)
        
    })
}

Categoria.obtenerDiezProductosMasVisitados = (idCategoria, departamento, res) => {
    //let searchQuery = `SELECT categoria.idCategoria, nombreCategoria, departamento, contador FROM categoria JOIN usuario ON idUsuario = usuario.idUsuario JOIN producto on producto.idCategoria = categoria.idCategoria WHERE (departamento = '${departamento}' AND categoria.idCategoria = ${idCategoria}) order by contador desc limit 10;`
    let searchQuery = `SELECT categoria.idCategoria, nombreCategoria, ubicacion, contador, idProducto, nombre, costo, producto.descripcion, producto.imagen FROM categoria JOIN producto on producto.idCategoria = categoria.idCategoria WHERE (ubicacion = '${departamento}' AND categoria.idCategoria = ${idCategoria}) order by contador desc limit 10;`
    conexion.query(searchQuery, (err, rows) => {
        if(err) return res({msj: 'Hubo un error' + err}, null);

        return res(null, rows);
    }
    )
};

Categoria.generarPdf = async (resultado) => {

    // Obtener las suscripciones
    let searchQuery = `SELECT * FROM suscripcion`;
    conexion.query(searchQuery, (err, suscripciones) => {
        if(err) return resultado(err, null);

        suscripciones.forEach(suscripcion => {


            // Obtener usuario por id
            let queryUsuario = `SELECT nombre, apellido, correo, departamento FROM usuario WHERE idUsuario = '${suscripcion.idUsuario}'`;
            conexion.query(queryUsuario, (err, usuario) => {
                if(err) throw err;

                Categoria.obtenerDiezProductosMasVisitados(suscripcion.idCategoria, usuario[0].departamento, async (err, productos) => {
                    if(err) throw err;

                    if(productos.length){
                        var options = { format: 'A4' };
                        let html = generarHTML(productos[0].nombreCategoria, usuario[0].nombre, productos)
                        let nombreArchivo = `${nombrePdf.generarNombre(productos[0].nombreCategoria)}.pdf`
                        pdf.create(html, options).toFile(`./public/pdf/${nombreArchivo}`, async (error, res) => {
                            if(error) {
                                console.log(error)
                                resultado(error, null);
                            }
                            if(res){

                                //console.log(res)
                                let datos = {correo: usuario[0].correo, nombre: usuario[0].nombre, nombreArchivo: nombreArchivo, nombreCategoria:productos[0].nombreCategoria}

                                await enviarCorreo.emailProductosMasVisitados(datos)
                                resultado(null, productos);
                            }else {
                                resultado(null, {msj: "No se pudo enviar el correo"});
                            }
                        } )

                    }
                })
            })
    
        });
    })  
}


        
module.exports = Categoria;
