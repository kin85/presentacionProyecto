import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeccionSelectsComponent } from './seccion-selects.component';

describe('SeccionSelectsComponent', () => {
  let component: SeccionSelectsComponent;
  let fixture: ComponentFixture<SeccionSelectsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeccionSelectsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeccionSelectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
