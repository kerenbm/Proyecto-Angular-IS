import { Component, Inject, OnInit } from '@angular/core';

export interface DialogData {
  usuario: 'vendedor' | 'comprador' ;
}


@Component({
  selector: 'app-tienda',
  templateUrl: './tienda.component.html',
  styleUrls: ['./tienda.component.css']
})
export class TiendaComponent implements OnInit {

  sidebarShow= true;
  constructor(

  ) { }

  ngOnInit(): void {
    
  }

  setSidebar(show:boolean) {
    this.sidebarShow = !this.sidebarShow;
  }

  




}


