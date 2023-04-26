import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSignInModalComponent } from './admin-sign-in-modal.component';

describe('AdminSignInModalComponent', () => {
  let component: AdminSignInModalComponent;
  let fixture: ComponentFixture<AdminSignInModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminSignInModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminSignInModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
