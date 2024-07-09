import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataAcceesApprovalListComponent } from './data-accees-approval-list.component';

describe('DataAcceesApprovalListComponent', () => {
  let component: DataAcceesApprovalListComponent;
  let fixture: ComponentFixture<DataAcceesApprovalListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DataAcceesApprovalListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DataAcceesApprovalListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
