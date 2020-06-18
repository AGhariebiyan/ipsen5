import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KbaseDetailComponent } from './kbase-detail.component';

describe('KbaseDetailComponent', () => {
  let component: KbaseDetailComponent;
  let fixture: ComponentFixture<KbaseDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KbaseDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KbaseDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
