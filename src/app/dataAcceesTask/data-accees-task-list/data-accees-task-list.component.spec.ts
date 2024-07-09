import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataAcceesTaskListComponent } from './data-accees-task-list.component';

describe('DataAcceesTaskListComponent', () => {
  let component: DataAcceesTaskListComponent;
  let fixture: ComponentFixture<DataAcceesTaskListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DataAcceesTaskListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DataAcceesTaskListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
