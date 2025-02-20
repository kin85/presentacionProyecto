import { Component, OnInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import { Chart, ChartConfiguration, registerables } from 'chart.js';

@Component({
  selector: 'app-chart1',
  imports: [],
  templateUrl: './chart1.component.html',
  styleUrl: './chart1.component.css'
})
export class Chart1Component implements OnInit, OnDestroy {
  @ViewChild('chartCanvas', { static: true }) chartRef!: ElementRef;
  chart!: Chart;

  constructor() {
    // 🔴 Registra los módulos necesarios para evitar el error
    Chart.register(...registerables);
  }

  ngOnInit(): void {
    this.createChart();
  }

  createChart(): void {
    if (this.chart) {
      this.chart.destroy();
    }

    this.chart = new Chart(this.chartRef.nativeElement, {
      type: 'line',
      data: {
        labels: ['2022-05-10', '2022-05-11', '2022-05-12', '2022-05-13',
                 '2022-05-14', '2022-05-15', '2022-05-16', '2022-05-17'],
        datasets: [
          {
            label: "Ventas",
            data: [467, 576, 572, 79, 92, 574, 573, 576],
            borderColor: '#3498db',
            backgroundColor: 'rgba(52, 152, 219, 0.2)',
            tension: 0.4,
            borderWidth: 3,
            pointRadius: 5,
            pointBackgroundColor: '#2980b9',
          },
          {
            label: "Ganancias",
            data: [542, 542, 536, 327, 17, 0, 538, 541],
            borderColor: '#2ecc71',
            backgroundColor: 'rgba(46, 204, 113, 0.2)',
            tension: 0.4,
            borderWidth: 3,
            pointRadius: 5,
            pointBackgroundColor: '#27ae60',
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            type: 'category', 
            ticks: {
              color: '#333',
              font: {
                size: 12
              }
            }
          },
          y: {
            ticks: {
              color: '#333',
              font: {
                size: 12
              }
            },
            beginAtZero: true
          }
        }
      }
    });
  }

  ngOnDestroy(): void {
    if (this.chart) {
      this.chart.destroy();
    }
  }
}