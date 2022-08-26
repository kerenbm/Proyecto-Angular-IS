import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  @Input() sidebarShow: boolean = false;
  @Output() sidebarShowChange = new EventEmitter<boolean>();
  itemActual = 3



  constructor() { }

  ngOnInit(): void {
  }
  
  setSidebar(b:boolean){
    this.sidebarShow = b
    this.sidebarShowChange.emit(this.sidebarShow)
    console.log(this.sidebarShow)
  }

  setItemActual(value:number){
    this.itemActual = value
  }
}

