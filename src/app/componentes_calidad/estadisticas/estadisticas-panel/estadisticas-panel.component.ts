import { Component } from '@angular/core';
import { GraficaComponent } from "../grafica/grafica.component";
import { FiltrosComponent } from "../filtros/filtros.component";

@Component({
  selector: 'app-estadisticas-panel',
  imports: [GraficaComponent, FiltrosComponent],
  templateUrl: './estadisticas-panel.component.html',
  styleUrl: './estadisticas-panel.component.css'
})
export class EstadisticasPanelComponent {

}
