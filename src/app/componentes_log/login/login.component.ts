import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ServiceLogService } from '../service/service-log.service';

@Component({
  selector: 'app-login',
  imports: [RouterLink, FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  email: string = '';
  password: string = '';
  loading: boolean = false;
  errorMessage: string = '';
  formSubmitted: boolean = false;

  constructor(private serviceLog:ServiceLogService, private router:Router){ }


  sendLogin() {

    this.formSubmitted = true;

    //Crea objeto con email y password que es lo que nos pide pasarle al endpoint
    const credentials = {
      email: this.email,
      password: this.password
    };

    this.loading = true;
    this.errorMessage = '';

    
    this.serviceLog.userLogin(credentials).subscribe({
      next: () => {
        
        this.loading = false;

        const roles = this.serviceLog.getUserRoles();
        //Si entre los rols del usuario se encuentra el rol de administrador 
        //el usuario no visualizara el inicio normal sino el de el administrador
        console.log(roles)
        if (roles.includes("ADMINISTRADOR")) {
          this.router.navigate(['/home']); 
        }else{
          this.router.navigate(['/inicio']); 
        }

        
      },
      error: (err) => {
        this.loading = false;
    
        if (err.error && err.error.message) {
          this.errorMessage = err.error.message; 
        } else {
          this.errorMessage = 'Email o contraseña incorrectos'; 
        }
    
        console.log('Error recibido del servidor:', err);
      }
    });
  }
}
