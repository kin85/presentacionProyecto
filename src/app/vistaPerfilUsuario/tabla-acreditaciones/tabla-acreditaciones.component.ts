import { Component, Input } from '@angular/core';
import { BbddService } from '../../services/BBDD.service';
import { CommonModule } from '@angular/common';
import { AcreditacionesService } from '../../services/acreditaciones.service';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { Observable } from 'rxjs';
import { FiltroResponse } from '../../acreditaciones/list-acreditaciones/modulos-response.model';

@Component({
  selector: 'app-tabla-acreditaciones',
  imports: [CommonModule, RouterModule, RouterLink],
  templateUrl: './tabla-acreditaciones.component.html',
  styleUrls: ['./tabla-acreditaciones.component.css']
})
export class TablaAcreditacionesComponent {
  @Input() usuario: any;

  acreditacionesBBDD: FiltroResponse | null = null;
  modulos: FiltroResponse | null = null;
  asesores: FiltroResponse | null = null;
  usuario_id: number = 2; // Cambiar por el usuario que tenga la sesión iniciada
  currentPage: number = 0;
  totalPages: number = 1;
  pages: number[] = [];

  constructor(private acreditacionesService: AcreditacionesService) {}

  ngOnInit() {
    this.pages = Array.from({ length: this.totalPages }, (_, i) => i);
    this.loadAcreditaciones();

    this.acreditacionesService.getModulos().subscribe(modulos => {
      this.modulos = modulos;
    });

    this.acreditacionesService.getUsuarios().subscribe(usuarios => {
      this.asesores = usuarios;
    });
  }

  loadAcreditaciones (page: number = 0) {
    this.acreditacionesService.getAcreditacionesFiltrado(this.usuario_id, page, 5).subscribe(acreditaciones => {
      console.log("AQUUi : " + acreditaciones.content.map(acreditacion => acreditacion.usuario_id));
    });

    this.acreditacionesService.getAcreditacionesFiltrado(this.usuario_id, page, 5).subscribe(acreditaciones => {
      this.acreditacionesBBDD = acreditaciones;
      this.totalPages = acreditaciones.totalPages;

      if (acreditaciones?.content) {
        acreditaciones.content.forEach(acreditacion => {
          acreditacion.claseEstado = acreditacion.estado.toLowerCase();
        });
      } else {
        console.log("Error: La API no devolvió datos en el formato esperado.");
      }
    }, error => {
      console.error("Error al obtener acreditaciones:", error);
    });
  }

  cambiarPagina(page: number) {
    if (page >= 0 && page < this.totalPages) {
      this.currentPage = page;
      this.loadAcreditaciones(page);
    }
  }

  getDataObservable<T>(endpoint: string, params?: any): Observable<T> {
    return this.acreditacionesService.getDataObservable<T>(endpoint, params);
  }

}