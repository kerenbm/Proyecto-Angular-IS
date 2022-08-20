import { AbstractControl, FormControl ,ValidationErrors, ValidatorFn } from "@angular/forms";


export const contraseniasIguales: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const contrasenia = control.get('contrasenia');
    const confirmarcontrasenia = control.get('confirmarcontrasenia');
  
    return contrasenia?.value== confirmarcontrasenia?.value ? null: {contraseniasIguales:true};
  };