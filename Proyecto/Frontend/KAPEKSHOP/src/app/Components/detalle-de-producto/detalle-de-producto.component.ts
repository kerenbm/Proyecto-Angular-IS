import { Component, Input, EventEmitter, Output, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Categoria } from 'src/app/interfaces/Categorias';
import { ProductosService } from 'src/app/Services/productos.service';
import { UsuarioService } from 'src/app/Services/usuario.service';
import decodificarToken  from 'src/app/helpers/decodificarToken';
import formatearDinero  from 'src/app/helpers/formatoMoneda';
import { ListaDeseosService } from 'src/app/Services/lista-de-deseos.services';

@Component({
  selector: 'app-detalle-de-producto',
  templateUrl: './detalle-de-producto.component.html',
  styleUrls: ['./detalle-de-producto.component.css']
})
export class DetalleDeProductoComponent implements OnInit {

  activatedRoute: any;
  imagenB64:any = null;
  listarProductos:any=[]
  categorias:Categoria[] = []
  ruta: any;
  productos:any = [ ];

  idProducto: number;
  producto:any;
  productoActual:any;

  AgregadoALista: boolean = false;

  @Input() imagenes:any = []
  mostarFormulario: boolean | undefined;
  calificacion = 0;
  estrellas:any = []
  usuarioActual:any;
  usuarioVendedor:any;

  constructor(private route: ActivatedRoute, private productosService: ProductosService, private router:Router, private usuarioService:UsuarioService, private ListaDeseosService: ListaDeseosService) {
    this.idProducto = this.route.snapshot.params["id"];
  }

  ngOnInit() {
    this.obtenerPorId()
    this.obtenerImagenes(this.idProducto)
    this.obtenerUsuarioActual()

  }


  obtenerPorId() {
    this.productosService.obtenerPorId(this.idProducto).subscribe({
      error: (error) => {
        console.log(error)
      },
      next: (data) => {
        console.log(data)
        this.producto=data[0];
        this.obtenerUsuario();
        this.obtenerCalificacionProducto()
        this.actualizarContador()
        //imagen: this.imagenB64
      }
    })

  }

  obtenerImagenes(idProducto:number) {
    this.productosService.obtenerImagenesProducto(idProducto).subscribe( res => {
      this.imagenes = res;
      console.log(res)
    }, err => {
      console.log(err)
    })
  }

  async fileChangeEvent(event:any) {
    if(event.length != 0){
      this.imagenB64 = await this.toBase64(event[0])
    }
    //console.log(event.length)
    
  }

  //para varias imagenes
  async convertirImagen(evento:any){
    
    console.log(evento);
    for(let i=0;i<evento.length;i++){

      let base64 = await this.toBase64(evento[i]);
      this.imagenes.push( {name: evento[i].name, base64: base64})
    }
    
  }

  setActualizarImagenes(imagenes:any) {
    // Esta función se dispara cuando se borra una imagen desde el componente de visualización de imagenes
    this.imagenes = imagenes
  }

  toBase64 = (file:any) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
});

mostrarCategoria(){
  this.router.navigateByUrl(`categorias/${this.producto.idCategoria}`)
}
formatoDinero(cantidad:any){
  return formatearDinero(cantidad)
}

mostrarProductos(){
  this.mostarFormulario=false
  this.productosService.obtenerProductoActual(this.productoActual.idProducto).subscribe((res:any)=>{
    console.log(res)
  }, (err:any)=>{
    
  })
}
denuncia(){
  this.ruta= `form-denuncia/${this.idProducto}`;
  this.router.navigateByUrl(this.ruta);
}
calificarProducto(calificacion:number) {
  let token = decodificarToken();
  if(!token) return;
  let idUsuario = token.idUsuario;

  this.productosService.actualizarCalificacion(this.producto.idProducto, idUsuario, calificacion).subscribe((res:any)=>{
    console.log(res)
    this.calificacion = calificacion
    this.estrellas = this.generarEstrellas(calificacion)
  }, err => {
    console.log(err)
  })
}

obtenerCalificacionProducto() {
  let token = decodificarToken();
  if(!token) return;
  let idUsuario = token.idUsuario;

  this.productosService.obtenerCalificacionUsuarioProducto(this.producto.idProducto, idUsuario).subscribe((res:any)=>{
    console.log(res)
    this.calificacion = res
    this.estrellas = this.generarEstrellas(this.calificacion)
  }, err => {
    console.log(err)
  }
  )
}

generarEstrellas(rango:number) {
  let estrellas = []
  for(let i=0;i<5;i++){
    if(i+1 <= rango){
      estrellas.push('text-warning fa fa-star')
    }else {
      estrellas.push('text-muted fa fa-star')
    }
  }
  return estrellas

}

comprobarEsVendedor(objProducto:any){
  let token = decodificarToken();
  //console.log(objProducto)
  if(!token || !objProducto) return false;
  
  return objProducto?.idUsuario == token.idUsuario
  
}

comprobarEsAdmin() {
  if(!this.usuarioActual) return false;
  if(this.usuarioActual.idRol == 3){
    return true
  }else {
    return false;
  }
}

obtenerUsuarioActual(){

  let token = decodificarToken();
  //console.log(objProducto)
  if(token?.correo){
    this.usuarioService.getUsuario(token.correo).subscribe((res:any)=>{
      this.usuarioActual=res;

    })
  }
  
}

mensaje(idUsuario:any){
  console.log(idUsuario);
  this.router.navigateByUrl(`/usuario/chat/${idUsuario}`);
  
}

actualizarContador() {
  //ESTO ES PARA MANDAR PUBLICIDAD DE LOS PRODUCTOS MAS VISTOS
  this.productosService.actualizarContador(this.producto.idProducto).subscribe(res => {
    //console.log(res)

  }, err => {
    console.log(err)
  })

}

obtenerUsuario(){
  this.usuarioService.obtenerUsuarioPorId(this.producto.idCliente).subscribe(res =>{
    this.usuarioVendedor = res[0];
    console.log(res)
  })
}




}





