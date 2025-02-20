import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { IPregunta } from '../componentes_calidad/ipregunta';
import { IChat } from '../componentes_calidad/ichat';
import { EnviarFitrosService } from '../componentes_calidad/chat/enviar-fitros.service';
import { IFiltroAgroupacion } from '../componentes_calidad/estadisticas/filtros/ifiltroygroup';
import { Estadisticas } from '../componentes_calidad/estadisticas/grafica/Estadisticas';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
 
  private baseUrl = 'http://localhost:8091/api/rag/v1/';

  constructor(private http: HttpClient, private  enviarFiltrosService :EnviarFitrosService) {}

  
  // Chats
  getChats(): Observable<any> {
    return this.http.get(`${this.baseUrl}returnChats`);
  }

  createChat(body: object): Observable<any> {
    return this.http.post(`${this.baseUrl}createChat`, body);
  }

  updateChat(body: object): Observable<any> {
    return this.http.put(`${this.baseUrl}createQuestionChat`, body);
  }

  deleteChat(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}deleteChat?idChat=${id}`);
  }


  //  Preguntas
  returnPreguntasByIdChat(idChat: number): Observable<any> {
    return this.http.get(`${this.baseUrl}returnPreguntasByIdChat?idChat=${idChat}`);
  }

  createQuestionChat(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}createQuestionChat`, data);
  }

  answerQuestionChat(id: number, user: string): Observable<any> {
    return this.http.get(`${this.baseUrl}answerQuestionChat?idQuestionchat=${id}&user=${user}`);
  }

  updateQuestion(idPregunta: number | null, pregunta: object): Observable<any> {
    console.log("update:",idPregunta,pregunta);
        
    return this.http.put(`${this.baseUrl}updatePregunta/${idPregunta}`, pregunta);
  }

  // Filtros Qualitat
  getListUsuarios(): Observable<string[]> {
    return this.http.get<string[]>(`${this.baseUrl}getListUsuarios`);
  }

  filterChats(bodyFilter: object | null): Observable<any> {
    return this.http.post<string[]>(`${this.baseUrl}filter`, bodyFilter);
  }

  getListChunks() {
	  return this.http.get<string[]>(`${this.baseUrl}getListChunks`)
  } 

  //Estadisticas Qualitat
  getStats(datos : IFiltroAgroupacion):Observable<any>{
    return this.http.post<Estadisticas>(`${this.baseUrl}estadisticas`+datos.agrupacion + datos.historico, datos.filtros)
    .pipe(
      tap(
        page => {
         this.enviarFiltrosService.stats$.next(page)
        }
      )
    );
  }

}
