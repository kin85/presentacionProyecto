import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-mensajes',
  imports: [CommonModule],
  templateUrl: './mensajes.component.html',
  styleUrl: './mensajes.component.css'
})
export class MensajesComponent {
    @Input() usuario: any;
  mensajes = [
    { remitente: 'Juan Pérez', rol: "Asesor", contenido: 'Hola, ¿cómo estás?', fecha: new Date() },
    { remitente: 'Ana Gómez', rol: "Asesor", contenido: 'Nos vemos mañana en la reunión.', fecha: new Date() },
    { remitente: 'Carlos López', rol: "Acreditador", contenido: 'Recibí el documento, gracias.', fecha: new Date() }
  ];
}
