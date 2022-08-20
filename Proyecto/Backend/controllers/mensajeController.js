const Mensaje = require('../models/mensaje');
const { eliminarTodosPorUsuario } = require('../models/producto');



exports.crearMensaje = (req,res) =>{
    //console.log(req)
    const mensaje = new Mensaje({
        emisor : req.body.emisor,
        receptor : req.body.receptor,
        mensaje : req.body.texto   
    })

    Mensaje.crear(mensaje, (err, data)=>{
        if(err) return res.status(500).send(err);
        return res.status(202).json({msj:'Creado exitosamente'})
    })


}

exports.obtenerMensajes = (req,res)=>{
    let {emisor_id, receptor_id} = req.params
    console.log(req.params)
    Mensaje.obtenerMensajes(emisor_id, receptor_id, (err,data)=>{
        if(err) return res.status(500).send(err)
        return res.status(202).json(data)
    })
}

exports.obtenerConversacion = (req,res)=>{
    let emisor_id=req.params.emisor_id
    Mensaje.obtenerConversacion(emisor_id, (err, data)=>{
        if(err) return res.status(500).send(err)
        return res.status(202).json(data)
    })
}
