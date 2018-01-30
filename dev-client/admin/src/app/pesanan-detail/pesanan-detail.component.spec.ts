import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PesananDetailComponent } from './pesanan-detail.component';

describe('PesananDetailComponent', () => {
  let component: PesananDetailComponent;
  let fixture: ComponentFixture<PesananDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PesananDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PesananDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
