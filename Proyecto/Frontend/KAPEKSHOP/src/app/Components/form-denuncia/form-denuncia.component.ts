import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductosService } from 'src/app/Services/productos.service';
import { UsuarioService } from 'src/app/Services/usuario.service';

@Component({
  selector: 'app-form-denuncia',
  templateUrl: './form-denuncia.component.html',
  styleUrls: ['./form-denuncia.component.css']
})
export class FormDenunciaComponent implements OnInit {


  idProducto:number;
  producto:any;
  productoActual:any;
  usuarioActual:any;

  constructor(private route: ActivatedRoute,private productoService: ProductosService, private usuarioService: UsuarioService, private router: Router) {
    this.idProducto = this.route.snapshot.params["id"];
   }

  ngOnInit(): void {
    this.obtenerUsuarioActual()
    
  }

  formularioDenuncia = new FormGroup({
    opcionDenuncia: new FormControl("", [Validators.required]),
    motivoDenuncia: new FormControl("",[Validators.required]),
    otrosDenuncia:new FormControl("",[Validators.required])
  })

  guardarDenuncia(){
    if(!this.formularioDenuncia.invalid){
      let denuncia = {
        idU: this.usuarioActual.idUsuario,
        opcion : this.formularioDenuncia.get('opcionDenuncia')?.value,
        motivo : this.formularioDenuncia.get('motivoDenuncia')?.value,
        otro : this.formularioDenuncia.get('otrosDenuncia')?.value
      }
      this.productoService.denunciaProducto(this.idProducto,denuncia).subscribe(res=>{
       console.log(res) 
       this.router.navigateByUrl(`producto/detalle/${this.idProducto}`)
      },error =>{
        console.log(error)
      })
      
    }
    
  }

  obtenerUsuarioActual() {
    this.usuarioService.obtenerUsuarioActual().subscribe( (res:any) => {
      this.usuarioActual = res;
    })
  }


  

}




  
