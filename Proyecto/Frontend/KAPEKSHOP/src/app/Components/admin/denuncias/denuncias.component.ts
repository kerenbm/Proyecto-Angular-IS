import { Component, OnInit } from '@angular/core';
import { ProductosService } from 'src/app/Services/productos.service';
import { UsuarioService } from 'src/app/Services/usuario.service';
@Component({
  selector: 'app-denuncias',
  templateUrl: './denuncias.component.html',
  styleUrls: ['./denuncias.component.css']
})
export class DenunciasComponent implements OnInit {

  listarDenuncias:any=[]
  denuncias = [
    {id: 1, idUsuario:1, usuarioVendedor:1, producto:'Aquí todo el objeto de producto', asunto: 'Denuncia comportamiento inapropiado', descripcion: 'El vendedor no cumplio con...',  fecha: '2020-01-01', estado: 'Pendiente'},
  ]

  constructor(private productoService: ProductosService, private usuarioService:UsuarioService) { }

  ngOnInit(): void {
    this.obtenerDenuncia()
  }

  eliminarDenuncia(id: number){
    this.denuncias = this.denuncias.filter(denuncia => denuncia.id !== id);
    this.productoService.eliminarDenuncia(id).subscribe(res=>{
      console.log(res)
      this.obtenerDenuncia()
    },error=>{
      console.log(error)
    })
  }

  tomarDenuncia(id:number, idDenuncia:number){
    console.log("Eliminar cuenta del usuario")
    this.productoService.eliminarProducto(id).subscribe(res=>{
      this.eliminarDenuncia(idDenuncia)

    },error=>{
      console.log(error)
    })
  }

  obtenerDenuncia(){
    this.productoService.obtenerDenuncias().subscribe(res=>{
      this.listarDenuncias = res;
      console.log(res)
    },err=>{
      console.log(err)
    })
  }

}
