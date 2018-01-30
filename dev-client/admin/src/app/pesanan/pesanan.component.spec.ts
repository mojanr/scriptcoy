import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PesananComponent } from './pesanan.component';

describe('PesananComponent', () => {
  let component: PesananComponent;
  let fixture: ComponentFixture<PesananComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PesananComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PesananComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
