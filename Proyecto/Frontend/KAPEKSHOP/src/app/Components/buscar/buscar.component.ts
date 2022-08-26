
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {FormControl} from '@angular/forms';

import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { Usuario } from 'src/app/interfaces/usuario';
import { UsuarioService } from 'src/app/Services/usuario.service';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styleUrls: ['./buscar.component.css']
})
export class BuscarComponent implements OnInit {

  destinatario:Usuario | undefined;
  @Output() userChat = new EventEmitter<Usuario>();

  constructor (private usuarioService: UsuarioService){
    
  }

  myControl = new FormControl('');
  options: Usuario[] = [];
  filteredOptions: Observable<Usuario[]> | undefined = undefined;

  


  ngOnInit() {
    this.obtenerUsuarios()
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => {
        const name = typeof value === 'string' ? value : value?.name;
        return name ? this._filter(name as string) : this.options.slice();
      }),
    );
  }

  displayFn(user: Usuario): string {
    return user && user.nombre ? user.nombre : '';
  }

  private _filter(name: string): Usuario[] {
    const filterValue = name.toLowerCase();

    return this.options.filter(option => option.correo.toLowerCase().includes(filterValue));
  }

  obtenerUsuarios(){
    this.usuarioService.getUsuarios().subscribe(res =>{
      this.options = res
      console.log(res)
    }, error =>{
      console.log(error)
    })
  }

  seleccionarUsuario(option:any){
    this.destinatario = option
    this.userChat.emit(this.destinatario)
  }

  
}



