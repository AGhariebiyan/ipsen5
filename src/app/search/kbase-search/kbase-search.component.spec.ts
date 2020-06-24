import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KbaseSearchComponent } from './kbase-search.component';

describe('KbaseSearchComponent', () => {
  let component: KbaseSearchComponent;
  let fixture: ComponentFixture<KbaseSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KbaseSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KbaseSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
