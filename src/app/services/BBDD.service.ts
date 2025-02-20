import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment'; // Importa el archivo de environment

@Injectable({
  providedIn: 'root'
})
export class BbddService {
  
  private apiUrl = environment.apiUrl; // Usa la URL de la API desde environment

  constructor(private http: HttpClient) {}

  getDataObservable<T>(endpoint: string, params?: any): Observable<T[]> {
    return this.http.get<T[]>(`${this.apiUrl}/${endpoint}`, { params, headers: { 'Content-Type': 'application/json' } });
  }

  getCuestionarioById(id: number): Observable<any[]> {
    return this.getDataObservable<any[]>(`preguntas/cuestionario/${id}`);
  }

  enviarRespuestas(respuestas: any[]): Observable<any> {
    console.log('enviando:', respuestas);
    
    return this.http.post(`${this.apiUrl}/respuestas/cuestionario`, respuestas, { headers: { 'Content-Type': 'application/json' } });
  }

  getUsuario(id: number): Observable<any> {
    return this.getDataObservable<any>(`usuarios/id/${id}`);
  }

  getAcreditaciones(id: number): Observable<any> {
    return this.getDataObservable<any>(`acreditaciones/usuario/${id}`);
  }

  getAllSectores(): Observable<any> {
    return this.getDataObservable<any>(`sectores`);
  }
  getAllModulos(): Observable<any> {
    return this.getDataObservable<any>(`modulos`);
  }
  getAllUnidadesCompetencia(): Observable<any> {
    return this.getDataObservable<any>(`unidadCompetencia`);
  }
  getAllCuestionarios(): Observable<any> {
    return this.getDataObservable<any>(`cuestionarios`);
  }
}