import { Component, OnInit } from '@angular/core';
import { Producto } from 'src/app/interfaces/producto';
import { ProductosService } from 'src/app/Services/productos.service';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent implements OnInit {

  productos:any=[]
  productosAnuncio:any=[]
  anunciosCarousel:any=[]
  options: Producto[] = [];
  imagenes:any=[]

  constructor(private productoService: ProductosService) { }

  ngOnInit(): void {
    this.obtenerProductos()
    
  }

  obtenerProductos(){
    this.productoService.getProductos().subscribe(res=>{
      this.productos = res;
      this.anunciosProductos()
      console.log(res)
    },error=>{
      console.log(error)
    })

  }

  getRandomInt(max:number) {
    return Math.floor(Math.random() * max);
  }

  anunciosProductos(){
    for(let i=0;i<3;i++){
      this.anunciosCarousel.push(this.productos[this.getRandomInt(this.productos.length)])

    }
    console.log(this.anunciosCarousel)
  }

  obtenerAnuncioProducto(){
    this.productoService.obtenerAnuncios().subscribe(res=>{
      this.productosAnuncio = res;
      console.log(res);
    })
  }

  eliminarProducto(id:number){
    this.productoService
  }

  obtenerImagenes(idProducto: number) {
    this.productoService.obtenerImagenesProducto(idProducto).subscribe(res => {
      this.imagenes = res;
      console.log(res)
    }, err => {
      console.log(err)
    })
  }



}
