import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BahanTambahComponent } from './bahan-tambah.component';

describe('BahanTambahComponent', () => {
  let component: BahanTambahComponent;
  let fixture: ComponentFixture<BahanTambahComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BahanTambahComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BahanTambahComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
