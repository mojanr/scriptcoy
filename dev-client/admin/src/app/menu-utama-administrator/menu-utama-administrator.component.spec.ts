import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuUtamaAdministratorComponent } from './menu-utama-administrator.component';

describe('MenuUtamaAdministratorComponent', () => {
  let component: MenuUtamaAdministratorComponent;
  let fixture: ComponentFixture<MenuUtamaAdministratorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuUtamaAdministratorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuUtamaAdministratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
