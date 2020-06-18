import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KbaseEditComponent } from './kbase-edit.component';

describe('KbaseEditComponent', () => {
  let component: KbaseEditComponent;
  let fixture: ComponentFixture<KbaseEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KbaseEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KbaseEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
