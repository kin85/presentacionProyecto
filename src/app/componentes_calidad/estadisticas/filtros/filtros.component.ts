import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../../service/service';
import { EnviarFitrosService } from '../../chat/enviar-fitros.service';
import { IFiltroAgroupacion } from './ifiltroygroup';
import { Observable, tap } from 'rxjs';

@Component({
  selector: 'app-filtros',
  imports: [FormsModule, CommonModule],
  templateUrl: './filtros.component.html',
  styleUrl: './filtros.component.css'
})
export class FiltrosComponent {

  selectedGroup: string = "chat_user";
  graphSelected: string = "pie"
  typeGraph: Observable<string>
  apply: any;

  users: string[] = [];
  chunks: string[] = [];

  filtros = {
    filterUser: "",
    filterPregunta: "",
    filterRespuesta: "",
    filterChunk: "",
    filterValorado: "",
    filterFeedback: "",
  }

  fechaInicio: string = "";
  fechaFin: string = "";

  constructor(
    private apiService: ApiService,
    private enviarFiltrosService: EnviarFitrosService
  ) {
    this.typeGraph = this.enviarFiltrosService.graphType$
  };

  ngOnInit() {
    this.iniciarListaNombres();
    this.apply = document.getElementById("apply-filters");
    this.subGraphType()
    this.iniciarListaIDChunks()
    
  }

  subGraphType() {
    this.typeGraph.subscribe((tipo: string) => {
    });
  }

  iniciarListaIDChunks(){
		this.apiService.getListChunks().subscribe(
			list => this.chunks = list,
			error => console.error("Error al conseguir los chunks: ", error)
		)
	}

  cambiarTipoGrafico(nuevoTipo: string) {
    this.graphSelected = nuevoTipo;
    this.enviarFiltrosService.actualizarGraphType(nuevoTipo);
  }
  iniciarListaNombres() {
    this.apiService.getListUsuarios().subscribe(
      list => this.users = list,
      error => console.error("Error al conseguir los usuarios: ", error)
    );
  }


  bodyFiltros: { [key: string]: any } = {};
  aplicarEstadisticas() {

    for (let [key, value] of Object.entries(this.filtros))
      if (value != "")
        this.bodyFiltros[key] = value;

    let stringFecha = `${this.fechaInicio != "" ? this.fechaInicio : "null"},${this.fechaFin != "" ? this.fechaFin : "null"}`;

    if (stringFecha != 'null,null')
      this.bodyFiltros['filterRango'] = stringFecha;


    let agrupacion = ""
    if (this.selectedGroup != "") {
      agrupacion = "?groupBy=" + this.selectedGroup
    }
    let historico=""
    if (this.graphSelected == "line") {
      historico= "&historic=true"
    }else{
      historico="&historic=false"
    }

    let datos: IFiltroAgroupacion = {
      "filtros": this.bodyFiltros,
      "agrupacion": agrupacion,
      "historico": historico
    }


    this.cambiarTipoGrafico(this.graphSelected)

    this.apiService.getStats(datos).subscribe(data => console.log(data))
    this.limpiarFiltros()
    this.bodyFiltros = {}
  }

  limpiarFiltros() {
    this.filtros = {
      filterUser: '',
      filterPregunta: '',
      filterRespuesta: '',
      filterChunk: '',
      filterValorado: '',
      filterFeedback: ''
    };
    this.selectedGroup = 'chat_user';
    this.fechaInicio = '';
    this.fechaFin = '';
  }

}
