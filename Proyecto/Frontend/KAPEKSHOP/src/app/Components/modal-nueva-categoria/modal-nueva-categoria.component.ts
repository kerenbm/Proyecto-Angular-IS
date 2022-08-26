import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Categoria } from 'src/app/interfaces/Categorias';
import { UsuarioService } from 'src/app/Services/usuario.service';
import {CategoriasService } from 'src/app/Services/categorias.service';

@Component({
  selector: 'app-modal-nueva-categoria',
  templateUrl: './modal-nueva-categoria.component.html',
  styleUrls: ['./modal-nueva-categoria.component.css']
})
export class ModalNuevaCategoriaComponent implements OnInit {
  @Input() objetoCategoria: Categoria | undefined
  @Input() editandoCategoria = false

  @Output() onEvento = new EventEmitter<boolean>();

  categoriaAgregada = false;
  imagenB64:any = null;
 
  categoria = new FormGroup({
    nombre: new FormControl(''),
    descripcion: new FormControl(''),
    imagen: new FormControl()
  })
  
  constructor( public activeModal: NgbActiveModal, private usuarioService:UsuarioService, private categoriasService: CategoriasService ) { }

  ngOnInit(): void {
    if(this.editandoCategoria){
      this.editarFormulario()
    }
  }

  agregarCategoria(){
    
    let objCategoria = {
      nombre: this.categoria.get('nombre')?.value,
      descripcion: this.categoria.get('descripcion')?.value,
      imagen: this.imagenB64
    }

    this.usuarioService.nuevaCategoria(objCategoria).subscribe( (res:any) => {
      this.categoriaAgregada = true;
      this.onEvento.emit(true)
      //queremos renderizar las card de categorias señores hhgb
      this.activeModal.close();
    }, (err:any) => {
      this.categoriaAgregada = false;
    });

  }

  handleSubmit(event: Event){
    event.preventDefault()
    if(this.editandoCategoria){
      this.editarCategoria()
    }else{
      this.agregarCategoria()
    }
  }

  editarFormulario(){
    this.categoria.get('nombre')?.setValue(this.objetoCategoria?.nombreCategoria)
    this.categoria.get('descripcion')?.setValue(this.objetoCategoria?.descripcion)
  }

  editarCategoria(){
    let objCategoria = {
      nombre: this.categoria.get('nombre')?.value,
      descripcion: this.categoria.get('descripcion')?.value,
      imagen: this.imagenB64 || this.objetoCategoria?.imagen
    }
    this.categoriasService.editarCategoria(objCategoria, this.objetoCategoria?.idCategoria).subscribe(res =>{
      console.log(res)
      this.onEvento.emit(true)
      this.activeModal.close();
    }, error =>{
      console.log(error)
      this.activeModal.close();
    })
  }

  async fileChangeEvent(event:any) {
    if(event.length != 0){
      this.imagenB64 = await this.toBase64(event[0])
    }
    console.log(this.imagenB64)
    console.log(this.categoria.value)

  }

  toBase64 = (file:any) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
});

  
}
