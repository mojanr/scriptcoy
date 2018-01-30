import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelUbahComponent } from './model-ubah.component';

describe('ModelUbahComponent', () => {
  let component: ModelUbahComponent;
  let fixture: ComponentFixture<ModelUbahComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModelUbahComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelUbahComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
