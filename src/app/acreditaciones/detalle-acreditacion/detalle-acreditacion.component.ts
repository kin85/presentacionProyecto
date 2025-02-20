import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { MensajeResponse } from './mensajes-response.model';
import { AcreditacionesService } from '../../services/acreditaciones.service';
import { DocumentoListComponent } from '../../documentos/documento-list/documento-list.component';

@Component({
  selector: 'app-detalle-acreditacion',
  imports: [CommonModule, ReactiveFormsModule, RouterModule, DocumentoListComponent
  ],
  templateUrl: './detalle-acreditacion.component.html',
  styleUrl: './detalle-acreditacion.component.css',
})
export class DetalleAcreditacionComponent {
  @Input('id') idAcreditacion?: string;
  mensajeForm: FormGroup;
  mensajesArray: any[] = [];
  modulosArray: any[] = [];
  acreditacionesArray: any[] = [];
  usuariosArray: any[] = [];

  constructor(
    private acreditacionesService: AcreditacionesService,
    private formBuilder: FormBuilder
  ) {
    this.mensajeForm = this.formBuilder.group({
      contenidoMensaje: ['', [Validators.required]],
    });
  }

  ngOnInit() {
    this.acreditacionesService.getModulos().subscribe((modulos) => {
      this.modulosArray = modulos.content;
    });

    this.acreditacionesService.getUsuarios().subscribe((usuarios) => {
      this.usuariosArray = usuarios.content;
    });

    this.acreditacionesService.getAcreditaciones().subscribe((acreditaciones) => {
      this.acreditacionesArray = acreditaciones.content;
    });

    this.acreditacionesService.getMensajes().subscribe((mensajes) => {
      this.mensajesArray = mensajes.content;
    });
  }

  enviarMensaje(idUsuario: string) {
    const nuevoMensaje = {
      contenido: this.mensajeForm.get('contenidoMensaje')?.value,
      usuario_id: Number(idUsuario),
      acreditacion_id: Number(this.idAcreditacion),
    };

    this.acreditacionesService.crearMensaje(nuevoMensaje).subscribe(
      (response: MensajeResponse) => {
        console.log('Mensaje enviado con éxito:', response);

        // Crear un nuevo objeto de mensaje local
        const nuevoMensajeLocal = {
          idMensaje: response.id,  // Usar el ID devuelto por la API
          contenido: nuevoMensaje.contenido,
          usuario_id: nuevoMensaje.usuario_id,
          acreditacion_id: nuevoMensaje.acreditacion_id,
        };

        // Actualizar el array de mensajes creando un nuevo array (cambio de referencia)
        this.mensajesArray = [...this.mensajesArray, nuevoMensajeLocal];

        // Limpiar el formulario después de enviar el mensaje
        this.mensajeForm.reset();
      },
      (error) => {
        console.error('Error al enviar el mensaje:', error);
      }
    );
  }

  construirObjetoAcreditacion() {
    if (!this.idAcreditacion) {
      throw new Error('idAcreditacion no puede ser undefined');
    }

    const acreditacion = this.acreditacionesArray.find(
      (acred) => acred.id === Number(this.idAcreditacion)
    );
    if (!acreditacion) {
      return null; // Retornar null si la acreditación no se encuentra
    }

    const modulo = this.modulosArray.find(
      (mod) => mod.id === acreditacion.modulo_id
    );
    const usuario = this.usuariosArray.find(
      (usr) => usr.id === acreditacion.usuario_id
    );
    const asesor = this.usuariosArray.find(
      (usr) => usr.id === acreditacion.asesor_id
    );

    return {
      nombreModulo: modulo ? modulo.nombre : 'Modulo no encontrado',
      nombreUsuario: usuario ? usuario.nombre : 'Usuario no encontrado',
      nombreAsesor: asesor ? asesor.nombre : 'Asesor no encontrado',
    };
  }

  get acreditacionDetalle() {
    const detalle = this.construirObjetoAcreditacion();
    if (!detalle) {
      return {
        nombreModulo: 'Modulo no encontrado',
        nombreUsuario: 'Usuario no encontrado',
        nombreAsesor: 'Asesor no encontrado',
      };
    }
    return detalle;
  }
}