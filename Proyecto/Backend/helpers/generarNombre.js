

const generarNombre =(nombreCategoria) =>{
    let fecha = new Date()
    let dia = fecha.getDate()
    let mes = fecha.getMonth()
    let año = fecha.getFullYear()
    let segundos = fecha.getSeconds()

    return `${nombreCategoria} ${dia}-${mes}-${año} ${segundos}ss`

} 

module.exports ={generarNombre};