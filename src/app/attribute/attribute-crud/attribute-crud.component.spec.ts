import { ComponentFixture, TestBed } from '@angular/core/testing';

import { attributeCrudComponent } from './attribute-crud.component';

describe('attributeCrudComponent', () => {
  let component: attributeCrudComponent;
  let fixture: ComponentFixture<attributeCrudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ attributeCrudComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(attributeCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
