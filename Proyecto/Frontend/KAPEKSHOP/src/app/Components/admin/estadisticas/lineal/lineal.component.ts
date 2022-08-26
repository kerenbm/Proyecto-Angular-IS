import { Component, OnInit } from '@angular/core';
import { ChartConfiguration, ChartOptions, ChartType } from "chart.js";
import { getDataColors } from '../helpers';

@Component({
  selector: 'app-lineal',
  templateUrl: './lineal.component.html',
  styleUrls: ['./lineal.component.css']
})
export class LinealComponent implements OnInit {

  title = 'Venta de productos en lempiras durante los últimos meses';

  public lineChartData: ChartConfiguration<'line'>['data'] = {
    labels: [
      'Enero',
      'Febrero',
      'Marzo',
      'Abril',
      'Mayo',
      'Junio',
      'Julio'
    ],
    datasets: [
      {
        data: [ 500000, 25000, 35000, 70000, 1000000, 55543, 40000 ],
        label: 'Venta de productos en lempiras durante los últimos meses',
        fill: true,
        tension: 0.5,
        borderColor: getDataColors(),
        backgroundColor: getDataColors(20)
      }
    ]
  };
  public lineChartOptions: ChartOptions<'line'> = {
    responsive: false
  };
  public lineChartLegend = true;


  constructor() { }

  ngOnInit(): void {
  }

}
