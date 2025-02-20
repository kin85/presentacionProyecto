import { Component, OnInit } from '@angular/core';
import { ServiceAdminService } from '../service/service-admin.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cuentas-block',
  imports: [],
  templateUrl: './cuentas-block.component.html',
  styleUrl: './cuentas-block.component.css'
})
export class CuentasBlockComponent implements OnInit{
  
  usersBlock: any[] = [];
  

  constructor(private adminService:ServiceAdminService, private router:Router) {}
  
  ngOnInit(): void {
    this.getUsersBlock();
  }

  desbloquear(id:number){
    this.adminService.desbloquearCuenta(id).subscribe({
      next: () => {
        this.getUsersBlock();
        console.log(this.getUsersBlock);
      }
    })

  }

  getUsersBlock(){
    this.adminService.getUsersBlock().subscribe({
      next: users => {
        this.usersBlock = users.filter(user => user.bloqueado);
        console.log(this.usersBlock);

      },
      error: () => {
        console.log("Error al devolver informacion sobre usuarios bloqueados")
      }
    })

  }

}
