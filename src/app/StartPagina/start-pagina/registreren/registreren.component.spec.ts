import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrerenComponent } from './registreren.component';

describe('RegistrerenComponent', () => {
  let component: RegistrerenComponent;
  let fixture: ComponentFixture<RegistrerenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistrerenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrerenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
