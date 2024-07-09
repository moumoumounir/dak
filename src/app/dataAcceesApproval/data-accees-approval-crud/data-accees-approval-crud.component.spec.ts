import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataAcceesApprovalCrudComponent } from './data-accees-approval-crud.component';

describe('DataAcceesApprovalCrudComponent', () => {
  let component: DataAcceesApprovalCrudComponent;
  let fixture: ComponentFixture<DataAcceesApprovalCrudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DataAcceesApprovalCrudComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DataAcceesApprovalCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
