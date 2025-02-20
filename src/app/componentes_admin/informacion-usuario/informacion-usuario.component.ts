import { Component, Input, OnInit } from '@angular/core';
import { ServiceAdminService } from '../service/service-admin.service';
import { RecipeUser } from '../../interface/recipe-user';
import { RouterLink } from '@angular/router';
import { ActividadUsuarioComponent } from "../actividad-usuario/actividad-usuario.component";
import { CommonModule } from '@angular/common';
import { InfoRoles } from '../../interface/info-roles';

@Component({
  selector: 'app-informacion-usuario',
  imports: [RouterLink, ActividadUsuarioComponent, CommonModule],
  templateUrl: './informacion-usuario.component.html',
  styleUrl: './informacion-usuario.component.css'
})
export class InformacionUsuarioComponent implements OnInit{

  @Input('id') IdUser?: string;
  public user: RecipeUser | undefined;
  public rols: InfoRoles[] = [];

  constructor(private adminService:ServiceAdminService) { }

  ngOnInit(): void {
    console.log("Este es el id del usuario a visualizar: ", this.IdUser);
    this.getUser();
    this.getRoles();
    
  }


  getUser(){
    this.adminService.getUser(this.IdUser).subscribe({
      next: user => {
        this.user = user;
        console.log(user);
      },
      error: err => console.log(err)
    })
  }

  getRoles(){

    this.adminService.getRolsUser().subscribe({
      next: getRols => {
        this.rols = getRols;
        console.log(this.rols);
      },
      error: err => {
        console.error(err);
      }

    })

  }




}
