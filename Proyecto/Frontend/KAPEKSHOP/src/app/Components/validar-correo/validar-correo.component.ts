import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { UsuarioService } from 'src/app/Services/usuario.service';
import { ModalExitoComponent } from '../modal-exito/modal-exito.component';
import { ModalErrorComponent } from '../modal-error/modal-error.component';
import { ConfigModal } from 'src/app/interfaces/config-modal';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-validar-correo',
  templateUrl: './validar-correo.component.html',
  styleUrls: ['./validar-correo.component.css']
})
export class ValidarCorreoComponent implements OnInit {

  constructor( private route: ActivatedRoute,  private usuarioService:UsuarioService, private router: Router, private modalService:NgbModal ) { }

  ngOnInit(): void {
    let token = this.route.snapshot.paramMap.get('token')
    // Validar el token en el backend
    this.usuarioService.validarCorreo(token).subscribe( (res:any)=> {
      this.open('exito', {
        titulo1: '!Excelente!',
        titulo2: 'Su cuenta ha sido verificada correctamente'
      })
      this.router.navigateByUrl('/inicio')
    }, (err:any) => {
      this.open('error', {
        titulo1: '!Error!',
        titulo2: 'Token no válido'
      })
    })

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
