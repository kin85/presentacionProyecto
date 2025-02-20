import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcreditacionesComponent } from './acreditaciones.component';

describe('AcreditacionesComponent', () => {
  let component: AcreditacionesComponent;
  let fixture: ComponentFixture<AcreditacionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AcreditacionesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AcreditacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
