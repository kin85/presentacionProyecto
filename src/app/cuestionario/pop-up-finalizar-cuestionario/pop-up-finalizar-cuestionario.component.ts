import { Component, Input, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-pop-up-finalizar-cuestionario',
  imports: [RouterLink],
  templateUrl: './pop-up-finalizar-cuestionario.component.html',
  styleUrl: './pop-up-finalizar-cuestionario.component.css'
})
export class PopUpFinalizarCuestionarioComponent {
    @Input() popUpData: any;
    
    
}
