import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HargaBahanUbahComponent } from './harga-bahan-ubah.component';

describe('HargaBahanUbahComponent', () => {
  let component: HargaBahanUbahComponent;
  let fixture: ComponentFixture<HargaBahanUbahComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HargaBahanUbahComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HargaBahanUbahComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
