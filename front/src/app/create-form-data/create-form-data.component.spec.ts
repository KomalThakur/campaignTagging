import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateFormDataComponent } from './create-form-data.component';

describe('CreateFormDataComponent', () => {
  let component: CreateFormDataComponent;
  let fixture: ComponentFixture<CreateFormDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateFormDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateFormDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
