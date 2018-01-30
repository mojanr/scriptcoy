import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BahanComponent } from './bahan.component';

describe('BahanComponent', () => {
  let component: BahanComponent;
  let fixture: ComponentFixture<BahanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BahanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BahanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
