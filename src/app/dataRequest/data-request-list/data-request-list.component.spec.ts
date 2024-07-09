import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataRequestListComponent } from './data-request-list.component';

describe('DataRequestListComponent', () => {
  let component: DataRequestListComponent;
  let fixture: ComponentFixture<DataRequestListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DataRequestListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DataRequestListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
