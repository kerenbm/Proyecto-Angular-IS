/*-------------------------------Import para la conexion con la base de datos------------------------------*/
const conexion = require('../config/conexion');
/*------------------------------------------Creacion de clases---------------------------------------------*/
const Producto = function (objProducto) {
    this.categoria = objProducto.categoria;
    this.idProducto = objProducto.idProducto;
    this.nombre = objProducto.nombre;
    this.costo = objProducto.costo;
    this.estado = objProducto.estado;
    this.descripcion = objProducto.descripcion;
    this.ubicacion = objProducto.ubicacion;
    this.idUsuario = objProducto.idUsuario;
    this.imagen = objProducto.imagen;
};

/*---------------------------------------------Funciones---------------------------------------------------*/
/*--------Crear Producto---------*/
Producto.crear = (newObjProducto, res) => {
    //SE DEBE DE MANDAR LAS FOTOS A SU TABLA ESPECIFICA, RECORDAR QUE SON VARIAS Y SE DEBE DE ITERAR
    let insertQuery = `insert into producto (idCategoria, nombre, costo, estado, descripcion, ubicacion, idCliente, imagen) 
                VALUES ( '${newObjProducto.categoria}','${newObjProducto.nombre}','${newObjProducto.costo}',
                '${newObjProducto.estado}','${newObjProducto.descripcion}','${newObjProducto.ubicacion}','${newObjProducto.idUsuario}','${newObjProducto.imagen}')`;
    
    conexion.query(insertQuery, (err, resRegistrarProducto) => {
        console.log(err)
        if (err) return res({ msj: 'El producto no pudo ser registrado' + err }, null)

        return res(null, { msj: 'El producto fue registrado correctamente', data: resRegistrarProducto })
    })
};

/*-------Obtener Productos------*/
Producto.obtenerTodos = (resultado)=>{
    conexion.query("select * from producto", (err, rows)=>{
        if(err) throw err;
        rows = rows.map( producto => {
            producto.imagen = producto.imagen?.toString('ascii')
            return producto;
        } )
        resultado(null, rows);
    });
};
/*--------------------Funciones de Busqueda--------------------*/
Producto.obtenerPorId = (id, resultado) => {
    let obtenerQuery = `select * from producto where idProducto = ${id}`
    conexion.query(obtenerQuery, (err, res) => {
        if (err) 
            return resultado({ msj: 'Hubo un error' + err }, null)
        else {
            res = res.map( producto => {
                producto.imagen = producto.imagen?.toString('ascii')
                return producto;
            } )
            return resultado(null, res)
        }
    })
}
Producto.obtenerPorUbi = (departamento, resultado) => {
    let obtenerQuery = `select * from producto where ubicacion = '${departamento}'`  //Hay que definir que columnas se quieren de la tabla producto
    conexion.query(obtenerQuery, (err, res) => {
        if (err)
            return resultado({ msj: 'Hubo un error' + err }, null)
        else if (res)
            return resultado(null, res)
        else
            return resultado({ msj: 'Productos no encontrado' }, null)
    })
}
Producto.obtenerPorCat = (idC, resultado) => {
    
    let obtenerQuery = `select * from producto where idCategoria = '${idC}'`  //Hay que definir que columnas se quieren de la tabla producto

    conexion.query(obtenerQuery, (err, rows) => {
        if (err) throw err
        rows = rows.map( producto => {
            producto.imagen = producto.imagen?.toString('ascii')
            return producto;
        } )
        resultado(null, rows)
    });
};
Producto.obtenerPorCosto = (inter1, inter2, resultado) => {
    let obtenerQuery = `select * from producto where costo BETWEEN ${inter1} AND ${inter2}`  //Hay que definir que columnas se quieren de la tabla producto
    conexion.query(obtenerQuery, (err, res) => {
        if (err)
            return resultado({ msj: 'Hubo un error' + err }, null)
        else if (res)
            return resultado(null, res)
        else
            return resultado({ msj: 'Productos no encontrado' }, null)
    })
}
/*-------------------------------------------------------------*/

/*-------Actualizar por id------*/
Producto.actualizarPorId = (id, newObjProducto, resultado) => {

//SE QUITO IDCATEGORIA PARA QUE FUNCIONE EL ACTUALIZAR
    let actualizarQuery = `UPDATE producto SET nombre = '${newObjProducto.nombre}', 
                            costo = '${newObjProducto.costo}', estado = '${newObjProducto.estado}', descripcion = '${newObjProducto.descripcion}', 
                            ubicacion = '${newObjProducto.ubicacion}' WHERE idProducto = '${id}'`
    conexion.query(actualizarQuery, (err, res) => {
        if (err) throw err;
        /*changedRows consigue el numero de filas que hayan sido cambiadas en sus valores en un UPDATE de la base de datos*/
        //else if (res.changedRows == 0)
        //  return resultado(null, { msj: 'No hubo cambios' }, null)

        return resultado(null, res)
        }
    )
}

