import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserMatListComponent } from './user-mat-list.component';

describe('UserMatListComponent', () => {
  let component: UserMatListComponent;
  let fixture: ComponentFixture<UserMatListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserMatListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserMatListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
