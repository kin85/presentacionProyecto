import { Component } from '@angular/core';
import { BbddService } from '../../services/BBDD.service';
import { DatosUsuarioComponent } from '../datos-usuario/datos-usuario.component';
import { TablaAcreditacionesComponent } from '../tabla-acreditaciones/tabla-acreditaciones.component';
import { MensajesComponent } from "../mensajes/mensajes.component";
import { SeccionSelectsComponent } from '../seccion-selects/seccion-selects.component';



@Component({
  selector: 'app-perfil-usuario',
  imports: [DatosUsuarioComponent, TablaAcreditacionesComponent, MensajesComponent, SeccionSelectsComponent],
  templateUrl: './perfil-usuario.component.html',
  styleUrl: './perfil-usuario.component.css'
})
export class PerfilUsuarioComponent {
  usuario: any = null;
  loading: boolean = true; 
  error: string = ''; 

  constructor(private bbddService: BbddService) { }

  ngOnInit(): void {
    this.cargarUsuario();
  }  

  cargarUsuario(): void {
    const usuarioId = 1; 
    this.bbddService.getUsuario(usuarioId).subscribe(
      (usuario) => {
        this.usuario = usuario;
        console.log(usuario.nombre);
        
      },
      (error) => {
        console.error('Error al obtener las preguntas:', error);
      }
    );
  }

}
