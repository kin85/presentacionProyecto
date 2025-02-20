import { Component, HostListener } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from "../../../componentes_global/footer/footer.component";
import { HeaderComponent } from "../../../componentes_global/header/header.component";
import { ChatListComponent } from '../chat-list/chat-list.component';
import { MainChatComponent } from '../main-chat/main-chat.component';
import { FiltersComponent } from "../filters/filters.component";
import { CommonModule, NgStyle } from '@angular/common';
import { SharedService } from '../../../service/sharedService';
@Component({
  selector: 'app-root',
  imports: [NgStyle, ChatListComponent, MainChatComponent, FiltersComponent, CommonModule],
  templateUrl: './admin_panel.component.html',
  styleUrl: './admin_panel.component.css'
})
export class AdminPanelComponent {
  constructor(private sharedService: SharedService) {}

  title = 'rag2daw2025frontend';
  chatContainerHeight = '72.8vh';
  chatListWidth = 300;
  isResizing = false;
  showFooter = false;
  
  onFiltersToggled(showFilters: boolean) {
    this.chatContainerHeight = showFilters ? '72.8vh' : '84vh';
  }

  startResizing(event: MouseEvent) {
    this.isResizing = true;
    event.preventDefault();
  }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    if (!this.isResizing) return;

    const newWidth = event.clientX; 
    this.chatListWidth = newWidth;

    if (this.chatListWidth < 200) this.chatListWidth = 200;
    if (this.chatListWidth > 600) this.chatListWidth = 600;
  }

  @HostListener('document:mouseup')
  onMouseUp() {
    this.isResizing = false;
  }

  // al suceder el evento de seleccionar un chat, se modifica la variable que se pasa al componente hijo secundario
  idChatSeleccionado: number = -1;
  alSeleccionarChat(idChat: number) {
    this.idChatSeleccionado = idChat;
  }

  bodyFiltros: object | null = null;
  alFiltrarChat(bodyFiltros: object) {
    this.bodyFiltros = bodyFiltros;
  }

  toggleFooter() {
    this.showFooter = !this.showFooter;
  }

  hideComponent() {
    this.sharedService.hideComponent(); // Triggers event
  }
}