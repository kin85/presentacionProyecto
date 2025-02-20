import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstadisticasPanelComponent } from './estadisticas-panel.component';

describe('EstadisticasPanelComponent', () => {
  let component: EstadisticasPanelComponent;
  let fixture: ComponentFixture<EstadisticasPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EstadisticasPanelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EstadisticasPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
