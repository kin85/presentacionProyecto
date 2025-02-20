import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IFiltroAgroupacion } from '../estadisticas/filtros/ifiltroygroup';
import { Estadisticas } from '../estadisticas/grafica/Estadisticas';

@Injectable({
	providedIn: 'root'
})
export class EnviarFitrosService {

	private filtroSource = new BehaviorSubject<object | null>(null);

	filtros$ = this.filtroSource.asObservable();

	actualizarFiltros(bodyFiltros: object) {
		this.filtroSource.next(bodyFiltros);
	}

	private statsStource = new BehaviorSubject<Estadisticas | null>(null);

	stats$ = this.statsStource;

	private graphTypeSource = new BehaviorSubject<string>('pie'); 
	graphType$ = this.graphTypeSource.asObservable();

	actualizarGraphType(tipo: string) {		
		this.graphTypeSource.next(tipo); 
	}


}
