import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BahanUbahComponent } from './bahan-ubah.component';

describe('BahanUbahComponent', () => {
  let component: BahanUbahComponent;
  let fixture: ComponentFixture<BahanUbahComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BahanUbahComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BahanUbahComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
