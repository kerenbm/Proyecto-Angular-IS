import { Component, OnInit } from '@angular/core';
import { ChartConfiguration } from 'chart.js';
import { ProductosService } from 'src/app/Services/productos.service';
import { getDataColors } from '../helpers';
@Component({
  selector: 'app-barras',
  templateUrl: './barras.component.html',
  styleUrls: ['./barras.component.css']
})
export class BarrasComponent implements OnInit {

  title = 'Productos más visitados por departamento';

  public barChartLegend = true;
  public barChartPlugins = [];
  public datasetsList = []

  public barChartData: ChartConfiguration<'bar'>['data'] = {
    //labels: [ 'Atlántida', 'Choluteca', 'Colón', 'Copán', 'Cortes', 'Comayagua', 'El Paraíso', 'Francisco Morazan', 'Gracias a Dios', 'Intibuca', 'Islas de la Bahia', 'La Paz', 'Lempira', 'Ocotepeque', 'Olancho', 'Santa Barbara', 'Valle', 'Yoro' ],
    labels : [],
    datasets: [

    ]
  };

  public barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: false,
    plugins: {
      legend: {position: 'left'},
      
    }
  };


  constructor( private productoService: ProductosService ) { }

  ngOnInit(): void {
    this.obtenerProductosMasVisitadosDepartamento()
  }

  obtenerProductosMasVisitadosDepartamento() {
    this.productoService.obtenerProductosMasVisitadosPorDepartamento().subscribe(
      (data:any) => {
        //let labels = Object.keys(data)
        let label = [ 'Atlántida', 'Choluteca', 'Colón', 'Copán', 'Cortes', 'Comayagua', 'El Paraíso', 'Francisco Morazan', 'Gracias a Dios', 'Intibuca', 'Islas de la Bahia', 'La Paz', 'Lempira', 'Ocotepeque', 'Olancho', 'Santa Barbara', 'Valle', 'Yoro' ]
        

        
        let labels:any = {
          "Atlántida": 1,
          "Choluteca": 2,
          "Colón": 3,
          "Copán": 4,
          "Cortes": 5,
          "Comayagua": 6,
          "El Paraíso": 7,
          "Francisco Morazan": 8,
          "Gracias a Dios": 9,
          "Intibuca": 10,
          "Islas de la Bahia": 11,
          "La Paz": 12,
          "Lempira": 13,
          "Ocotepeque": 14,
          "Olancho": 15,
          "Santa Barbara": 16,
          "Valle": 17,
          "Yoro": 18
        }



        let datasets:any = [  ]


        for(let i = 0; i < data.length; i++) {
          let sets:any= { data: [...Array(18)].map(x => 0), label: '', backgroundColor: getDataColors(), borderColor: getDataColors(), borderWidth: 1 }
          let departamento:any = data[i].ubicacion
          let index = labels[departamento]
          
          sets.data[index - 1] = data[i].contador
          sets.label = data[i].nombre
          datasets.push(sets)
        }
        let barChartData1: ChartConfiguration<'bar'>['data'] = {
          labels: label,
          datasets: datasets
        }
        this.barChartData = barChartData1


      }
    )
  }


}