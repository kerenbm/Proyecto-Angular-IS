import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Categoria } from 'src/app/interfaces/Categorias';
import { UsuarioService } from 'src/app/Services/usuario.service';
import { ModalNuevaCategoriaComponent } from '../modal-nueva-categoria/modal-nueva-categoria.component';
import leerToken from 'src/app/helpers/decodificarToken';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css']
})
export class CategoriasComponent implements OnInit {
  
  //esVendedor:boolean = false
  
  

  usuarioActual:any = {}
  constructor( private modalService: NgbModal, private usuarioService:UsuarioService, private route: ActivatedRoute, private router:Router) { }
  
  categorias:Categoria[] = []

  ngOnInit(): void {

    this.obtenerCategorias()
    this.obtenerUsuarioActual()
  }

  

  obtenerUsuarioActual() {
    this.usuarioService.obtenerUsuarioActual().subscribe( (res:any) => {
      this.usuarioActual = res;
    })
  }

  comprobarUsuarioAdmin(){
    if(this.usuarioActual && this.usuarioActual.idRol==3) {
      return true
    }else{
      return false
    }
  }

  open() {
    let modalRef:NgbModalRef;
    modalRef = this.modalService.open(ModalNuevaCategoriaComponent)
    modalRef.componentInstance.onEvento.subscribe((res:any)=>{
      this.obtenerCategorias()
    })
  }

  obtenerCategorias(){
    this.usuarioService.obtenerCategorias().subscribe( (res:any) => {
      console.log(res)
      this.categorias = res;
    }, (err:any) => {
      console.log(this.categorias)
    })
  }

  //

}
