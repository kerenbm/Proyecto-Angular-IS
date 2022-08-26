import {Component, Input} from '@angular/core';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { ConfigModal } from 'src/app/interfaces/config-modal';

@Component({
  selector: 'app-modal-error',
  template: `
    <div class="modal-error text-center">
      <div class="col-12">
        <button type="button" class="btn-close float-end mx-2 my-2" aria-label="Close" (click)="activeModal.dismiss('Cross click')"></button>
      </div>
      <div class="row">
            
        <div class="col-12">
          <span class="material-icons" style="color: white; font-size: 121px;">
            error
          </span>
        </div>
  
      </div>
    </div>
  
    <div class="text-center mt-3">
        <h3>{{mensaje.titulo1}}</h3>
        <h3>{{mensaje.titulo2}}</h3>
    </div>
    <div class="modal-footer">
        <button class="btn btn-primary text-center btn-1" style="margin-left: auto; margin-right: auto; padding-left: 1.25rem; padding-right: 1.25rem;" (click)="activeModal.close('Close click')">OK</button>
    </div>
  `,
})
export class ModalErrorComponent {
  @Input() mensaje:ConfigModal= {
    titulo1: '¡Error!',
    titulo2: 'No se pudo completar la operación'
  }
  constructor( public activeModal: NgbActiveModal ) { }

  ngOnInit(): void {
  }

}
