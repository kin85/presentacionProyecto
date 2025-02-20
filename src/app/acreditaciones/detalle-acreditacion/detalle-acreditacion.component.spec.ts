import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleAcreditacionComponent } from './detalle-acreditacion.component';

describe('DetalleAcreditacionComponent', () => {
  let component: DetalleAcreditacionComponent;
  let fixture: ComponentFixture<DetalleAcreditacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetalleAcreditacionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetalleAcreditacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
