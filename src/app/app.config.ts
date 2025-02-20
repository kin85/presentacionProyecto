import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';

import {
  provideRouter,
  withComponentInputBinding,
  withHashLocation,
} from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './interceptor/auth.interceptor';
import { authInterceptorInterceptor } from './interceptor/auth-interceptor.interceptor';


export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withHashLocation(), withComponentInputBinding()),
    //Declaracion del interceptor para que por cada llamada introduzca token si existe
    //Tambien interceptor de errores para que se se desactiva un usuario desde el admin se pueda detectar en otros usuarios asi redirigir al menu de inicio
    provideHttpClient(withInterceptors([authInterceptor, authInterceptorInterceptor])),
    
  ],
  
};
