import { Component, OnInit } from '@angular/core';
import { ChartConfiguration, ScatterDataPoint } from 'chart.js';

@Component({
  selector: 'app-scatter',
  templateUrl: './scatter.component.html',
  styleUrls: ['./scatter.component.css']
})
export class ScatterComponent implements OnInit {

  title = 'Venta de productos dutante las últimas cinco semanas';

  public scatterChartDatasets: ChartConfiguration<'scatter'>['data']['datasets'] = [
    {
      data: [
        { x: 1, y: 100 },
        { x: 2, y: 200 },
        { x: 3, y: 300 },
        { x: 4, y: 400 },
        { x: 5, y: 500},
      ],
      label: 'Venta de productos durante las últimas cinco semanas',
      pointRadius: 20,
    },
  ];

  public scatterChartOptions: ChartConfiguration<'scatter'>['options'] = {
    responsive: false,
  };

  constructor() { }

  ngOnInit(): void {
  }

}
