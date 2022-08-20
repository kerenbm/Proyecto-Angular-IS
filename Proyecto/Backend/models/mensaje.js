const { json } = require('express');
const { JSONB } = require('sequelize');
const { JSON } = require('sequelize');
const conexion = require('../config/conexion');

const Mensaje = function(objMensaje){
    this.mensaje = objMensaje.mensaje;
    this.emisor = objMensaje.emisor;
    this.receptor = objMensaje.receptor;
    
}

Mensaje.crear = (req,res) =>{
    console.log(req);
    let {mensaje,emisor, receptor } = req;
    let buscarConversacion = `select * from conversacion where (usuario1_id = ${emisor} and usuario2_id = ${receptor}) or (usuario2_id = ${emisor} and usuario1_id = ${receptor}); `
    console.log(mensaje)
    
    conexion.query(buscarConversacion, (err, rowsConversacion)=>{
        
        if(err) return res(err, null)
        if(!rowsConversacion.length){
            let insertConversacion = `INSERT INTO conversacion (usuario1_id, usuario2_id ) VALUES (${emisor}, ${receptor});`
        
            conexion.query(insertConversacion, (errInsert, rows)=>{
                console.log(errInsert)
                //console.log(Object.values(JSON.parse(JSON.stringify(rows))))
                console.log(rows)
                
                let insertMensaje = `INSERT INTO mensaje (conversacion_id, mensaje, emisor_id, receptor_id, fecha) VALUES (
                    ${rows.insertId}, '${mensaje}',${emisor}, ${receptor}, NOW()
                );`
                
                
                conexion.query(insertMensaje, (err, rowsMensaje)=>{
                    if(err) return res(err, null)
                    
                    return res(null, {msj:'Mensaje agregado correctamente'})
                    
                })
            })
        }else{
            console.log(rowsConversacion[0])
            
            let insertMensaje = `INSERT INTO mensaje (conversacion_id, mensaje, emisor_id, receptor_id, fecha) VALUES (
                ${rowsConversacion[0].id}, '${mensaje}',${emisor}, ${receptor}, NOW()
            );`
            conexion.query(insertMensaje, (err, rows)=>{
                if(err) return res(err, null)
                
                return res(null, {msj:'Mensaje agregado correctamente'})
                
            })
        }
    })
    
}

Mensaje.obtenerConversacion = (emisor_id, res)=>{

    let selectConversacion = `SELECT * FROM conversacion WHERE usuario1_id = ${emisor_id} OR usuario2_id = ${emisor_id};`
    console.log(selectConversacion)
    conexion.query(selectConversacion, (error, data)=>{
        if(error) return res(error, null)
        if(data.length){
            return res(null, data)
        }
    })
}

Mensaje.obtenerMensajes = (emisor_id, receptor_id, res)=>{
    let selectConversacion = `SELECT * FROM conversacion WHERE (usuario1_id = ${emisor_id} AND usuario2_id = ${receptor_id}) or (usuario2_id = ${emisor_id} AND usuario1_id = ${receptor_id});`
    conexion.query(selectConversacion, (error, data)=>{
        if(error) return res(error,null)
        if(data.length){
            console.log(data[0].id)
            let selectMensajes = `SELECT * FROM mensaje WHERE conversacion_id = ${data[0].id}`
            conexion.query(selectMensajes, (err, rows)=>{
                if(err) return res(err,null)
                if(rows.length){
                    return res(null, rows)
                }
            })
        }
    })
    
}

module.exports= Mensaje;