import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, from, map, Observable, Subject, throwError } from 'rxjs';
import { RecipeUser } from '../../interface/recipe-user';
import { ModifUser } from '../../interface/modif-user';
import { InfoRoles } from '../../interface/info-roles';
import { ActividadUsuario } from '../../interface/ActividadUsuario';

@Injectable({
  providedIn: 'root'
})
export class ServiceAdminService {
  private apiUrl = environment.apiUrl;
  private authUrl = environment.authUrl;
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  };

  private userDeletedSubject = new Subject<string>();

  constructor(private http: HttpClient, private router: Router) { }

  //Metodo para retornar todos los usuarios
  getUsers(page: number = 0, size: number = 5): Observable<{users:RecipeUser[], totalPages: number}> {
    return this.http.get<any>(`${this.apiUrl}/usuarios?page=${page}&size=${size}`).pipe(
      map(response => ({
        users: response.content,
        totalPages: response.totalPages
      }))
    )
  }

  //Metodo para ver si el usuario logeado en este momento de que tipo es
  getRolUser(): string | null{
    return localStorage.getItem('user_roles')
  }

  //Metodo para retornar la informacion de un usuario
  getUser(id:string | undefined): Observable<RecipeUser | undefined> {

    return this.http.get<any>(`${this.apiUrl}/v1/usuarios/${id}`);

  }

  //Metodo para borrar usuario
  deleteUser(id:string | undefined): Observable<any>{
    return this.http.delete(`${this.apiUrl}/v1/usuarios/${id}`);
  }

  notifyUserDeleted(id: string) {
    this.userDeletedSubject.next(id); 
  }

  onUserDeleted(): Observable<string> {
    return this.userDeletedSubject.asObservable(); 
  }

  //Metodo para modificar usuarios
  updateUser(user: ModifUser, id: string): Observable<RecipeUser> {
    return this.http.put<RecipeUser>(`${this.apiUrl}/v1/usuarios/${id}`, user, this.httpOptions).pipe(
    
          // catchError((error: HttpErrorResponse) => {
          //   let errorMessage = 'Ocurrió un error insesperado.';
          //   if(error.status === 400) {
          //     errorMessage = "Email / Nickname en uso. Prueba con otro.";
          //   }else if (error.status === 500){
          //     errorMessage = "Error en el servidor. Intentelo mas tarde";
          //   }
    
          //   return throwError(() => errorMessage);
          // })
        );
  }

  //Metodo que retorna todos los rols àctivos
  getRolsUser(): Observable<InfoRoles[]>{
    return this.http.get<InfoRoles[]>(`${this.apiUrl}/v1/roles`).pipe(
      catchError((error:HttpErrorResponse) => {
        return throwError(() => 'Ocurrio un error inesperado.')
      })
    )
  }
  //Metodo que retorna todos los roles y usuarios assignados a el
  getRolUsers(nombreRol:string ): Observable<InfoRoles[]>{
    return this.http.get<InfoRoles[]>(`${this.apiUrl}/v1/roles/${nombreRol}/usuarios`);
  }
  
  //Metodo que retorna todos los usuarios que empiezan por el texto proporcionado
  getUsersStartsWith(text:string ): Observable<InfoRoles[]>{
    return this.http.get<InfoRoles[]>(`${this.apiUrl}/v1/usuarios?filter=nickname:EMPIEZA:${text}&sort=id&page=0&size=10`);
  }


  //Metodo que retorna todas las lineas de la tabla cuentas_bloqueadas
  getUsersBlock(): Observable<any[]>{
    return this.http.get<any[]>(`${this.authUrl}/bloqueadas`).pipe(
      catchError(() => {
        return throwError(() => 'Ocurrio un error inesperado.')
      })
    )
  }

  //Metodo para desbloquear una cuenta
  desbloquearCuenta(id:number){
    return this.http.post(`${this.authUrl}/desbloquear/${id}`, this.httpOptions).pipe(
      catchError(() => {
        return throwError(() => 'Ocurrio un error inesperado.')
      })
    )
  }


  //Metodo para extraer las actividades de un usuario
  getActividadUser(id: number): Observable<ActividadUsuario[]> {
    return this.http.get<ActividadUsuario[]>(`${this.apiUrl}/v1/auditorias/usuario/${id}`).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Error al obtener las actividades del usuario:', error);
        return throwError(() => new Error('Error al obtener la actividad del usuario. Intente nuevamente.'));
      })
    );
  }

  //Metodo que retorna un listado de los usuarios que estan en activo
  getActiveUsers():Observable<any[]>{
    return this.http.get<any[]>(`${this.authUrl}/sesiones-activas`,this.httpOptions).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Error al obtener los usuarios activos:', error);
        return throwError(() => new Error('Error al obtener los usuarios activos. Intente nuevamente.'));
      })
    );
  }

  //Metodo para desactivar cualquier sesion que este activa si eres el administrador
  desactivarCuenta(id:string){
    return this.http.delete(`${this.authUrl}/logout/${id}`).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Error al desactivar usuario:', error);
        return throwError(() => new Error('Error al desactivar usuario. Intente nuevamente.'));
      })
    );
  }
}
