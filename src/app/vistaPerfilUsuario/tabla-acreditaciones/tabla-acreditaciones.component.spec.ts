import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaAcreditacionesComponent } from './tabla-acreditaciones.component';

describe('TablaAcreditacionesComponent', () => {
  let component: TablaAcreditacionesComponent;
  let fixture: ComponentFixture<TablaAcreditacionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TablaAcreditacionesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TablaAcreditacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
