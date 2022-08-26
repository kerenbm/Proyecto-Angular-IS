import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-paginador',
  templateUrl: './paginador.component.html',
  styleUrls: ['./paginador.component.css']
})
export class PaginadorComponent implements OnInit {

  @Input() length = 50;
  @Input() pageSize = 4;
  @Input() pageIndex = 0;

  @Output() onIndexPaginador = new EventEmitter<any>();
  
  constructor() { }

  getLength(): number {
    return Math.ceil(this.length / this.pageSize);
  }

  ngOnInit(): void {
  }

}
