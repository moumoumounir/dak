import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataRequestCrudComponent } from './data-request-crud.component';

describe('DataRequestCrudComponent', () => {
  let component: DataRequestCrudComponent;
  let fixture: ComponentFixture<DataRequestCrudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DataRequestCrudComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DataRequestCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
