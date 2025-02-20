import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, tap, throwError } from 'rxjs';
import { RecipeUser } from '../../interface/recipe-user';
import { environment } from '../../../environments/environment.development';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ServiceLogService {

  private authUrl = environment.authUrl;
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  };

  //Subject para si el usuario esta logeado
  private isLoggedInSubject = new BehaviorSubject<boolean>(this.isLoggedIn());
  isLoggedIn$ = this.isLoggedInSubject.asObservable();

  //Subject para los rols del usuario
  private userRoleSubject = new BehaviorSubject<string[]>(this.getUserRoles());
  userRole$ = this.userRoleSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) { }

  //Metodo para registrar
  userRegistro(user: RecipeUser): Observable<RecipeUser> {
    return this.http.post<RecipeUser>(`${this.authUrl}/nuevo`,user, this.httpOptions).pipe(

      catchError((error: HttpErrorResponse) => {
        let errorMessage = 'Ocurrió un error insesperado.';
        if(error.status === 400) {
          errorMessage = "Email / Nickname en uso. Prueba con otro.";
        }else if (error.status === 500){
          errorMessage = "Error en el servidor. Intentelo mas tarde";
        }

        return throwError(() => error);
      })
    );
    
    
  }


  //Metodo para Logear un usuario
  userLogin(credentials: { email: string, password: string }): Observable<{ token: string }> {
    return this.http.post<{ token: string; authorities: { authority: string }[] }>(`${this.authUrl}/login`, JSON.stringify(credentials), this.httpOptions)
      .pipe(
        //Si la respuesta es correcta guarda el token en localstorage
        tap((response) => {
          if (response.token) {
            localStorage.setItem('auth_token', response.token);
            this.updateLoginStatus(); //Actualiza el estado del login
            console.log(response)

            // Extraer y guardar todos los roles del usuario
            if (response.authorities && response.authorities.length > 0) {
              const roles = response.authorities.map(auth => auth.authority); // Extrae roles en un array
              localStorage.setItem('user_roles', JSON.stringify(roles)); // Guarda los roles en localStorage
              this.updateUserRoles(); // Actualiza el estado de los roles
            }

            console.log('Roles del usuario:', response.authorities.map(auth => auth.authority));
            console.log('Token del usuario:', response.token);
          }
        }),
        catchError((error) => {
          console.error('Error en login:', error);
          return throwError(() => error);
        })
      )
  }

  //Metodo para ver si esta Logged 
  isLoggedIn(): boolean {
    const token = localStorage.getItem('auth_token');
    return token !== null && !this.isTokenExpired(token);
  }

  //Metodo para que borre de 
  //Metodo para comprobar si el tocken ha expirado
  isTokenExpired(token: string): boolean {
    //console.log(token);
    
    try {
      const payload = JSON.parse(atob(token.split('.')[1])); // Decodifica el token
      const expiration = payload.exp * 1000; // Convierte UNIX timestamp a milisegundos
  
      if (Date.now() > expiration) {
        // Token expirado, eliminar datos y redirigir
        localStorage.removeItem('auth_token');
        localStorage.removeItem('user_roles');
        this.updateLoginStatus();
        this.updateUserRoles();
        this.router.navigate(['/login']);
        return true;
      }
  
      return false; // Token aún válido
    } catch (e) {
      // En caso de error, también eliminar datos y redirigir
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user_roles');
      this.updateLoginStatus();
      this.updateUserRoles();
      this.router.navigate(['/login']);
      return true;
    }
  }
  

  //Metodo que actualida el estatus del logeo
  updateLoginStatus() {
    this.isLoggedInSubject.next(this.isLoggedIn());
  }

  //Metodo que actualida el estatus del rol
  updateUserRoles() {
    this.userRoleSubject.next(this.getUserRoles());
  }

  // Método para cerrar sesión
  logout() {

    this.http.post(`${this.authUrl}/logout`, {}, this.httpOptions).subscribe({
      next: () => {

        this.router.navigate(['/inicio'])
        localStorage.removeItem('auth_token');
        localStorage.removeItem('user_roles');
        this.updateLoginStatus();
        this.updateUserRoles();

        

      },
      error: (err) => {
        console.error('Error al cerrar la sesion: ', err);
      }
    })
  }

  // Método para obtener los roles del usuario actual
  getUserRoles(): string[] {
    const roles = localStorage.getItem('user_roles');
    //Comprueba si esta login para que compruebe si el tocken a expirado 
    // o no i el guard pueda echar al usuario en ese caso
    this.isLoggedIn();
    return roles ? JSON.parse(roles) : [];
  }

  // Método para verificar si el usuario tiene un rol específico
  hasRole(role: string): boolean {
    return this.getUserRoles().includes(role);
  }


}

