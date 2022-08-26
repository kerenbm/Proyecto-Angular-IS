import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/Services/usuario.service';
import { ModalExitoComponent } from 'src/app/Components/modal-exito/modal-exito.component'
import { ModalErrorComponent } from 'src/app/Components/modal-error/modal-error.component'
import { ConfigModal } from 'src/app/interfaces/config-modal';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-iniciar-sesion',
  templateUrl: './iniciar-sesion.component.html',
  styleUrls: ['./iniciar-sesion.component.css']
})
export class IniciarSesionComponent implements OnInit {

  constructor(private usuarioService: UsuarioService, private router: Router, private modalService: NgbModal) { }
  inicioSesion = new FormGroup({
    correo: new FormControl('', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
    contrasenia: new FormControl('', [Validators.required, Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$')])

  })

  obtenerErrorContrasenia() {
    return this.inicioSesion.get('contrasenia')?.hasError('pattern') ? 'La contraseña debe tener un mínimo de 8 caracteres, al menos 1 letra mayúscula, 1 letra minúscula y 1 número' : 'La contraseña es obligatoria'

  }
  obtenerErrorCorreo() {
    return this.inicioSesion.get('correo')?.hasError('pattern') ? 'El correo ingresado no es válido' : 'El correo es obligatorio'

  }

  handleSubmit(event: Event) {
    event.preventDefault()
    this.usuarioService.loginUsuario(this.inicioSesion.value).subscribe((res: any) => {
      if (res.token) {
        // Guardar el token en localStorage
        this.usuarioService.guardarToken(res.token)
        let config: ConfigModal = {
          titulo1: '¡Excelente!',
          titulo2: 'Inicio sesión correctamente'
        }
        this.open('exito', config)
        this.router.navigateByUrl('/categorias') // Redirigir a la página de inicio

      }
    }, (err: any) => {
      console.log(err)
      // Mostrar el modal de error

      let config: ConfigModal = {
        titulo1: '¡Error!',
        titulo2: err.error.msj || 'Error al iniciar sesión'
      }
      this.open('error', config)
    })

  }

  ngOnInit(): void {
  }



  open(tipoModal: string, config: ConfigModal) {


    let modalRef: NgbModalRef;
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
