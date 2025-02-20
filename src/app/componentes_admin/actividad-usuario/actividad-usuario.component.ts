import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ServiceAdminService } from '../service/service-admin.service';
import { ActividadUsuario } from '../../interface/ActividadUsuario';
import { FiltradoDiaEventosPipe } from '../pipe/filtrado-dia-eventos.pipe';

@Component({
  selector: 'app-actividad-usuario',
  imports: [FiltradoDiaEventosPipe],
  templateUrl: './actividad-usuario.component.html',
  styleUrl: './actividad-usuario.component.css'
})
export class ActividadUsuarioComponent implements OnChanges{

  @Input() idUser!: number;
  arrayActividadUsuario: ActividadUsuario[] = [];
  
  constructor(private adminService:ServiceAdminService) { }

  //Utilizamos OnChanges cuando canvian valores de los Input()
  // o cuando el componente hijo recive informacion del padre y necesita realcionarse
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['idUser'] && this.idUser) {
      this.actividadUsuario();
    }
  }

  actividadUsuario(){
    if (!this.idUser) {
      return;
    }
    this.adminService.getActividadUser(this.idUser).subscribe({
      next: (data) => {
        this.arrayActividadUsuario = data;
        console.log(this.arrayActividadUsuario);
      },
      error: (error) => {
        console.error(error);
      }

    })

  }

}
