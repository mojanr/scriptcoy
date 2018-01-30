import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelTambahComponent } from './model-tambah.component';

describe('ModelTambahComponent', () => {
  let component: ModelTambahComponent;
  let fixture: ComponentFixture<ModelTambahComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModelTambahComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelTambahComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
