import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CuentasBlockComponent } from './cuentas-block.component';

describe('CuentasBlockComponent', () => {
  let component: CuentasBlockComponent;
  let fixture: ComponentFixture<CuentasBlockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CuentasBlockComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CuentasBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
