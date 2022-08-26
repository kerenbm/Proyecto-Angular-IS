import { Component, Input, EventEmitter, Output, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import leerToken from 'src/app/helpers/decodificarToken';
import { Categoria } from 'src/app/interfaces/Categorias';
import { Producto } from 'src/app/models/producto';
import { ProductosService } from 'src/app/Services/productos.service';
import { UsuarioService } from 'src/app/Services/usuario.service';


@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit {
  imagenes:any=[]
  activatedRoute: any;
  imagenB64:any = null;
  @Output() actualizarProducto = new EventEmitter<boolean>()
  constructor(private productosService:ProductosService, private usuarioService:UsuarioService, private route: ActivatedRoute, private router: Router) { }
  @Input() categoriaActual: Categoria | any = {};
  @Input() editandoProducto = false
  @Input() productoActual:any

  usuarioActual:any;

  ngOnInit(): void {
    this.formularioCrear.get('categoriaFormControl')?.setValue(this.categoriaActual.nombreCategoria)
    console.log(this.categoriaActual.nombreCategoria)
    this.productosService.crearProducto(Producto);
    this.obtenerUsuarioActual()
    //this.editarProducto()
    console.log(this.editandoProducto)
    if(this.editandoProducto){
      this.enviarDatosProducto()
    }
    
  }

  formularioCrear = new FormGroup( {
    nombreFormControl: new FormControl("", [Validators.required]),
    categoriaFormControl:new FormControl(this.categoriaActual?.nombreCategoria),
    costoFormControl: new FormControl("", [Validators.required]),
    ubicacionFormControl: new FormControl("",Validators.required),
    estadoFormControl : new FormControl('', [Validators.required]),
    descripcionFormControl: new FormControl('',[Validators.required]),
    
  })
  enviarFormulario(){
    
    if( !this.formularioCrear.invalid) {

      let producto = {
        nombre: this.formularioCrear.get('nombreFormControl')?.value,
        categoria: this.categoriaActual.idCategoria,
        costo:this.formularioCrear.get('costoFormControl')?.value,
        estado:this.formularioCrear.get('estadoFormControl')?.value,
        descripcion:this.formularioCrear.get('descripcionFormControl')?.value,
        ubicacion: this.formularioCrear.get('ubicacionFormControl')?.value,
        idUsuario: this.usuarioActual.idUsuario,
        imagen: this.imagenB64
        
      }
      
      
      this.productosService.crearProducto(producto).subscribe( (res:any) => {

        let idProducto = res.data.insertId
        this.subirImagenes(idProducto)
        this.actualizarProducto.emit(true)
      })

    }
    
    
  }

  subirImagenes(idProducto:number) {
    this.imagenes.forEach( (imagen:any) => {
      // try {
      //   await this.productosService.subirImagenProducto(idProducto, imagen.base64 ).toPromise()
      // } catch (error) {
      //   console.log(error)
      // }
      this.productosService.subirImagenProducto(idProducto, imagen.base64 ).subscribe( (res:any) => {
        console.log(res)
      }, err => {
        console.log(err)
      })
    });
  }

  async fileChangeEvent(event:any) {
    if(event.length != 0){
      this.imagenB64 = await this.toBase64(event[0])
      //console.log(event.length)
      for (let index = 0; index < event.length; index++) {
        const file = event[index];
        this.imagenes.push( {name: file.name, base64: await this.toBase64(file)})
        
      }
    }
  }

  

  //para varias imagenes
  async convertirImagen(evento:any){
    
    console.log(evento);
    
    for(let i=0;i<evento.length;i++){

      let  base64 = await this.toBase64(evento[i]);
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

  obtenerUsuarioActual(){
    this.usuarioService.obtenerUsuarioActual().subscribe( (res:any) => {
      this.usuarioActual = res;
      console.log(res);
    })
  }
  editarProducto(): void {
    this.activatedRoute.params.subscribe(
      (      e: { [x: string]: any; })=>{
        let id=e['idProducto'];
      if(id){
        this.productosService.getProductoPorCategoria(id).subscribe(
          es=>this.editarProducto=es
        );
      }      }
    );
  }

  editarProductobeta(){

    if(this.editandoProducto){
      let producto = {
        nombre: this.formularioCrear.get('nombreFormControl')?.value,
        categoria: this.categoriaActual.idCategoria,
        costo:this.formularioCrear.get('costoFormControl')?.value,
        estado:this.formularioCrear.get('estadoFormControl')?.value,
        descripcion:this.formularioCrear.get('descripcionFormControl')?.value,
        ubicacion: this.formularioCrear.get('ubicacionFormControl')?.value,
        idUsuario: this.usuarioActual.idUsuario,
        imagen: this.imagenB64 || this.productoActual.imagen
        
        
      }

      this.productosService.editarProducto(this.productoActual.idProducto, producto).subscribe( (res:any) => {
        console.log(res)
        this.editandoProducto=false
        this.actualizarProducto.emit(true)
      })
    }
  }
  
  handleSubmit(){
    if(this.editandoProducto){
      this.editarProductobeta()
    }else{
      this.enviarFormulario()
    }
  }

  enviarDatosProducto(){
    this.formularioCrear.get('nombreFormControl')?.setValue(this.productoActual.nombre),
    this.formularioCrear.get('costoFormControl')?.setValue(this.productoActual.costo),
    this.formularioCrear.get('estadoFormControl')?.setValue(this.productoActual.estado),
    this.formularioCrear.get('descripcionFormControl')?.setValue(this.productoActual.descripcion),
    this.formularioCrear.get('ubicacionFormControl')?.setValue(this.productoActual.ubicacion),
    this.formularioCrear.get('imagenFormControl')?.setValue(this.productoActual.imagen)
    console.log(this.formularioCrear.value)
    console.log(this.productoActual)
  }

}

