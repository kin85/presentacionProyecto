import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroFakeComponent } from './registro-fake.component';

describe('RegistroFakeComponent', () => {
  let component: RegistroFakeComponent;
  let fixture: ComponentFixture<RegistroFakeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistroFakeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistroFakeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
