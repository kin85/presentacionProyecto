import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { BbddService } from '../../services/BBDD.service';
import { PopUpFinalizarCuestionarioComponent } from "../pop-up-finalizar-cuestionario/pop-up-finalizar-cuestionario.component";
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-cuestionario1',
  templateUrl: './cuestionario1.component.html',
  styleUrls: ['./cuestionario1.component.css'],
  imports: [ReactiveFormsModule, PopUpFinalizarCuestionarioComponent, CommonModule, RouterModule ]
})

export class Cuestionario1Component implements OnInit {
  @Input('idCuestionario') idCuestionario?: number;
  @Input('idUsuario') idUsuario?: number;
  preguntas: any[] = [];
  formulario: FormGroup;
  preguntaActual = 0;
  respuestas: any[] = [];
  animacion: string = 'entrada';
  respuestaSeleccionada: string | null = null;
  puedeAcreditar: boolean = false;
  finalizado: boolean = false;
  popUpData: any;

  constructor(private fb: FormBuilder, private bbddService: BbddService) {
    this.formulario = this.fb.group({ respuesta: [''] });
  }

  ngOnInit() {    
    this.cargarPreguntas();
  }

  cargarPreguntas(): void {
    if (this.idCuestionario === undefined) {
      console.error('Error: idCuestionario es undefined');
      return;
    }
    this.bbddService.getCuestionarioById(this.idCuestionario).subscribe(
      (preguntas) => {
        this.preguntas = preguntas.sort((a, b) => a.orden - b.orden);
        this.inicializarRespuestas();
      },
      (error) => {
        console.error('Error al obtener las preguntas:', error);
      }
    );
  }

  inicializarRespuestas() {
    this.respuestas = this.preguntas.map(pregunta => ({
      preguntaId: pregunta.id,
      textoPregunta: pregunta.contenido,
      usuarioId: null,
      respuesta: 'ns_nc'
    }));
  }

  siguientePregunta() {
    const preguntaActualObj = this.preguntas[this.preguntaActual];
    
    if (preguntaActualObj) {
      const siguienteNo = preguntaActualObj.siguienteNoId;
      const siguienteSi = preguntaActualObj.siguienteSiId;
  
      this.animacion = 'salida';
      setTimeout(() => {
        let nuevaPreguntaId: number | undefined;
  
        if (this.respuestaSeleccionada === 'no' && siguienteNo) {
          nuevaPreguntaId = siguienteNo;
        } else if (this.respuestaSeleccionada === 'si' && siguienteSi) {
          nuevaPreguntaId = siguienteSi;
        } else {
          const siguientePregunta = this.preguntas[this.preguntaActual + 1];
          if (siguientePregunta) {
            nuevaPreguntaId = siguientePregunta.id;
          }
        }
        if (nuevaPreguntaId !== undefined) {
          this.preguntaActual = this.preguntas.findIndex(p => p.id === nuevaPreguntaId);
        }
        this.animacion = 'entrada';
        this.respuestaSeleccionada = null;
      }, 300);
    }
  }

  anteriorPregunta() {
    if (this.preguntaActual > 0) {
      this.animacion = 'salida';
      setTimeout(() => {
        this.preguntaActual--;
        this.animacion = 'entrada';
      }, 300);
    }
  }

  irAPregunta(index: number) {
    this.animacion = 'salida';

    setTimeout(() => {
      this.preguntaActual = index;
      this.animacion = 'entrada';
      this.formulario.reset();
    }, 300);
  }

  seleccionarRespuesta(respuesta: string) {
    const preguntaId = this.preguntas[this.preguntaActual].id;
    this.respuestas[this.preguntaActual] = { respuesta, preguntaId };
    this.respuestaSeleccionada = respuesta;
  }

  obtenerRespuestaSeleccionada(): string {
    const respuesta = this.respuestas[this.preguntaActual];
    return respuesta ? respuesta.respuesta : ''; 
  }

  finalizar() {
    
    if (this.preguntas[this.preguntaActual].finalSi && this.respuestaSeleccionada === 'si') {
      this.puedeAcreditar = true;
    }

    this.popUpData = {
      puedeAcreditar: this.puedeAcreditar, 
      mensaje: (this.respuestaSeleccionada === 'no') ? this.preguntas[this.preguntaActual]?.explicacionNo : this.preguntas[this.preguntaActual]?.explicacionSi,
      tipo: this.preguntas[this.preguntaActual].tipoId
    };

    const respuestasFinales = Object.keys(this.respuestas).map(key => ({
      respuesta: this.respuestas[parseInt(key)].respuesta,
      pregunta_id: this.preguntas[parseInt(key)].id,
      usuario_id: this.idUsuario,
    }));
    this.finalizado = true;

    this.bbddService.enviarRespuestas(respuestasFinales).subscribe(
      () => {
        console.log('Respuestas enviadas con éxito');
      },
      (error) => {
        console.error('Error al enviar las respuestas:', error);
      }
    );
  }
}
