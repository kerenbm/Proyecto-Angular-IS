var pdf = require('html-pdf');
var fs = require('fs');

const reenderizarCards = (productos) => {
    let html = `
    <table class="table table-dark">
        <thead>
            <tr>
                <th scope="col">Imagen</th>
                <th scope="col">Nombre Producto</th>
                <th scope="col">Descripción</th>
                <th scope="col">Costo</th>
            </tr>
        </thead>
        <tbody>
    `
    for (let index = 0; index < productos.length; index++) {


        html += `

                <tr>
                    <td><img style="width: 64px;" src="${productos[index].imagen?.toString('ascii')}" class="card-img-top" alt="..."></td>
                    <td><a href="http://localhost:4200/tienda/categorias/${productos[index].idCategoria}" class="card-title">${productos[index].nombre}</a></td>
                    <td><p class="card-text descripcion">${productos[index].descripcion}</p></td>
                    <td><span class="card-text descripcion">${formatearDinero(productos[index]?.costo)}</span></td>
                </tr>
        `
        
    }
    html += `</tbody></table>`

    return html;
}

const generarHTML =  (nombreCategoria, nombreUsuario, productos) => {
    let html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Productos más visitados</title>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-0evHe/X+R7YkIZDRvuzKMRqM+OrBnVFBL6DOitfPri4tjfHxaWutUpFmBp4vmVor" crossorigin="anonymous">

    
    </head>
    <style>
        .descripcion {
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            overflow: hidden;
        }
        body{
            background: #C9D6FF;  /* fallback for old browsers */
            background: -webkit-linear-gradient(to right, #E2E2E2, #C9D6FF);  /* Chrome 10-25, Safari 5.1-6 */
            background: linear-gradient(to right, #E2E2E2, #C9D6FF); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
            
        }


    </style>
    <body>
        <div  class="container">
            <div id="pageHeader" class="row mt-5">
                <div class="col-12 text-center">
                    <h1 style="color: #6610f2;">Hola, <span style="font-weight: bold ;">${nombreUsuario}</span></h1>
                    <h6>Estos son los productos más visitados en la categoría de ${nombreCategoria}</h6>
                </div>
               
            </div>
            <div class="row  ">
                <div class="col-12 text-center">
                    <h1 class="">${nombreCategoria}</h1>
                    </div>          
                ${reenderizarCards(productos)}
            </div>
            
            </div>

        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/js/bootstrap.bundle.min.js" integrity="sha384-pprn3073KE6tl6bjs2QrFaJGz5/SUsLqktiwsUTF55Jfv3qYSDhgCecCxMW52nD2" crossorigin="anonymous"></script>
        <script>
            const redirigir = (url) => {
                window.location.href = url;
            }
        </script>
    
    </body>
    </html>
    
    `

    return html;
}



const formatearDinero = (cantidad) => {
    return cantidad.toLocaleString('en-US',{
        style:'currency',
        currency:'HNL'
    })
}

module.exports = generarHTML;

