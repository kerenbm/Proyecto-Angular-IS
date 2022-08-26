import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';




@Component({
  selector: 'app-imagenes-producto',
  templateUrl: './imagenes-producto.component.html',
  styleUrls: ['./imagenes-producto.component.css']
})


export class ImagenesProductoComponent implements OnInit {

  @Input() imagenes:any = []
  @Input() cols:string = "col-12"
  @Output() onDeleteImage = new EventEmitter<any>()

  

  constructor(  ) { 
  }

  ngOnInit(): void {
    
  }

  eliminarImagen(name:any) {
    let imagenesActualizado = this.imagenes.filter( (imagen:any) => imagen.name !== name )
    this.onDeleteImage.emit(imagenesActualizado)
  }

  


}

