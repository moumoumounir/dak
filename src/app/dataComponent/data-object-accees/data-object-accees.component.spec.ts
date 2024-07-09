import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataObjectAcceesComponent } from './data-object-accees.component';

describe('DataObjectAcceesComponent', () => {
  let component: DataObjectAcceesComponent;
  let fixture: ComponentFixture<DataObjectAcceesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DataObjectAcceesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DataObjectAcceesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
