import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PengelolaUbahComponent } from './pengelola-ubah.component';

describe('PengelolaUbahComponent', () => {
  let component: PengelolaUbahComponent;
  let fixture: ComponentFixture<PengelolaUbahComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PengelolaUbahComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PengelolaUbahComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
