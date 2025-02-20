import { CommonModule } from '@angular/common';
import { Component, EventEmitter, HostListener, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../../service/service';
import { EnviarFitrosService } from '../enviar-fitros.service';

@Component({
  imports: [FormsModule, CommonModule],
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css']
})
export class FiltersComponent implements OnInit {

	showFilters = true;

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
	) {};

	ngOnInit() {
		this.iniciarListaNombres();
		this.iniciarListaIDChunks()
	}  

	iniciarListaIDChunks(){
		this.apiService.getListChunks().subscribe(
			list => this.chunks = list,
			error => console.error("Error al conseguir los chunks: ", error)
		)
	}

	iniciarListaNombres() {
		this.apiService.getListUsuarios().subscribe( 
			list => this.users = list,
			error => console.error("Error al conseguir los usuarios: ", error)
		);
	}

	@Output() filtersToggled = new EventEmitter<boolean>();
	toggleFilters() {
		this.showFilters = !this.showFilters;
		this.filtersToggled.emit(this.showFilters);
	}


	bodyFiltros: { [key: string]: any } = {};
	aplicarFiltros() {
		for (let [key,value] of Object.entries(this.filtros))
			if (value != "")
				this.bodyFiltros[key] = value;
		
		let stringFecha = `${this.fechaInicio != "" ? this.fechaInicio : "null"},${this.fechaFin != "" ? this.fechaFin : "null"}`;
		
		if (stringFecha != 'null,null')
			this.bodyFiltros['filterRango'] = stringFecha;

		console.log(this.bodyFiltros);
		

		this.enviarFiltrosService.actualizarFiltros(this.bodyFiltros);

		this.limpiarFiltros();
		this.bodyFiltros = {};
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
	  
		this.fechaInicio = '';
		this.fechaFin = '';
	}

}

