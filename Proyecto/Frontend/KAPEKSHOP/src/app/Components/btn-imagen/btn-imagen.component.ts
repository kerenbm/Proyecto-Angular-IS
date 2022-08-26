import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-btn-imagen',
  templateUrl: './btn-imagen.component.html',
  styleUrls: ['./btn-imagen.component.css']
})
export class BtnImagenComponent implements OnInit {
  @Output() onChange = new EventEmitter<File>();

  formulario = new FormGroup({
    subirImg : new FormControl(''),
    inputImg: new FormControl( 'Subir imagen', [Validators.required]),

  })

  constructor() { }
  handleChange(event:any) {
    //console.log(event.target.files)
    this.formulario.get('inputImg')?.setValue(event.target.files[0].name)
    this.onChange.emit(event.target.files);
  }

  ngOnInit(): void {
  }

}