import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ServiceLogService } from '../../componentes_log/service/service-log.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crear-usuario',
  imports: [ReactiveFormsModule],
  templateUrl: './crear-usuario.component.html',
  styleUrl: './crear-usuario.component.css'
})
export class CrearUsuarioComponent implements OnInit {
    formCreateUser!: FormGroup;
    formSubmitted: boolean = false;
    messageError: string = '';
    messageSuccess: string = '';
  
    constructor(private formBuilder: FormBuilder, private serviceLog: ServiceLogService, private router: Router) {}
  
    ngOnInit(): void {
      this.formCreateUser = this.formBuilder.group({
        nickname: ['', Validators.required],
        nombre: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: [
          '',
          [
            Validators.required,
            Validators.pattern('^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$')
          ]
        ],
        telefono: ['', [Validators.required, Validators.pattern('^[0-9]{9}$')]]
      });
    }
  
    newUser() {
      this.formSubmitted = true; // Indica que el usuario intentó enviar el formulario
  
      if (this.formCreateUser.invalid) {
        this.formCreateUser.markAllAsTouched(); // Muestra los errores en todos los campos
        return;
      }
  
      // Si es válido, envía los datos al servicio
      this.serviceLog.userRegistro(this.formCreateUser.value).subscribe({
        next: () => {
          console.log('Usuario creado con éxito.');
          this.messageSuccess = 'Usuario creado con éxito.';
          this.messageError = '';
        },
        error: (err) => {
          if (err.error && err.error.message) {
            this.messageError = err.error.message;
          } else {
            this.messageError = 'Error desconocido. Inténtalo de nuevo.';
          } // Limpiar mensaje de éxito
        },
        complete: () => {
          this.formCreateUser.reset(); // Limpiar formulario
          this.formSubmitted = false; // Reiniciar estado del formulario
        }
      });
    }
  }
  