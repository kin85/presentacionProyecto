import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, from, map, Observable, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { Documento } from '../documentos/documento';

@Injectable({
  providedIn: 'root',
})
export class DocumentosService {
  private apiUrl = environment.apiUrl; 

  constructor(private readonly http: HttpClient) {}

  convertirArchivoABase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      
      reader.onload = () => resolve(reader.result?.toString().split(',')[1] || ''); // Eliminamos el prefijo 'data:application/pdf;base64,'
      reader.onerror = error => reject(error);
    });
  }

  subirDocumento(documento: any, file: File) {
    return this.convertirArchivoABase64(file).then(base64 => {
      // const documentoFinal = {
      //   ...documento,
      //   base64Documento: base64,
      //   contentTypeDocumento: file.type,
      //   extensionDocumento: file.name.split('.').pop()
      // };
      const documentoFinal = {
        ...documento,
        base64Documento: base64,
        contentTypeDocumento: file.type,
        extensionDocumento: file.name.split('.').pop()
      };
      
      console.log('Datos que se envían:', documentoFinal);
      return this.http.post<any>(this.apiUrl+"/documentos", documentoFinal);
    });
  }

  getDocumentos(): Observable<any> {
    return this.http.get<any>(
      `${this.apiUrl}/documentos?filters=page=0&size=1000&sort=id`
    );
  }

  searchDocumentos(query: string): Observable<Documento[]> {
    return from(
      this.http.get<any>(
        `${this.apiUrl}/documentos?filter=id_usuario:IGUAL:${query}&page=0&size=100&sort=id`
      )
    ).pipe(
      map((data) => {
        return data.content || [];
      }),
      catchError((error) => throwError(() => error))
    );
  }

  deleteDocumento(documentoID: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/documentos/${documentoID}`);
  }
}
