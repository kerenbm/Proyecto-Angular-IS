import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfigModal } from 'src/app/interfaces/config-modal';
import { CategoriasService } from 'src/app/Services/categorias.service';
import { ProductosService } from 'src/app/Services/productos.service';

@Component({
  selector: 'app-modal-confirmacion',
  templateUrl: './modal-confirmacion.component.html',
  styleUrls: ['./modal-confirmacion.component.css']
})
export class ModalConfirmacionComponent implements OnInit {

  @Input() mensaje:ConfigModal = {
    titulo1: '¿Está seguro en eliminar categoria?',
    titulo2: 'Se eliminará la categoria',
  }
  @Output() onEvento = new EventEmitter<boolean>()
  
  constructor(public activeModal: NgbActiveModal, private categoriaService: CategoriasService, private ProductosService: ProductosService) { }

  ngOnInit(): void {
  }

  eliminarCategoria(){
    this.categoriaService.eliminarCategoria(this.mensaje.parametros.idCategoria).subscribe(res =>{
      console.log(res)
      this.onEvento.emit(true)
      this.activeModal.close('Close click')
    }, error =>{
      console.log(error)
      this.onEvento.emit(true)
      this.activeModal.close('Close click')
    })

  }

  clickConfirmar(){
    if(this.mensaje.parametros?.eliminarProducto){
      this.eliminarProducto()
    }else{
      this.eliminarCategoria()
    }
  }

  eliminarProducto(){
    //this.ProductosService.eliminarProducto()
    this.ProductosService.eliminarProducto(this.mensaje.parametros.idProducto).subscribe(res =>{
      console.log(res)
      this.onEvento.emit(true)
      this.activeModal.close('close click')
    },error =>{
      this.onEvento.emit(true)
      this.activeModal.close('Close click')
    })
  }


}
