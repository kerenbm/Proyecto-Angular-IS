import { Component, OnInit } from '@angular/core';
import { ChartConfiguration } from 'chart.js';
import { ProductosService } from 'src/app/Services/productos.service';
import { getDataColors } from '../helpers';

@Component({
  selector: 'app-polar',
  templateUrl: './polar.component.html',
  styleUrls: ['./polar.component.css']
})
export class PolarComponent implements OnInit {

  title = 'Los productos más visitados';
  public barChartLabels: string[] = [  ];
  public barChartDatasets: ChartConfiguration<'bar'>['data']['datasets'] = [
    { data: [  ], borderColor: getDataColors(), backgroundColor: getDataColors(20) },
  ];
  public barLegend = true;

  public barOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: false,
    plugins: {
      legend: {position: 'left'}
    }
  };


  constructor( private productoService: ProductosService) { }

  ngOnInit(): void {
    this.obtenerProductosMAsVisitados();
  }

  obtenerProductosMAsVisitados() {
    this.productoService.obtenerProductosMasVisitados().subscribe(
      (data) => {
        let datasets = []
        let labels = []

        for (let i = 0; i < data.length; i++) {
          datasets.push(data[i].contador)
          console.log(datasets)
          labels.push(data[i].nombre)
        }
        this.barChartLabels = labels
        this.barChartDatasets[0].data = datasets
      }
    )
  }

}
