import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { ProductosService } from 'src/app/Services/productos.service';
import formatearDinero from 'src/app/helpers/formatoMoneda';
import { CategoriasService } from 'src/app/Services/categorias.service';



@Component({
  selector: 'app-buscar-producto',
  templateUrl: './buscar-producto.component.html',
  styleUrls: ['./buscar-producto.component.css']
})
export class BuscarProductoComponent implements OnInit {


  busqueda: string = '';
  productosFiltrados: any = [];
  verificacionProFil:any=false;
  opcionFiltrar:any;

  constructor(private productoService: ProductosService, private categoriaService: CategoriasService) { }

  ngOnInit(): void {
  }


  modalBuscar(opcion:any) {
    let busq = this.busqueda.toLowerCase()
    console.log(this.busqueda)
    if(opcion==='nombreP'){
      this.productoService.getProductos().subscribe(data => {
        const data1 = data.filter((el: any) =>
          JSON.parse(el.nombre.toLowerCase().indexOf(busq) ) > -1)
        console.log(data1)
        this.productosFiltrados= data1
        if(!this.productosFiltrados.length){
          this.verificacionProFil = true
        }
      })
    }else if(opcion==='departamento'){
      this.productoService.getProductos().subscribe(data => {
        const data1 = data.filter((el: any) =>
        JSON.parse(el.ubicacion.toLowerCase().indexOf(busq)) > -1)
        console.log(data1)
        this.productosFiltrados= data1
        if(!this.productosFiltrados.length){
          this.verificacionProFil = true
        }
      })
    }else if(opcion==='categoria'){

      console.log('Se filtrará por categoria')
      
      this.categoriaService.getCategorias().subscribe(data =>{
        const data1 = data.filter((fil: any)=> JSON.parse(fil.nombreCategoria.toLowerCase().indexOf(busq))> -1)
        console.log(data1)
        this.productoService.getProductoPorCategoria(data1[0].idCategoria).subscribe(res =>{
          this.productosFiltrados = res
          if(!this.productosFiltrados.length){
            this.verificacionProFil = true
          }
          console.log(res)
        })
        
        
      })
      /*
      this.productoService.getProductos().subscribe(data => {
        const data1 = data.filter((el: any) =>
        JSON.parse(el.idCategoria.toLowerCase().indexOf(busq)) > -1)
        console.log(data1)
        this.productosFiltrados= data1
        if(!this.productosFiltrados.length){
          this.verificacionProFil = true
        }
      })*/
    }
    
    /*
    this.productoService.getProductos().subscribe(data => {
      const data1 = data.filter((el: any) =>
        JSON.parse(el.nombre.toLowerCase().indexOf(busq) || el.ubicacion.toLowerCase().indexOf(busq) ) > -1)
      console.log(data1)
      this.productosFiltrados= data1
      if(!this.productosFiltrados.length){
        this.verificacionProFil = true
      }
    })*/
  }

  formatoDinero(cantidad: any) {
    return formatearDinero(cantidad)
  }



}
