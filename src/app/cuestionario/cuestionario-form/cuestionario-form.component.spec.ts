import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CuestionarioFormComponent } from './cuestionario-form.component';

describe('CuestionarioFormComponent', () => {
  let component: CuestionarioFormComponent;
  let fixture: ComponentFixture<CuestionarioFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CuestionarioFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CuestionarioFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
