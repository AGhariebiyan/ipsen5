import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KbaseAddComponent } from './kbase-add.component';

describe('KbaseAddComponent', () => {
  let component: KbaseAddComponent;
  let fixture: ComponentFixture<KbaseAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KbaseAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KbaseAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
