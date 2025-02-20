import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { ServiceLogService } from '../componentes_log/service/service-log.service';
import Swal from 'sweetalert2';

export const authInterceptorInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router); // Inyeccion de Router para poder redirigir a inicio
  const service = inject(ServiceLogService); //Inyeccion del servicio

  //Cuando el interceptor detecte un error 403 o tocken invalido borra localstorage, redirige a login 
  // y actualiza los subjects para que sepan que no esta lgeado i no tiene rol
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 403 || error.error.message == "Token inválido o sesión no encontrada") {
        Swal.fire({
              title: "Se ha cerrado tu sesion.",
              text: "Vuelve a logearte!",
              icon: "warning",
              confirmButtonColor: "#dc3545",
              confirmButtonText: "ok"
            }).then((result) => {
              if (result.isConfirmed) {
                console.log("Sesión inválida o usuario desactivado, cerrando sesión...");
                localStorage.removeItem('auth_token');
                localStorage.removeItem('user_roles');
                service.updateLoginStatus();
                service.updateUserRoles();
                router.navigate(['/login']);
                
              }
            });
        
      }
      return throwError(() => error);
    })
  );
};
