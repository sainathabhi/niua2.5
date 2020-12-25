import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUserssComponent } from './add-userss.component';

describe('AddUserssComponent', () => {
  let component: AddUserssComponent;
  let fixture: ComponentFixture<AddUserssComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddUserssComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddUserssComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
