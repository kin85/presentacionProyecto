import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaUsuariosActivosComponent } from './lista-usuarios-activos.component';

describe('ListaUsuariosActivosComponent', () => {
  let component: ListaUsuariosActivosComponent;
  let fixture: ComponentFixture<ListaUsuariosActivosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaUsuariosActivosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaUsuariosActivosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
