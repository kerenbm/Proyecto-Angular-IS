import { Component, OnInit } from '@angular/core';
import { ProductosService } from 'src/app/Services/productos.service';
import { UsuarioService } from 'src/app/Services/usuario.service';
import decodificarToken from 'src/app/helpers/decodificarToken';
import formatearDinero from 'src/app/helpers/formatoMoneda';



@Component({
  selector: 'app-anuncios',
  templateUrl: './anuncios.component.html',
  styleUrls: ['./anuncios.component.css']
})
export class AnunciosComponent implements OnInit {

  
  productos: any = []
  usuarioActual: any = [];
  estrellas: any = []

  constructor(private usuarioService: UsuarioService, private productosService: ProductosService) {
    
  }

  ngOnInit(): void {
    this.obtenerMasVistos()
    this. obtenerUsuarioActual()  
  }

  obtenerUsuarioActual() {

    let token = decodificarToken();
    if (token?.correo) {
      this.usuarioService.getUsuario(token.correo).subscribe((res: any) => {
        this.usuarioActual = res;
        console.log(res);

      })
    }
  }

  obtenerMasVistos() {
    this.productosService.obtenerAnuncios().subscribe(res=>{
      this.productos = res;
      console.log(res)
    })

  }
  

  eliminarAnuncio(event: any) {
    const idProducto = event
    console.log(idProducto)
    console.log(this.usuarioActual.idUsuario)
    if (confirm("¿Seguro que desea eliminar?")) {
      this.productosService.eliminarAnuncio(idProducto, this.usuarioActual.idUsuario).subscribe({
        error: (error) => {
          console.log(error)
        },
        next: (data) => {
          this.obtenerMasVistos()
        }
      })
    }
  }
  
  formatoDinero(cantidad: any) {
    return formatearDinero(cantidad)
  }
 

  comprobarEsVendedor(objProducto: any) {
    let token = decodificarToken();
    
    if (!token || !objProducto) return false;

    return objProducto?.idUsuario == token.idUsuario

  }

  comprobarEsAdmin() {
    if (!this.usuarioActual) return false;
    if (this.usuarioActual.idRol == 3) {
      return true
    } else {
      return false;
    }
  }


}