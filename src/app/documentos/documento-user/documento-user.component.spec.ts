import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentoUserComponent } from './documento-user.component';

describe('DocumentoUserComponent', () => {
  let component: DocumentoUserComponent;
  let fixture: ComponentFixture<DocumentoUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DocumentoUserComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DocumentoUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
