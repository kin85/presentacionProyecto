import { Routes } from '@angular/router';
import { AdminPanelComponent } from './componentes_calidad/chat/admin-panel/admin_panel.component';
import { EstadisticasPanelComponent } from './componentes_calidad/estadisticas/estadisticas-panel/estadisticas-panel.component';
import { LoginComponent } from './componentes_log/login/login.component';
import { RegistroComponent } from './componentes_log/registro/registro.component';
import { authGuard } from './componentes_log/guards/auth.guard';
import { ListadoUsuariosComponent } from './componentes_admin/listado-usuarios/listado-usuarios.component';
import { adminGuardsGuard } from './componentes_admin/guards/admin-guards.guard';
import { HomeComponent } from './componentes_admin/home/home.component';
import { CrearUsuarioComponent } from './componentes_admin/crear-usuario/crear-usuario.component';
import { InformacionUsuarioComponent } from './componentes_admin/informacion-usuario/informacion-usuario.component';

import { ModificarUserComponent } from './componentes_admin/modificar-user/modificar-user.component';
import { CuentasBlockComponent } from './componentes_admin/cuentas-block/cuentas-block.component';
import { ListaUsuariosActivosComponent } from './componentes_admin/lista-usuarios-activos/lista-usuarios-activos.component';
import { supervisorguardGuard } from './componentes_calidad/guard/supervisorguard.guard';

import { InicioComponent } from './cuestionario/inicio/inicio.component';
import { Cuestionario1Component } from './cuestionario/cuestionario1/cuestionario1.component';
import { PerfilUsuarioComponent } from './vistaPerfilUsuario/perfil-usuario/perfil-usuario.component';
import { DocumentoUserComponent } from './documentos/documento-user/documento-user.component';
import { AcreditacionesComponent } from './acreditaciones/list-acreditaciones/acreditaciones.component';
import { DetalleAcreditacionComponent } from './acreditaciones/detalle-acreditacion/detalle-acreditacion.component';
import { TablaAcreditacionesComponent } from './vistaPerfilUsuario/tabla-acreditaciones/tabla-acreditaciones.component';
import { EstadisticasComponent } from './estadisticas/estadisticas.component';
import { RegistroFakeComponent } from './registro-fake/registro-fake.component';

export const routes: Routes = [
    {path: 'inicio', component: InicioComponent},
    {path: 'cuestionario/:idCuestionario/:idUsuario', component: Cuestionario1Component },
    {path: 'registro', component: RegistroComponent},
    {path: 'documentosUser', component: DocumentoUserComponent},
    {path: 'perfil', component: PerfilUsuarioComponent},
    {path: 'tablaAcreditacion', component: TablaAcreditacionesComponent},
    {path: 'acreditaciones', component: AcreditacionesComponent},
    {path: 'detalle-acreditacion/:id', component: DetalleAcreditacionComponent},
    {path: 'estadisticas/:id', component: EstadisticasComponent},
    {path: 'login', component: LoginComponent},

    {path: '', pathMatch: 'full', redirectTo: 'inicio'}
];
