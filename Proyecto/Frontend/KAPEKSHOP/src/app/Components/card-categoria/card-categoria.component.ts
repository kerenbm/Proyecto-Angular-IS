import { Component, ComponentFactoryResolver, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import leerToken from 'src/app/helpers/decodificarToken';
import { Categoria } from 'src/app/interfaces/Categorias';
import { ConfigModal } from 'src/app/interfaces/config-modal';
import { CategoriasService } from 'src/app/Services/categorias.service';
import { UsuarioService } from 'src/app/Services/usuario.service';
import { ModalConfirmacionComponent } from '../modal-confirmacion/modal-confirmacion.component';
import { ModalNuevaCategoriaComponent } from '../modal-nueva-categoria/modal-nueva-categoria.component';


@Component({
  selector: 'app-card-categoria',
  templateUrl: './card-categoria.component.html',
  styleUrls: ['./card-categoria.component.css']
})
export class CardCategoriaComponent implements OnInit {

  usuarioActual:any;
  token:any = leerToken();
  suscripcionCategoria = false;
  @Input() categoria:Categoria | undefined;
  @Output() onEvento = new EventEmitter<boolean>();
  constructor( private router:Router,private modalService:NgbModal , private usuarioService: UsuarioService, private categoriasService: CategoriasService) { }

  ngOnInit(): void {
    
    if(this.token?.correo){
      this.usuarioService.getUsuario(this.token.correo).subscribe((res:any)=>{
        this.usuarioActual=res;
        this.comprobarSuscripcion()
      })
    }
    
  }
  onclickCategoria() {
    this.router.navigateByUrl(`/tienda/categorias/${this.categoria?.idCategoria}`)
  }

  open() {

    let modalRef:NgbModalRef;
    modalRef = this.modalService.open(ModalConfirmacionComponent)
    let configuracion:ConfigModal = {
      titulo1: '¿Está seguro de eliminar la categoria?',
      titulo2:'Se eliminará la categoria',
      parametros:{idCategoria:this.categoria?.idCategoria}
    }

    modalRef.componentInstance.mensaje = configuracion
    modalRef.componentInstance.onEvento.subscribe((res:any)=>[
      this.onEvento.emit(true)
    ])

  }

  editarCategoria(){
    this.abrirModalCategoria()

  }

  abrirModalCategoria() {

    let modalRef:NgbModalRef;
    modalRef = this.modalService.open(ModalNuevaCategoriaComponent)
    modalRef.componentInstance.editandoCategoria = true
    modalRef.componentInstance.objetoCategoria = this.categoria
    modalRef.componentInstance.onEvento.subscribe((res:any)=>[
      this.onEvento.emit(true)
    ])

  }

  comprobarUsuarioAdmin(){
    if(this.usuarioActual && this.usuarioActual.idRol==3) {
      return true
    }else{
      return false
    }
  }

  suscribirse(){
    //suscribirse a una categoria
    //this.categoriasService.suscribirse(this.categoria?.idCategoria,this.usuarioActual.idUsuario, this.usuarioActual.correo)
    console.log(this.usuarioActual)
    if(!(this.categoria && this.usuarioActual)){
      return 
    }
    this.categoriasService.suscribirse(this.categoria?.idCategoria,this.usuarioActual.idUsuario, this.usuarioActual.correo).subscribe(res =>{
      console.log(res)
      this.comprobarSuscripcion()
    },error =>{
      console.log(error)
    })
  }
  
  comprobarSuscripcion(){
    if(!(this.categoria && this.usuarioActual)){
      return 
    }
    this.categoriasService.verificarSuscripcion(this.categoria?.idCategoria,this.usuarioActual.correo).subscribe(res=>{
      this.suscripcionCategoria = res;
      console.log(res)
    }, error =>{
      console.log(error)
    })
    
  }

  actualizarSuscripcion(){
    if(this.suscripcionCategoria){
      this.desinscribirse()
    }else{
      this.suscribirse()
    }
  }

  desinscribirse(){
    if(!(this.categoria && this.usuarioActual)){
      return 
    }
    this.categoriasService.desuscribirse(this.categoria?.idCategoria,this.usuarioActual.idUsuario).subscribe(res =>{
      console.log(res)
      this.comprobarSuscripcion()
    },error =>{
      console.log(error)
    })
  }
}
