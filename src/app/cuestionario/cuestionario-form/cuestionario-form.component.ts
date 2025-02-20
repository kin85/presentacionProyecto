import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import {FormArray,FormBuilder,FormControl,FormGroup,ReactiveFormsModule,Validators} from '@angular/forms';
import { BbddService } from '../../services/BBDD.service';

@Component({
  selector: 'app-cuestionario-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './cuestionario-form.component.html',
  styleUrls: ['./cuestionario-form.component.css']
})
export class CuestionarioFormComponent implements OnInit {
  preguntas: any[] = [];
  cuestionarioForm: FormGroup;

  constructor(private bbddService: BbddService,private formBuilder: FormBuilder) {
    this.cuestionarioForm = this.formBuilder.group({
      nombre: ['', [Validators.required]],
      telefono: ['', [Validators.required]],
      respuestas: this.formBuilder.array([])
    });
  }

  ngOnInit(): void {
    this.loadPreguntas();
    
  }

  loadPreguntas(): void {
    const cuestionarioId = 1; 
    this.bbddService.getCuestionarioById(cuestionarioId).subscribe(
      (preguntas) => {
        this.preguntas = preguntas;
        console.log(preguntas);
        
        this.initializeRespuestas();
      },
      (error) => {
        console.error('Error al obtener las preguntas:', error);
      }
    );
  }

  initializeRespuestas() {
    const respuestasArray = this.preguntas.map(() => new FormControl('')); // Inicializamos FormControls vacíos
    this.cuestionarioForm = this.formBuilder.group({
      respuestas: this.formBuilder.array(respuestasArray)
    });
  }
  
  get respuestas(): FormArray {
    return this.cuestionarioForm.get('respuestas') as FormArray;
  }
  
  onSubmit(): void {
  
    console.log("Enviando respuestas...");
  
    const respuestas = this.cuestionarioForm.value.respuestas;
    const usuarioId = 1;  // Suponiendo que el usuario está logueado o tiene un ID de alguna fuente
  
    // Preparamos las respuestas a enviar, asegurándonos de que no haya respuestas vacías
    const respuestasAEnviar = this.preguntas.map((pregunta, index) => {
      return {
        respuesta: respuestas[index] || 'no respondida',  // Aseguramos que cada respuesta tenga un valor
        preguntaId: pregunta.id,
        usuarioId: usuarioId  // Puede ser null si no tienes un usuario logueado
      };
    });
  
    // Llamamos al servicio para enviar las respuestas
    this.bbddService.enviarRespuestas(respuestasAEnviar).subscribe(
      (response) => {
        console.log('Respuestas enviadas correctamente', response);
        // Aquí podrías mostrar un mensaje al usuario indicando que las respuestas fueron enviadas
      },
      (error) => {
        console.error('Error al enviar las respuestas:', error);
        // Aquí podrías mostrar un mensaje de error al usuario
      }
    );
  }

  
  get strTelefonoValid() {
    if (this.cuestionarioForm.get('telefono')?.untouched) {
      return ''
    } else if(this.cuestionarioForm.get('telefono')?.touched && this.cuestionarioForm.get('telefono')?.valid){
      return 'is-valid'
    } else {
      return 'is-invalid'
    }
  }

  
}

