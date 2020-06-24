import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KbaseAllComponent } from './kbase-all.component';

describe('KbaseAllComponent', () => {
  let component: KbaseAllComponent;
  let fixture: ComponentFixture<KbaseAllComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KbaseAllComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KbaseAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
