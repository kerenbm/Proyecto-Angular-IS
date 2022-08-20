const jwt = require('jsonwebtoken')
const Usuario =  require('../models/usuario.js')
const checkAuth =  async( req, res, next ) => {
    let token;
    console.log("Middleware")
    if( req.headers.authorization && req.headers.authorization.startsWith('Bearer') ) {

        try {
            
            token = req.headers.authorization.split(" ")[1]
            if ( !token ) {
                const error = new Error('Token no válido')
                return res.status(401).json({ msj: error.message})
            }
    
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
    
            Usuario.obtenerPorCorreo(decoded.correo, (err, data) => {
                if(err) return res.status(404).json({msj: "Hubo un error"})
                if(data.length){
                    req.usuario = data[0] //TODO: Sacar la contraseña de aquí
                    return next()
                }
            })
        } catch (err) {
            const error = new Error('Error de autenticación')
            return res.status(401).json({ msj: error.message}) 
        }
        
       
    }else {
        const error = new Error('Token es requerido')
        return res.status(401).json({ msj: error.message})

    }
}

module.exports = checkAuth