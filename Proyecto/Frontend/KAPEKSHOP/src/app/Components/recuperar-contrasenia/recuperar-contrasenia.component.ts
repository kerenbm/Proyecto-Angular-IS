import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ConfigModal } from 'src/app/interfaces/config-modal';
import { UsuarioService } from 'src/app/Services/usuario.service';
import { ModalErrorComponent } from '../modal-error/modal-error.component';
import { ModalExitoComponent } from '../modal-exito/modal-exito.component';

@Component({
  selector: 'app-recuperar-contrasenia',
  templateUrl: './recuperar-contrasenia.component.html',
  styleUrls: ['./recuperar-contrasenia.component.css']
})
export class RecuperarContraseniaComponent implements OnInit {

  constructor( private usuarioServide:UsuarioService, private router: Router, private route: ActivatedRoute, private modalService:NgbModal) { }


  tokenValido:boolean = false
  contrasenia:string = ''
  confirmarContrasenia:string = ''

  formulario = new FormGroup({

    contrasenia: new FormControl('',[Validators.required, Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$')]),
    confirmarContrasenia: new FormControl('',[Validators.required, Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$'), this.passwordsMatch(this.contrasenia, this.confirmarContrasenia)])


  })

  obtenerErrorContrasenia() {
    return this.formulario.get('contrasenia')?.hasError('pattern') ? 'La contraseña debe tener un mínimo de 8 caracteres, al menos 1 letra mayúscula, 1 letra minúscula y 1 número' : 'La contraseña es obligatoria'

  }
  obtenerErrorContrasenia2() {
    if( this.formulario.get('confirmarContrasenia')?.value !== this.formulario.get('contrasenia')?.value) {
      return 'Las contraseñas no coinciden'
    }
    
    return 'La confirmación de contraseña es obligatoria'

  }

  passwordsMatch(password: string, confirmedPassword: string) {

    return (control: FormControl) : { [s: string]: boolean } | null =>{
      console.log(password,confirmedPassword);
      if (password !== confirmedPassword) {
        return { "passwordMismatch": true }
      } else {
        return null;
      }
  }
     

   }

   handleSubmit(event:Event) {
    let data = {
      contrasenia: this.formulario.get('contrasenia')?.value,
      token: this.route.snapshot.paramMap.get('token')
    }
    if(this.tokenValido){

      this.usuarioServide.nuevaContrasenia(data).subscribe( (res:any)=> {
        console.log(res)
        if(res) {
          this.open('exito', {titulo1: '¡Listo!', titulo2: 'La contraseña se ha actualizado correctamente'})
          this.router.navigate(['/inicio'])
        } else {
          this.open('error', {titulo1: '¡Error!', titulo2: 'No se pudo actualizar la contraseña'})
          this.router.navigate(['/'])
          
        }
      }, (err:any) => {
        console.log(err)
        this.open('error', {titulo1: '¡Error!', titulo2: err.error?.msj || 'No se pudo actualizar la contraseña'})
      })
    }

  }


  ngOnInit(): void {
    localStorage.removeItem('token')
    let token = this.route.snapshot.paramMap.get('token')
    // Validar el token en el backend
    this.usuarioServide.validarTokenRecuperarContrasenia(token).subscribe( (res:any)=> {

      this.tokenValido = true
    }, (err:any) => {
      console.log(err)
      this.tokenValido = false;
      this.open('error', {
        titulo1: '!Error!',
        titulo2: err.error.msj || 'Token no válido'
      })
      //this.router.navigateByUrl('/')
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
