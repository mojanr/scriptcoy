import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HargaBahanTambahComponent } from './harga-bahan-tambah.component';

describe('HargaBahanTambahComponent', () => {
  let component: HargaBahanTambahComponent;
  let fixture: ComponentFixture<HargaBahanTambahComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HargaBahanTambahComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HargaBahanTambahComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
