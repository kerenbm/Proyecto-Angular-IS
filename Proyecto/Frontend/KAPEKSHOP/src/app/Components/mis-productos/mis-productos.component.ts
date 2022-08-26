import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import leerToken from 'src/app/helpers/decodificarToken';
import { Categoria } from 'src/app/interfaces/Categorias';
import { CategoriasService } from 'src/app/Services/categorias.service';
import { ProductosService } from 'src/app/Services/productos.service';

@Component({
  selector: 'app-mis-productos',
  templateUrl: './mis-productos.component.html',
  styleUrls: ['./mis-productos.component.css']
})
export class MisProductosComponent implements OnInit {

  listarProductos:any=[]
  categorias:Categoria[] = [

  ]

  productos:any = [
    {imagen: 'camara.jpg', valoracion: 4, precio:1000},
  ];

  @Input() categoriaActual:Categoria | undefined;
  @Input() editandoProducto =false;
  productoActual:any;
  inicio:number = 0
  final:number = 12;
  
  constructor(private route: ActivatedRoute, private categoriaService:CategoriasService, private productosService:ProductosService) { }


  mostarFormulario = false;

  ngOnInit(): void {
    //let idCategoria = parseInt(this.route.snapshot.paramMap.get('idCategoria') || "")
    //this.categoriaActual = this.categorias.filter(cat => cat.idCategoria == idCategoria)[0]
    //this.obtenerCategoria(idCategoria)
    

  }


  obtenerProductosPorId() {
    console.log(`Obteniendo los productos para la categoría: `)
    console.log(this.categoriaActual)
    this.mostarFormulario=false
    this.productosService.getProductoPorCategoria(this.categoriaActual?.idCategoria).subscribe((res:any)=>{
      //this.listarProductos = res;
      this.editandoProducto=false
      this.listarProductos = res.filter( (producto:any) => !this.comprobarEsVendedor(producto))
      
      console.log(res)
    }, (err:any)=>{
      
    })
    
  }

  editarProducto(objProducto:any){
    this.mostarFormulario=true
    this.editandoProducto = true
    this.productoActual = objProducto
    
  }

  setMostrarFormulario() {
    this.mostarFormulario = !this.mostarFormulario;
    this.editandoProducto=false
  }

  obtenerCategoria(idCategoria:number) {
    this.categoriaService.getCategoria(idCategoria).subscribe( (res:any) => {
      this.categoriaActual = res;
      this.obtenerProductosPorId()
      //console.log(res)
    })
  }

  paginacionProductos(inicioI:number, finalI:number){
    return this.listarProductos.slice(inicioI,finalI)
  }

  cambiarPagina(event:any) {
    this.inicio = event.pageIndex * event.pageSize
    this.final = this.inicio + event.pageSize
  }

  comprobarEsVendedor(objProducto:any){
    let token = leerToken()
    //console.log(objProducto)
    if(!token || !objProducto) return false;
    
    return objProducto?.idCliente == token.idUsuario
    
  }

}