/*-----Eliminar un producto-----*/
Producto.eliminarPorId = (id, resultado) => {
    let eliminarQuery = `DELETE FROM producto WHERE idProducto = '${id}'`
    conexion.query(eliminarQuery, (err, res) => {
        if (err)
            return resultado({ msj: `Hubo un error '${err}'` }, null)
        /*affectedRows consigue el numero de filas afectadas 
        en un INSERT, UPDATE o DELETE de la base de datos*/
        else if (res.affectedRows == 0)
            return resultado({ msj: 'No se elimino ningun producto' }, null)
        else
            /*return resultado(null, res)*/
            return resultado(null, { msj: 'Producto eliminado' })
    })
}

/*Eliminar todos los productos(debe cambiarse con respecto al usuario)*/
Producto.eliminarTodosPorUsuario = (resultado) => {                                               // Importante cambiar
    let eliminarQuery = 'DELETE FROM producto'                                                    // Importante cambiar        
    conexion.query(eliminarQuery, (err, res) => {                                                 // Importante cambiar            
        if (err)                                                                                   // Importante cambiar
            return resultado({ msj: `Hubo un error '${err}'` }, null)                               // Importante cambiar                            
        else if (res.affectedRows == 0)                                                            // Importante cambiar
            return resultado({ msj: 'No se elimino ningun producto' }, null)                        // Importante cambiar                                                            
        else                                                                                      // Importante cambiar
            return resultado(null, { msj: `Numero de productos eliminados '${res.affectedRows}'` }) // Importante cambiar                                                                    
    })                                                                                            // Importante cambiar    
}                                                                                                 // Importante cambiar

//Estas funciones son para contabilizar los productos mas visitados
Producto.actualizarContador = (id,res) => {
    let updateQuery = `update producto set contador = contador + 1 WHERE idProducto = '${id}'`
    conexion.query(updateQuery, (err, rows) => {
        if(err) return res({msj: 'Hubo un error' + err}, null);

        return res(null, rows);
    }
    )
};

Producto.obtenerDiezProductosMasVisitados = (idCategoria, departamento, res) => {
    let searchQuery = `SELECT categoria.idCategoria, nombreCategoria, departamento, contador FROM categoria JOIN usuario ON idUsuario = usuario.idUsuario JOIN producto on producto.idCategoria = categoria.idCategoria WHERE (departamento = '${departamento}' AND categoria.idCategoria = ${idCategoria}) order by contador desc limit 10;`
    conexion.query(searchQuery, (err, rows) => {
        if(err) return res({msj: 'Hubo un error' + err}, null);

        return res(null, rows);
    }
    )
};

/*Funciones para las denuncias*/
Producto.crearDenuncia = (obj1, obj2, opcion, razon, otro, res) => {
    let insertQuery = `insert into denuncias (  idDenunciado, nombreDenunciado, apellidoDenunciado, correoDenunciado, idDenunciante, 
                                                nombreDenunciante, apellidoDenunciante, correoDenunciante, idProducto, nombreProducto, 
                                                opcion, razon, otro, fecha) 
                                                values (${obj1.idU}, '${obj1.nombre}', '${obj1.apellido}', '${obj1.correo}',
                                                        ${obj2.idUsuario}, '${obj2.nombre}', '${obj2.apellido}', '${obj2.correo}',
                                                        ${obj1.idP}, '${obj1.nombreP}', '${opcion}', '${razon}', '${otro}', now())`
    conexion.query(insertQuery, (err, data) => {
        if(err)
            return res({msj:err}, null)
        else
            return res(null, {msj:'Se pudo registrar la denuncia'})
    })
}
/*idP es el id del producto
  Cada columna tiene su nombre propio nombre porque al solo dejarlas llamadas hay columnas que el select no trae*/
Producto.denuncia = (idP, idU, res) => {
    //este obtiene datos del producto y su vendedor
    let obtenerQuery = `select usuario.idUsuario idU, usuario.nombre nombre, usuario.apellido apellido, usuario.correo correo, producto.idProducto idP, producto.nombre nombreP from producto 
                        inner join usuario on producto.idCliente = usuario.idUsuario where producto.idProducto = ${idP}`
    //este obtiene datos del comprador que esta denunciando
    let obtenerUsuario = `select idUsuario, nombre, apellido, correo from usuario where idUsuario = ${idU}`
    conexion.query(obtenerQuery, (err, obj1) => {
        if(err)
            return res(err, null)
        else
            conexion.query(obtenerUsuario, (err, obj2) => {
                if(err)
                    return res(err, null)
                else
                    return res(null, [obj1[0], obj2[0]])
            })
    })
}

