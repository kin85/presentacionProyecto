import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { saveAs } from 'file-saver';
import { DocumentoListComponent } from '../documento-list/documento-list.component';
import { DocumentosService } from '../../services/documentos.service';

@Component({
  selector: 'app-documento-create-form',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './documento-create-form.component.html',
  styleUrl: './documento-create-form.component.css'
})
export class DocumentoCreateFormComponent {
  usuario_id = 2;
  comentario = '';
  nombreFichero = '';
  tipo_documento = '';
  estado = 'PENDIENTE';
  file: File | null = null;
  intentoSubida = false;
  createForm: FormGroup;
  existenDocumentos = false;
  dniSubido = false;
  documentosArray: any[] = [];
  errorDNI: string = '';

  constructor(
    private documentoService: DocumentosService,
    private formBuilder: FormBuilder,
  ) {
    this.createForm = this.formBuilder.group({
      file: [null, Validators.required],
      nombreFichero: ['', Validators.required],
      tipo_documento: ['', Validators.required],
      comentario: ['']
    });
  }

  ngOnInit(){
    this.dniSubido = false;
    this.documentoService.searchDocumentos('2').subscribe({
      next: documentos => {
        this.documentosArray = documentos;
        for (const element of this.documentosArray) {
          if (element.tipo_documento === 'DNI') {
            this.dniSubido = true;
          }
          console.log(this.dniSubido);
        }
        
      },
      error: error => console.error('Error al obtener documentos del usuario:', error)
    });
  }

  
  error: string | undefined;

  subir() {
    
    this.intentoSubida = true; 

    if (!this.file || !this.createForm.get('nombreFichero')?.value) {
      console.error('Debe seleccionar un archivo y proporcionar un nombre de fichero.');
      return;
    }

    

    //Id usuario se tiene que coger de la sesion
    const documento = {
      id_usuario: 2,
      comentario: this.createForm.get('comentario')?.value,
      tipo_documento: this.createForm.get('tipo_documento')?.value,
      estado: this.estado,
      nombreFichero: this.createForm.get('nombreFichero')?.value,
    };

    if (this.dniSubido && documento.tipo_documento === 'DNI') {
      console.log('Ya se ha subido el DNI');
      this.error =  "Un usuario solo puede subir un DNI";
      return;
    }


    this.documentoService.subirDocumento(documento, this.file)
      .then(observable => {
        observable.subscribe({
          next: response => {
            console.log('Documento creado exitosamente:', response);
            location.reload(); 
            
            
          },
          error: error => console.error('Error al crear documento:', error)
        });
      })
      .catch(error => console.error('Error al convertir el archivo:', error));

    this.createForm.reset();
  }

  get fileValid() {
    return (
      this.createForm.get('file')?.valid &&
      this.createForm.get('file')?.touched
    );
  }

  get nombreFicheroValid() {
    const control = this.createForm.get('nombreFichero');
    return control?.touched && !control.valid;
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.actualizarArchivo(file);
    }
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    if (event.dataTransfer?.files.length) {
      const file = event.dataTransfer.files[0];
      this.actualizarArchivo(file);
    }
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    const dropArea = event.currentTarget as HTMLElement;
    dropArea.classList.add('dragover');
  }

  onDragLeave(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    const dropArea = event.currentTarget as HTMLElement;
    dropArea.classList.remove('dragover');
  }

  actualizarArchivo(file: File) {
    if (!file) return; // Evitar archivos vacíos

    this.file = file;
    // Actualizamos el formulario con el archivo
    this.createForm.patchValue({ file: file });
    this.createForm.get('file')?.updateValueAndValidity();
    // Marcar el control como "touched" para que fileValid retorne true.
    this.createForm.get('file')?.markAsTouched();

    // Cambiar el texto dentro del área de arrastre
    document.getElementById('drop-text')!.innerText = file.name;
  }

  borrarArchivo() {
    this.file = null;
    this.createForm.reset(); // Resetea el formulario
    document.getElementById('drop-text')!.innerText = "Arrastra y suelta un archivo aquí o haz clic para seleccionar";
  }

  triggerFileInput() {
    document.getElementById('file')?.click();
  }
}