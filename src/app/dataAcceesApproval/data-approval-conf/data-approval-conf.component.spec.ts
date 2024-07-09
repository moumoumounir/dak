import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataApprovalConfComponent } from './data-approval-conf.component';

describe('DataApprovalConfComponent', () => {
  let component: DataApprovalConfComponent;
  let fixture: ComponentFixture<DataApprovalConfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DataApprovalConfComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DataApprovalConfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
