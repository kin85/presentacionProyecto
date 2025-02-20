import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { ServiceLogService } from '../../componentes_log/service/service-log.service';

export const supervisorguardGuard: CanActivateFn = (route, state) => {
 const router: Router = inject(Router);
   const authService: ServiceLogService = inject(ServiceLogService);
 
   // Obtenemos los roles del usuario
   const roles = authService.getUserRoles(); // Asegúrate de que este método existe en el servicio
 
   // Verificamos si el usuario tiene el rol de ADMINISTRADOR
   if (roles.includes("SUPERVISOR")) {
     return true;
   } else {
     return router.parseUrl('/inicio');
   }
 };