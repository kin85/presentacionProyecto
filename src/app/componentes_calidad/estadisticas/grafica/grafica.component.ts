import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { EnviarFitrosService } from '../../chat/enviar-fitros.service';
import { Estadisticas } from './Estadisticas';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-grafica',
  templateUrl: './grafica.component.html',
  styleUrl: './grafica.component.css'
})
export class GraficaComponent implements OnInit {
  @ViewChild('chartCanvas', { static: true }) chartCanvas!: ElementRef<HTMLCanvasElement>; // Referencia al <canvas>
  public chart: any;
  public graphType: string = 'pie';

  constructor(private enviarFiltrosService: EnviarFitrosService) { }

  ngOnInit(): void {
    this.suscripcionStats();
    this.suscripcionGraficaType();

  }

  suscripcionGraficaType() {
    this.enviarFiltrosService.graphType$.subscribe((tipo: string) => {
      this.graphType = tipo;
      console.log("Tipo de gráfico:", tipo);
    });
  }

  suscripcionStats() {
    this.enviarFiltrosService.stats$.subscribe((objeto: Estadisticas | null) => {
      if (objeto != null) {
        let keys: any[] = [];
        let datos: any[] = [];

        console.log(objeto);
        

        Object.keys(objeto).forEach(key => {
          keys.push(key);
          datos.push(objeto[key]);
        });


        keys = datos.map(item => item[0]);
        let values = datos.map(item => item[1])



        if (this.chart) {
          this.chart.destroy();
        }


        switch (this.graphType) {
          case "pie":
            this.chart = new Chart(this.chartCanvas.nativeElement, {
              type: 'pie',
              data: {
                labels: keys,
                datasets: [{
                  label: 'Cantidad agrupada',
                  data: values,
                  backgroundColor: ['red', 'blue', 'yellow', 'green', 'purple', 'orange']
                }]
              },
              options: {
                responsive: true,
                maintainAspectRatio: false,
                aspectRatio: 0.45
              }
            });
            break;

          case "line":

            const labels = [...new Set(datos.map(item => item[0]))];
            console.log("(X):", labels);

            const tipos = [...new Set(datos.map(item => item[1]))];
            console.log("(Leyenda):", tipos);

            const datosAgrupados = new Map<string, (number | null)[]>();

            tipos.forEach(tipo => {
              datosAgrupados.set(tipo, new Array(labels.length).fill(null));
            });

            datos.forEach(([fecha, tipo, cantidad]) => {
              const index = labels.indexOf(fecha);
              if (index !== -1) {
                datosAgrupados.get(tipo)![index] = cantidad;
              }
            });

            console.log("Datos Agrupados:", datosAgrupados);

            const datasets = Array.from(datosAgrupados.entries()).map(([tipo, valores]) => ({
              label: tipo,
              data: valores,
              borderColor: this.getRandomColor(), 
              fill: false
            }));


            this.chart = new Chart(this.chartCanvas.nativeElement, {
              type: 'line',
              data: {
                labels: labels,
                datasets: datasets
              },
              options: {
                responsive: true,
                aspectRatio: 0.45,
                maintainAspectRatio: false,
                scales: {
                  y: {
                    beginAtZero: true
                  }
                }
              }
            });


            break;



          default:
            console.log("Error recibiendo el tipo de chart");
            this.graphType = "pie"
            break;
        }



      }
    });
  }

  getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
}