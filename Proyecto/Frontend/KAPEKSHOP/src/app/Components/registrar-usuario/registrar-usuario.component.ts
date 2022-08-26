import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormControl,FormGroup,FormGroupDirective, NgForm, Validators } from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { ModalErrorComponent} from 'src/app/Components/modal-error/modal-error.component'
import { ModalExitoComponent } from 'src/app/Components/modal-exito/modal-exito.component';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario';
import { UsuarioService } from 'src/app/Services/usuario.service'
import { ConfigModal} from 'src/app/interfaces/config-modal';
import { contraseniasIguales } from 'src/app/helpers/validaciones';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
@Component({
  selector: 'app-registrar-usuario',
  templateUrl: './registrar-usuario.component.html',
  styleUrls: ['./registrar-usuario.component.css']
})
export class RegistrarUsuarioComponent implements OnInit {
  checked = false;
  hide = true;

  constructor( private modalService: NgbModal, private router: Router, private usuarioService:UsuarioService ) { 
  }
  abrirModal( modal:any ){

    this.modalService.open(
      modal,
      {
        size: 'xs',
        centered: true
      }
      );

    }
    formularioRegistro = new FormGroup( {
      nombreCompletoFormControl: new FormControl("", [Validators.required]),
      apellidoCompletoFormControl: new FormControl("", [Validators.required]),
      emailFormControl : new FormControl('', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
      contraseniaFormControl: new FormControl('',[Validators.required, Validators.pattern('^(?=.?[A-Z])(?=.?[a-z])(?=.*?[0-9]).{8,}$')]),
      confirmarcontraseniaFormControl: new FormControl('',[Validators.required, Validators.pattern('^(?=.?[A-Z])(?=.?[a-z])(?=.*?[0-9]).{8,}$')]),
      telefonoFormControl: new FormControl('',[Validators.required, Validators.pattern("^((\\+504-?)|0)?[0-9]{8}$")]),
      direccionFormControl: new FormControl('',[Validators.required]),
      departamentoFormControl: new FormControl("", [Validators.required]),
      terminosFormControl: new FormControl(this.checked, [Validators.required,  Validators.requiredTrue]),
      
    },
    { validators:contraseniasIguales });

    enviarFormulario(){
      
      if( !this.formularioRegistro.invalid) {

        let usuario = {
          nombre: this.formularioRegistro.get('nombreCompletoFormControl')?.value,
          apellido:this.formularioRegistro.get('apellidoCompletoFormControl')?.value,
          correo:this.formularioRegistro.get('emailFormControl')?.value,
          direccion:this.formularioRegistro.get('direccionFormControl')?.value,
          departamento:this.formularioRegistro.get('departamentoFormControl')?.value,
          contrasenia: this.formularioRegistro.get('contraseniaFormControl')?.value,
          confirmarcontrasenia: this.formularioRegistro.get('confirmarcontraseniaFormControl')?.value,
          estado: null,
          telefono :this.formularioRegistro.get('telefonoFormControl')?.value,
        }

        if(this.formularioRegistro.get('contraseniaFormControl')?.value === this.formularioRegistro.get('confirmarcontraseniaFormControl')?.value ){
          this.usuarioService.crearUsuario(usuario).subscribe( (res:any) => {
            console.log(res)
            let config:ConfigModal = {
              titulo1: '¡Excelente!',
              titulo2: res.msj
            }
            this.open('exito',config )
            this.router.navigateByUrl('/inicio')
          }, (err:any) => {
            let config:ConfigModal = {
              titulo1: '¡Error!',
              titulo2: err.error.msj ||'No se pudo registrar el usuario'
            }
            console.log(err)
            this.open('error',config )
          })
        }else{
          let config:ConfigModal = {
            titulo1: '¡Error!',
            titulo2: 'Contraseñas distintas, vuelva a intentar'
          }
          this.open('error',config )
        }
        
        
        
      }

      
    }

    
    
    enviarAInicio(modal:any){
      modal.close('Close click')
      this.router.navigateByUrl("/login");
  
    }
    matcher = new MyErrorStateMatcher();
  ngOnInit(): void {
  }
  obtenerErrorContrasenia() {

    return this.formularioRegistro.get('contraseniaFormControl')?.hasError('pattern') ? 'La contraseña debe tener un mínimo de 8 caracteres, al menos 1 letra mayúscula, 1 letra minúscula y 1 número' : 'La contraseña es obligatoria'

  }
  obtenerErrorCorreo() {
    return this.formularioRegistro.get('emailFormControl')?.hasError('pattern') ? 'El correo ingresado no es válido' : 'El correo es obligatorio'

  }
  getErrorMessageconfirmarcontrasenia(){

    if (this.formularioRegistro.get('confirmarcontrasenia')?.hasError('pattern')) {
      return 'Este es un campo obligatorio';
    }
    if (this.formularioRegistro.getError('contraseniasIguales')) {

      return 'Las contraseñas no coinciden';
    }

    return "Ocurrio un error";
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