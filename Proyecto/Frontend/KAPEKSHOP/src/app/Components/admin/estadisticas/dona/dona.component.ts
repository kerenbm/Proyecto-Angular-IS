import { Component, OnInit } from '@angular/core';
import { ChartConfiguration } from 'chart.js';
import { ProductosService } from 'src/app/Services/productos.service';
import { getDataColors } from '../helpers';

@Component({
  selector: 'app-dona',
  templateUrl: './dona.component.html',
  styleUrls: ['./dona.component.css']
})
export class DonaComponent implements OnInit {

  title = 'Las categorías más visitadas';
  colors = ['#007bff', '#dc3545', '#ffc107', '#28a745', '#6c757d', '#17a2b8', '#f8f9fa', '#343a40', '#7b1fa2'];

  // Dona
  public barChartLabels: string[] = [ ];
  public barChartDatasets: ChartConfiguration<'bar'>['data']['datasets'] = [
      { data: [ ], label: '', borderColor: getDataColors(), backgroundColor: getDataColors(20) },

    ];

  public barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: false,
    plugins: {
      legend: {position: 'left'}
    }
  };



  constructor( private productoService: ProductosService ) { 


  }

  ngOnInit(): void {
    this.obtenerCategoriasMasVisitadas();

  }
 
  obtenerCategoriasMasVisitadas() {
    this.productoService.obtenerCategoriasMasVisitadas().subscribe(
      (data) => {
        let datasets = []
        let labels = []

        for (let i = 0; i < data.length; i++) {
          datasets.push(data[i].contador)
          labels.push(data[i].nombreCategoria)
        }
        this.barChartLabels = labels
        this.barChartDatasets[0].data = datasets
      }
    )
  }

}
