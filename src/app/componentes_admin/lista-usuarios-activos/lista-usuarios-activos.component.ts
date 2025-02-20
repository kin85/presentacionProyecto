import { Component, OnInit } from '@angular/core';
import { ServiceAdminService } from '../service/service-admin.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-lista-usuarios-activos',
  imports: [CommonModule],
  templateUrl: './lista-usuarios-activos.component.html',
  styleUrl: './lista-usuarios-activos.component.css'
})
export class ListaUsuariosActivosComponent implements OnInit{

  arrayUsuariosActivos: any[] = [];

  constructor(private adminService:ServiceAdminService){ }

  ngOnInit(): void {
    this.adminService.getActiveUsers().subscribe({
      next: users => {
        this.arrayUsuariosActivos = users;
        console.log(this.arrayUsuariosActivos);
      },
      error: (err) => console.log(err)
    })
  }

  desactivarCuenta(id: string){

    this.adminService.desactivarCuenta(id).subscribe({
      next: () => {
        console.log("Cuenta desactivada correctamente");
      
      },
      error: (err) => console.log(err)
    })

  }

}
