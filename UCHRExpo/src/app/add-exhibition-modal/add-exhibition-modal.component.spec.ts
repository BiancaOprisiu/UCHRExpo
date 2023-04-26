import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddExhibitionModalComponent } from './add-exhibition-modal.component';

describe('AddExhibitionModalComponent', () => {
  let component: AddExhibitionModalComponent;
  let fixture: ComponentFixture<AddExhibitionModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddExhibitionModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddExhibitionModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
