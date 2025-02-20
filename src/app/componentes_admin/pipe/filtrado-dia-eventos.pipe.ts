import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtradoDiaEventos'
})
export class FiltradoDiaEventosPipe implements PipeTransform {

  transform(eventos: any[]): any[] {
    if (!eventos) return [];

    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);

    return eventos.filter(evento => {
      const fechaEvento = new Date(evento.fecha);
      return fechaEvento >= hoy;
    });
  }
}
