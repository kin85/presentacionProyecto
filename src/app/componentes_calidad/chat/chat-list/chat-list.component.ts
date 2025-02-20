import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { IChat } from '../../ichat';
import { ApiService } from '../../../service/service';
import { EnviarFitrosService } from '../enviar-fitros.service';


@Component({
  selector: 'app-chat-list',
  imports: [CommonModule],
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.css']
})
export class ChatListComponent implements OnInit {
	chats: IChat[] = [];

	constructor(
		private apiService: ApiService,
		private enviarFiltrosService: EnviarFitrosService 
	) {};

	ngOnInit() {
		this.cargarChats();
		this.suscripcionFiltros();
	}

	// función que carga los chats al iniciar la app
	cargarChats() {
		this.apiService.getChats().subscribe( 
			page => this.chats = page.content,
			error => console.error("Error al cargar los chats de todos los usuarios: ", error)
		);
	}

	// función que muestra los mensajes del chat cuando se le hace click a uno
	@Output() seleccionarChat = new EventEmitter<number>();
	onItemClick(idChat: number) {
		this.seleccionarChat.emit(idChat);
	}

	// función que muestra los chat despues de aplicar los filtros
	suscripcionFiltros() {
		this.enviarFiltrosService.filtros$.subscribe( bodyFiltros => {
			if (bodyFiltros != null)
				this.apiService.filterChats(bodyFiltros).subscribe( 
					page => this.chats = page.content,
					error => console.error("Error al conseguir los usuarios: ", error)
				);
		})
	}

	// función que borra un chat al darle al boton
	borrarChat(idChat: number) {
		this.apiService.deleteChat(idChat).subscribe( 
			response => this.cargarChats(),
			error => console.error("Error al conseguir los chats: ", error)
		);
	}

	// función que inicia un nuevo chat al darle a "Iniciar Chat"
	jsonIniciarChat = {
		"usuario": "usuarioAngular",
    	"contexto": 1
	};
	iniciarChat() {
		this.apiService.createChat(this.jsonIniciarChat).subscribe( 
			response => {
				this.cargarChats()
			},
			error => console.error("Error al conseguir los chats: ", error)
		);
	}	
}