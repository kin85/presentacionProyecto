import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ServiceAdminService } from '../service/service-admin.service';
import { Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { debounceTime, distinctUntilChanged, fromEvent, map } from 'rxjs';
import { SearchboxService } from '../service/search-service.service';


@Component({
  selector: 'app-listado-usuarios',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './listado-usuarios.component.html',
  styleUrl: './listado-usuarios.component.css'
})

export class ListadoUsuariosComponent implements OnInit, AfterViewInit {
  @ViewChild("searchInput")
  inputSearch?: ElementRef
  
  users: any[] = [];
  filteredUsers: any[] = [];
  usuariosSearchBar: any[] = [];
  totalPages: number = 0;
  currentPage: number = 0;
  ordenId: boolean | null = null; 
  ordenNickname: boolean | null = null;
  roles: string[] = ['USUARIO', 'ADMINISTRADOR', 'ASESOR', 'SUPERVISOR', 'ACREDITADOR', 'EVALUADOR', 'PROFESOR', 'JEFEDPTO', 'JEFEESTUDIOS'];

  constructor(private adminService: ServiceAdminService, private service: SearchboxService) {}

  ngAfterViewInit() {
    // Se suscribe al evento 'keyup' del campo de búsqueda para detectar cuando el usuario escribe
    fromEvent<any>(this.inputSearch?.nativeElement, 'keyup')
      .pipe(
        // Extrae el valor del input cada vez que se escribe
        map(event => event.target.value),
        // Aplica un tiempo de espera de 400 ms para evitar peticiones por cada tecla presionada
        debounceTime(400),
        // Solo emite el valor si este es diferente al anterior
        distinctUntilChanged()
      ).subscribe(text => {
        // Emite el texto ingresado a través del servicio para que se use en la búsqueda
        this.service.emitirTexto(text);
      });
  }

  ngOnInit(): void {
    this.loadUsers();
    this.adminService.onUserDeleted().subscribe((id) => {
      this.users = this.users.filter(user => user.id !== id);
      this.filteredUsers = this.filteredUsers.filter(user => user.id !== id); // Actualizar la lista filtrada también
    });
    this.service.textObservable.subscribe(text => {
      //Si hay texto hace una petición obtener los usuarios
      if (text) {
        this.adminService.getUsersStartsWith(text).subscribe({
          next: (usuarios: any) => {
            //Si es valido actualiza la lista
            if (usuarios && Array.isArray(usuarios.content)) {
              this.usuariosSearchBar = usuarios.content;
              this.filteredUsers = this.usuariosSearchBar;  
            } else {
              //Si no hay usuarios limpia la lista
              this.usuariosSearchBar = [];
              this.filteredUsers = [];
            }
          },
          error: () => {
            //Si hay un error en la búsqueda, limpia ambas listas
            this.usuariosSearchBar = [];
            this.filteredUsers = [];
          }
        });
      } else {
        // Si no hay texto en la búsqueda, muestra todos los usuarios
        this.filteredUsers = [...this.users];  // Muestra todos los usuarios en la lista
      }
    });
  }

  loadUsers(page: number = 0): void {
    // Llama al servicio para cargar los usuarios de la página especificada
    this.adminService.getUsers(page).subscribe(response => {
      // Asigna la lista de usuarios obtenidos a 'users' y a 'filteredUsers' (para mostrar)
      this.users = response.users;
      this.filteredUsers = [...this.users];  // Inicializa filteredUsers con todos los usuarios
      this.totalPages = response.totalPages;
      this.currentPage = page;
      // Llama a applySorting() para aplicar el orden si es necesario
      this.applySorting();
    });
  }

  cambiarOrdenId(): void {
    // Reinicia el orden de 'nickname' y cambia el orden de 'id'
    this.ordenNickname = null; 
    this.ordenId = this.ordenId === null ? true : !this.ordenId;
    // Aplica el nuevo orden
    this.applySorting();
  }

  cambiarOrdenNickname(): void {
    // Reinicia el orden de 'id' y cambia el orden de 'nickname'
    this.ordenId = null; 
    this.ordenNickname = this.ordenNickname === null ? true : !this.ordenNickname;
    // Aplica el nuevo orden
    this.applySorting();
  }

  applySorting(): void {
    // Si se está ordenando por 'id', realiza la ordenación
    if (this.ordenId !== null) {
      this.filteredUsers.sort((a, b) => this.ordenId ? a.id - b.id : b.id - a.id);
    } 
    // Si se está ordenando por 'nickname', realiza la ordenación
    else if (this.ordenNickname !== null) {
      this.filteredUsers.sort((a, b) => this.ordenNickname ? a.nickname.localeCompare(b.nickname) : b.nickname.localeCompare(a.nickname));
    }
  }


  goToPage(page: number): void {
    if (page >= 0 && page < this.totalPages) {
      this.loadUsers(page);
    }
  }

  borrarUsuario(id: string) {
    if (!id) {
      Swal.fire("Error", "ID de usuario inválido.", "error");
      return;
    }
    
    Swal.fire({
      title: "¿Estás seguro?",
      text: "No podrás revertir esta acción.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc3545",
      cancelButtonColor: "#6c757d",
      confirmButtonText: "Sí, borrar",
      cancelButtonText: "Cancelar"
    }).then((result) => {
      if (result.isConfirmed) {
        this.adminService.deleteUser(id).subscribe({
          next: () => {
            this.adminService.notifyUserDeleted(id);
            Swal.fire("Eliminado", "El usuario ha sido eliminado con éxito.", "success");
          },
          error: () => {
            Swal.fire("Error", "Hubo un problema al eliminar el usuario.", "error");
          }
        });
      }
    });
  }

  filtrarPorRol(event: any): void {
    const rolSeleccionado = event.target.value;
    if (rolSeleccionado) {
      this.adminService.getRolUsers(rolSeleccionado).subscribe({
        next: (rol) => {
          this.filteredUsers = rol;  //Actualizamos filteredUsers con los usuarios filtrados por rol
        },
        error: (err) => {
          console.log(err);
        }
      });
    } else {
      this.filteredUsers = [...this.users];  //Si no hay rol seleccionado, mostramos todos los usuarios
    }
  }
}
