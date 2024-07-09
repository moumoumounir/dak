import { ComponentFixture, TestBed } from '@angular/core/testing';

import { attributeListComponent } from './attribute-list.component';

describe('attributeListComponent', () => {
  let component: attributeListComponent;
  let fixture: ComponentFixture<attributeListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ attributeListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(attributeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
