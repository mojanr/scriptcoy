import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PengelolaTambahComponent } from './pengelola-tambah.component';

describe('PengelolaTambahComponent', () => {
  let component: PengelolaTambahComponent;
  let fixture: ComponentFixture<PengelolaTambahComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PengelolaTambahComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PengelolaTambahComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