Producto.subirImagen = (req, res) => {
    let {idProducto, imagen } = req.body;
    let query = `INSERT INTO foto (idProducto, imagen) VALUES (${idProducto}, '${imagen}');`
    conexion.query( query, (err, data) => {
        if(err)
            return res({msj:err}, null)
        else
            return res(null, {msj:'Imagen subida correctamente'})
    })
}

Producto.obtenerImagenes = (idProducto, res) => {
    let query = `SELECT imagen FROM foto WHERE idProducto = ${idProducto}`
    conexion.query(query, (err, data) => {

        if(err)
            return res({msj:err}, null)
        else {
            data = data.map(imagen => {
                imagen.imagen = imagen.imagen?.toString('ascii')
                return imagen
            });
            
            return res(null, data)

        }
    })
}

Producto.calificar = (idProducto, idUsuario, calificacion, res) => {
    let query = `INSERT INTO calificacion (idProducto, idUsuario, calificacion) VALUES (${idProducto}, ${idUsuario}, ${calificacion});`
    let buscarCalificacion = `SELECT * FROM calificacion WHERE idProducto = ${idProducto} AND idUsuario = ${idUsuario}`;

    conexion.query(buscarCalificacion, (err, rowsCalificacion) => {
        if(err) throw err;
        if(rowsCalificacion.length) {
            // Actualizar la calificación
            let queryUpdate = `UPDATE calificacion SET calificacion = ${calificacion} WHERE idProducto = ${idProducto} AND idUsuario = ${idUsuario}`;
            conexion.query(queryUpdate, (err, data) => {
                if(err) throw err;
                return res(null, {msj:'Calificación actualizada'})
            })
        }else {
            conexion.query(query, (err, data) => {
                if(err)
                    return res({msj:err}, null)
                else
                    return res(null, {msj:'Calificacion registrada correctamente'})
            })
        }
    })

}
Producto.obtenerDenuncias = (res)=>{
    let obtener = `select * from denuncias;`
    conexion.query(obtener,(error, rows)=>{
        if(error) return res(error,null)
        if(rows.length){
            return res(null,rows)
        }
        return res(null, [])

    })
}

Producto.eliminarDenuncia = (id, res)=>{
    let eliminarD = `delete from denuncias where idDenuncia = ${id};`
    conexion.query(eliminarD, (err, resultado)=>{
        if(err) return res(err, null)
        return res(null,{msj:'Denuncia eliminada'})
    })
}

Producto.obtenerCalificacionUsuario = (idProducto, idUsuario, res) => {
    let query = `SELECT calificacion FROM calificacion WHERE idProducto = ${idProducto} AND idUsuario = ${idUsuario}`
    conexion.query(query, (err, data) => {
        if(err)
            return res({msj:err}, null)
        else {
            if(data.length) {
                return res(null, data[0].calificacion)
            }else {
                return res(null, 0)
            }
        }

    })
}

Producto.obtenerCalificacionProducto = (idProducto, res) => {
    // Consulta para obtener el promedio de calificaciones de un producto
    let query = `SELECT AVG(calificacion) AS promedio FROM calificacion WHERE idProducto = ${idProducto}`;
    conexion.query(query, (err, data) => {
        if(err)
            return res({msj:err}, null)
        else {
            if(data.length) {
                return res(null, data[0].promedio)
            }else {
                return res(null, 0)
            }
        }
    })
}

/*--------------Funciones para las listas-----------------*/
Producto.aniadirFavoritos = (idU, idP, resultado) => {
let aniadirQuery = `insert into listas (idUsuario, idProducto, tipoLista) values (${idU}, ${idP}, 'favoritos')`
    conexion.query(aniadirQuery, (err, rows) => {
        if (err) 
            return resultado({ msj: 'El producto no se pudo aniadir a favoritos' + err }, null)
        else
            return resultado(null, { msj: 'El producto fue aniadido a favoritos'})
    })
}

Producto.obtenerFavoritos = (idU, resultado) => {
    let obtenerQuery = `select producto.idProducto, producto.idCategoria, producto.nombre, producto.costo, producto.estado, producto.descripcion, producto.ubicacion, producto.imagen 
                        from listas inner join producto on listas.idProducto = producto.idProducto where listas.idUsuario = ${idU} AND listas.tipoLista = 'favoritos'`
    conexion.query(obtenerQuery, (err, rows) => {
        
        if(err) throw err;
        rows = rows.map(favorito => {
            favorito.imagen = favorito.imagen?.toString('ascii')
            return favorito;
        })
        resultado(null, rows);
    })
}
Producto.eliminarFavorito = (idU, idP, resultado) => {
    let eliminarQuery = `delete from listas where idUsuario = ${idU} AND idProducto = ${idP}`
    conexion.query(eliminarQuery, (err, rows) => {
        if (err) 
            return resultado({ msj: 'El producto no se eliminar de favoritos' + err }, null)
        else
            return resultado(null, { msj: 'El producto fue eliminado de favoritos'})
    })
}

