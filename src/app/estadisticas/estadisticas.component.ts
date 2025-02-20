import { Component, ElementRef, ViewChild, AfterViewInit, OnInit } from '@angular/core';
import { Chart, ChartConfiguration, BarController, CategoryScale, LinearScale, BarElement } from 'chart.js';
import { AcreditacionesService } from '../services/acreditaciones.service';

@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.component.html',
  styleUrls: ['./estadisticas.component.css']
})
export class EstadisticasComponent implements AfterViewInit, OnInit {

  totalAcreditaciones: number = 0;
  aceptadas: number = 0;
  denegadas: number = 0;
  pendientes: number = 0;

  porcentajeAceptadas: number = 0;
  porcentajeDenegadas: number = 0;
  porcentajePendientes: number = 0;
  
  @ViewChild('acreditacionesChart', { static: false }) chartRef!: ElementRef;
  chart: any;

  constructor(private acreditacionesService: AcreditacionesService) {}

  ngAfterViewInit() {
    this.generarGrafico();
  }

  ngOnInit() {
    this.obtenerAcreditaciones();
  }

  obtenerAcreditaciones() {
    const asesor_id = 1; //Cambiar el id por el asesor que tenga iniciada la sesion

    this.acreditacionesService.getAcreditacionesAsesorAceptadas(asesor_id).subscribe((response: any) => {
      console.log("✅ ACEPTADAS:", JSON.stringify(response, null, 2));
      this.aceptadas = response.totalElements || 0;
      this.actualizarTotales();
    });
    
    this.acreditacionesService.getAcreditacionesAsesorDenegadas(asesor_id).subscribe((response: any) => {
      console.log("❌ DENEGADAS:", JSON.stringify(response, null, 2));
      this.denegadas = response.totalElements || 0;
      this.actualizarTotales();
    });
    
    this.acreditacionesService.getAcreditacionesAsesorPendientes(asesor_id).subscribe((response: any) => {
      console.log("⏳ PENDIENTES:", JSON.stringify(response, null, 2));
      this.pendientes = response.totalElements || 0;
      this.actualizarTotales();
    });
  }
  
  

  actualizarTotales() {
    this.totalAcreditaciones = this.aceptadas + this.denegadas + this.pendientes;
    this.calcularPorcentajes();
    this.actualizarGrafico();
  }

  calcularPorcentajes() {
    if (this.totalAcreditaciones > 0) {
      this.porcentajeAceptadas = parseFloat(((this.aceptadas / this.totalAcreditaciones) * 100).toFixed(2));
      this.porcentajeDenegadas = parseFloat(((this.denegadas / this.totalAcreditaciones) * 100).toFixed(2));
      this.porcentajePendientes = parseFloat(((this.pendientes / this.totalAcreditaciones) * 100).toFixed(2));
    }
  }

  actualizarGrafico() {
    if (this.chart) {
      this.chart.destroy();
    }
    this.generarGrafico();
  }

  generarGrafico() {
    Chart.register(BarController, CategoryScale, LinearScale, BarElement);

    const data = {
      labels: ["Aceptadas", "Denegadas", "Pendientes"],
      datasets: [
        {
          label: "Acreditaciones",
          data: [this.aceptadas, this.denegadas, this.pendientes],
          backgroundColor: ["#27ae60", "#e74c3c", "#f39c12"],
          borderColor: ["#1e8449", "#c0392b", "#d68910"],
          borderWidth: 2
        }
      ]
    };
  
    const config: ChartConfiguration = {
      type: 'bar',
      data: data,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true
          }
        },
        plugins: {
          legend: {
            display: true,
            position: 'top'
          }
        }
      }
    };

    this.chart = new Chart(this.chartRef.nativeElement, config);
  }
}
