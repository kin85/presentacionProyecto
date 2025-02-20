import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BbddService } from '../../services/BBDD.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-seccion-selects',
  imports: [CommonModule, FormsModule, RouterLink  ],
  templateUrl: './seccion-selects.component.html',
  styleUrl: './seccion-selects.component.css'
})
export class SeccionSelectsComponent implements OnInit {


  sector: any[] = [];
  nivel: number = 1;
  modulos: any[] = [];
  unidadesCompetencia: any[] = [];
  cuestionarios: any[] = [];

  sectorSeleccionado: number | null = null;
  moduloSeleccionado: number | null = null;
  UCSeleccionada: number | null = null;
  cuestionarioSeleccionado: number | null = null;
  modulosSector: any[] = [];
  unidadesCompetenciaSector: any[] = [];

  @Input() idUsuario: number | null = null; 

  ngOnInit() {
    this.cargarDatos();
  }

    constructor(private bbddService: BbddService) {
    }

  cargarDatos(): void {
    this.bbddService.getAllSectores().subscribe(
      (sectores) => {
        this.sector = sectores.content;
        
      },
      (error) => {
        console.error('Error al obtener los sectores:', error);
      }
    );

    this.bbddService.getAllModulos().subscribe(
      (modulos) => {
        this.modulos = modulos.content;
      },
      (error) => {
        console.error('Error al obtener los modulos:', error);
      }
    );

    this.bbddService.getAllUnidadesCompetencia().subscribe(
      (uc) => {        
        this.unidadesCompetencia = uc.content;
      },
      (error) => {
        console.error('Error al obtener las unidades de competencia:', error);
      }
    );

    this.bbddService.getAllCuestionarios().subscribe(
      (cuestionarios) => {
        this.cuestionarios = cuestionarios.content;
      },
      (error) => {
        console.error('Error al obtener las unidades de competencia:', error);
      }
    );
  }

  asignarCuestionario(){
    this.cuestionarioSeleccionado = null;
    this.cuestionarios.forEach(cuestionario => {
      if (this.UCSeleccionada && cuestionario.unidad_competencia_id == this.UCSeleccionada) {
        this.cuestionarioSeleccionado = cuestionario.id;
      }
    });
  }
}
