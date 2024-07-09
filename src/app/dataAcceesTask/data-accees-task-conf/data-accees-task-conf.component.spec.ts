import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataAcceesTaskConfComponent } from './data-accees-task-conf.component';

describe('DataAcceesTaskConfComponent', () => {
  let component: DataAcceesTaskConfComponent;
  let fixture: ComponentFixture<DataAcceesTaskConfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DataAcceesTaskConfComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DataAcceesTaskConfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
