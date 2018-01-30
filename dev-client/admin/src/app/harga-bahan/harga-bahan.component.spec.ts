import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HargaBahanComponent } from './harga-bahan.component';

describe('HargaBahanComponent', () => {
  let component: HargaBahanComponent;
  let fixture: ComponentFixture<HargaBahanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HargaBahanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HargaBahanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
