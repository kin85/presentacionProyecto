import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { FiltroResponse } from './modulos-response.model';
import { AcreditacionesService } from '../../services/acreditaciones.service';

@Component({
  selector: 'app-acreditaciones',
  imports: [CommonModule, RouterModule],
  templateUrl: './acreditaciones.component.html',
  styleUrl: './acreditaciones.component.css'
})
export class AcreditacionesComponent {

  mensajesArray: any[] = []; 
  modulosArray: any[] = []; 
  acreditacionesArray: any[] = []; 
  usuariosArray: any[] = []; 
  constructor(private acreditacionesService: AcreditacionesService) {}

  ngOnInit() {
    this.acreditacionesService.getModulos().subscribe(modulos => {
      this.modulosArray = modulos.content;
    });

    this.acreditacionesService.getUsuarios().subscribe(usuarios => {
      this.usuariosArray = usuarios.content;
    });

    this.acreditacionesService.getAcreditaciones().subscribe(acreditaciones => {
      this.acreditacionesArray = acreditaciones.content;
    });

    this.acreditacionesService.getMensajes().subscribe(mensajes => {
      this.mensajesArray =  mensajes.content;
      
    });
  }


  asignarAcreditacion(idAcreditacion: number, usuario_id: number, modulo_id: number) {
    const estadoActualizado = {
      id: idAcreditacion,
      estado: "pendiente",
      usuario_id: usuario_id,
      modulo_id: modulo_id,
      asesor_id: 1
    };
  
    this.acreditacionesService.updateEstadoAcreditacion(idAcreditacion, estadoActualizado).subscribe(response => {
      console.log('Actualización exitosa:', response);
      
      const index = this.acreditacionesArray.findIndex(a => a.id === idAcreditacion);
      if (index !== -1) {
        this.acreditacionesArray[index] = { ...this.acreditacionesArray[index], ...estadoActualizado };
      }
  
    }, error => {
      console.error('Error en la actualización:', error);
    });
  }

}