import { Component, OnInit } from '@angular/core';
import leerToken from 'src/app/helpers/decodificarToken';
import { ProductosService } from 'src/app/Services/productos.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {


  constructor(private productosService: ProductosService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    //leerToken();
  }

}
