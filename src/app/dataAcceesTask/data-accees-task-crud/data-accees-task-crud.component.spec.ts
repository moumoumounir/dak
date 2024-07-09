import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataAcceesTaskCrudComponent } from './data-accees-task-crud.component';

describe('DataAcceesTaskCrudComponent', () => {
  let component: DataAcceesTaskCrudComponent;
  let fixture: ComponentFixture<DataAcceesTaskCrudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DataAcceesTaskCrudComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DataAcceesTaskCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
