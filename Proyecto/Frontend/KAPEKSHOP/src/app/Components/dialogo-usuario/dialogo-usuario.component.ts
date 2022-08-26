
import {Component, Inject, OnInit}  from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

export interface DialogData {
  usuario: string;
}


@Component({
  selector: 'app-dialogo-usuario',
  templateUrl: './dialogo-usuario.component.html',
  styleUrls: ['./dialogo-usuario.component.css']
})
export class DialogoUsuarioComponent implements OnInit {


  labelPosition: 'comprador' | 'vendedor' = "comprador";

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData, private router: Router, private dialog:MatDialog) {}

  onCLick(){
    if(this.labelPosition === 'comprador'){
      this.router.navigateByUrl('/tienda/comprar/categorias');
    }else if(this.labelPosition === 'vendedor'){
      this.router.navigateByUrl('/tienda/vender/categorias');
    }
    this.dialog.closeAll()
    
  }


  ngOnInit(): void {
  }


}