Producto.crearAnuncios = async (resultado) => {
    conexion.query('delete from anuncio', (err, res) => {
        if(err)
            return resultado({ msj: 'No se puediron eliminar los datos de la tabla anuncio' + err }, null)
        else
            conexion.query('select * from producto order by contador desc limit 10', (errSelect, productos) => {
                console.log(productos)
                
                if(err)
                    return resultado({ msj: 'No se puediron seleccionar los datos de la tabla anuncio' + errSelect }, null)
                else{
                    
                    conexion.query( 'insert into anuncio values ?',
                                    [productos.map(producto => [producto.idProducto, producto.idCategoria, producto.nombre, producto.descripcion, producto.costo, producto.idCliente, producto.imagen])],
                                    (errInsert, res) => {
                                        
                                        if(err)
                                            return resultado({ msj: 'No se puediron crear los anuncios nuevos' + errInsert }, null)
                                        else
                                            return resultado(null, { msj: 'Se crearon los anuncios exitosamete en la bd'})
                    })
                }
            })
    }) 
}

Producto.obtenerAnuncios = (resultado) => {
    conexion.query('select * from anuncio', (err, rows) => {
        if(err) throw err;
        rows = rows.map(anuncio => {
            anuncio.imagen = anuncio.imagen?.toString('ascii')
            return anuncio;
        } )
        resultado(null, rows);
    })
}

Producto.eliminarAnuncioPorDuenio = (idP, idU, resultado) => {
    let eliminarQuery = `delete from anuncio where idProducto = ${idP} AND idUsuario = ${idU};`
    console.log(eliminarQuery)
    conexion.query(eliminarQuery, (err, rows) => {
        if (err) 
            return resultado({ msj: 'El anuncio no se pudo eliminar' + err }, null)
        else if (rows.affectedRows == 0)
            return resultado({ msj: 'Este usuario no tiene permiso de borrar el anuncio' }, null)
        else
            return resultado(null, { msj: 'El producto fue eliminado de los anuncios'})
    })
}

Producto.obtenerMasVisitados = (resultado) => {
    // Consulta para obtener los 10 productos más visitados


    //let query = `SELECT idProducto, producto.idCategoria, nombre, costo, estado, ubicacion, producto.descripcion idUsuario, contador, producto.imagen  FROM producto JOIN categoria ON producto.idCategoria = categoria.idCategoria ORDER BY contador DESC LIMIT 10;`
    let query = `SELECT idProducto, producto.idCategoria, nombre,  contador  FROM producto JOIN categoria ON producto.idCategoria = categoria.idCategoria ORDER BY contador DESC LIMIT 10;`
    conexion.query(query, (err, data) => {
        if(err)
            return resultado({msj:err}, null)
        else {
            console.log(data)
            if(data.length) {
                return resultado(null, data)
            }else {
                return resultado(null, [])
            }
        }
    })
}

Producto.obtenerCategoriasMasVisitadas = (resultado) => {

    // Consulta para obtener las 10 categorías con los productos más visitados
    let query = `SELECT nombreCategoria, categoria.idCategoria, sum(producto.contador) as contador FROM categoria JOIN producto ON producto.idCategoria = categoria.idCategoria GROUP BY idCategoria ORDER BY idCategoria DESC LIMIT 10;`

    conexion.query(query, (err, data) => {
        if(err)
            return resultado({msj:err}, null)
        else {
            console.log(data)
            if(data.length) {
                return resultado(null, data)
            }else {
                return resultado(null, [])
            }
        }
    })
}
Producto.obtenerProductosMasVisitadosDepartamentos = (resultado) => {
    let query = `SELECT idProducto, nombre, ubicacion, contador FROM producto GROUP BY idProducto ORDER BY idProducto DESC LIMIT 10;`
    conexion.query(query, (err, data) => {
        if(err)
            return resultado({msj:err}, null)
        else {
            console.log(data)
            if(data.length) {
                return resultado(null, data)
            }else {
                return resultado(null, [])
            }
        }
    })
}

Producto.departamentosLlenos = (resultado) =>{
    let query = 'SELECT ubicacion FROM producto;'
    conexion.query(query, (error, rows)=>{
        if(error)
            return resultado({msj:error},null)
        else{
            if(rows.length){
                return resultado(null,rows)
            }            
        }
    })
}

module.exports = Producto;

