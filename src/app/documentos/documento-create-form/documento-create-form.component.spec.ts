import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentoCreateFormComponent } from './documento-create-form.component';

describe('DocumentoCreateFormComponent', () => {
  let component: DocumentoCreateFormComponent;
  let fixture: ComponentFixture<DocumentoCreateFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DocumentoCreateFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DocumentoCreateFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
