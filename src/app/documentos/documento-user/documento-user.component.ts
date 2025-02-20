import { Component } from '@angular/core';
import { DocumentoListComponent } from '../documento-list/documento-list.component';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';
import { DocumentoCreateFormComponent } from '../documento-create-form/documento-create-form.component';

@Component({
  selector: 'app-documento-user',
  imports: [CommonModule, DocumentoListComponent, DocumentoCreateFormComponent, RouterModule],
  templateUrl: './documento-user.component.html',
  styleUrl: './documento-user.component.css'
})
export class DocumentoUserComponent {
  
}
