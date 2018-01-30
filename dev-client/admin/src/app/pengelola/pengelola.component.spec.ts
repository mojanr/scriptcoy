import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PengelolaComponent } from './pengelola.component';

describe('PengelolaComponent', () => {
  let component: PengelolaComponent;
  let fixture: ComponentFixture<PengelolaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PengelolaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PengelolaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
