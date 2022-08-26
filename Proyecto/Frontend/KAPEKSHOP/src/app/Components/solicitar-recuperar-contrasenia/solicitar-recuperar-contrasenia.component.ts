import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ConfigModal } from 'src/app/interfaces/config-modal';
import { UsuarioService } from 'src/app/Services/usuario.service';
import { ModalErrorComponent } from '../modal-error/modal-error.component';
import { ModalExitoComponent } from '../modal-exito/modal-exito.component';

@Component({
  selector: 'app-solicitar-recuperar-contrasenia',
  templateUrl: './solicitar-recuperar-contrasenia.component.html',
  styleUrls: ['./solicitar-recuperar-contrasenia.component.css']
})
export class SolicitarRecuperarContraseniaComponent implements OnInit {

  solicitudEnviada = false;
  errorSolicitud = false;

  constructor( private usuarioService:UsuarioService, private router: Router, private modalService:NgbModal) {  }
  formulario = new FormGroup({
    correo: new FormControl('', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")])
  })


  obtenerErrorCorreo() {
    return this.formulario.get('correo')?.hasError('pattern') ? 'El correo ingresado no es válido' : 'El correo es obligatorio'

  }

  handleSubmit(event:Event) {
    event.preventDefault()
    this.usuarioService.recuperarContrasenia(this.formulario.value.correo).subscribe( (data:any) => {


      if(data) {
        this.open('exito', {titulo1: '¡Excelente!', titulo2:data.msj })
        this.solicitudEnviada = true;
        this.errorSolicitud = false
      } else {
          this.open('error', {titulo1: '¡Error!', titulo2:'error al solicitar recuperar contraseña'})
          this.errorSolicitud = true;
        }
        
      }, (error) => {
        
      this.errorSolicitud = true;
      this.open('error', {titulo1: '¡Error!', titulo2:error.error.msj})
    })

  }

  ngOnInit(): void {
  }

  open(tipoModal:string, config:ConfigModal) {


    let modalRef:NgbModalRef;
    switch (tipoModal) {

      case 'exito':
        modalRef = this.modalService.open(ModalExitoComponent)
        modalRef.componentInstance.mensaje = config

        break;
      case 'error':
        modalRef = this.modalService.open(ModalErrorComponent)
        modalRef.componentInstance.mensaje = config
        break;
    
      default:
        break;
    }
  }

}
