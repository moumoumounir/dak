import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataAttributesListComponent } from './data-attributes-list.component';

describe('DataAttributesListComponent', () => {
  let component: DataAttributesListComponent;
  let fixture: ComponentFixture<DataAttributesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DataAttributesListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DataAttributesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
