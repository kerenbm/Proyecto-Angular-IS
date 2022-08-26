import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgModule } from '@angular/core';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  @Input() sidebarShow: boolean = false;
  @Output() sidebarShowChange = new EventEmitter<boolean>();
  @Output() onClickItem = new EventEmitter<number>();

  items = ['denuncias', 'categorias', 'anuncios', 'estadisticas']
  itemActual = this.items[3]
  constructor() { }

  ngOnInit(): void {
  }

  clickClose() {
    this.sidebarShow = false;
    this.sidebarShowChange.emit(this.sidebarShow);
  }

  setItemActual(value:number) {
    this.itemActual = this.items[value];
    this.onClickItem.emit(value);
  }


}
