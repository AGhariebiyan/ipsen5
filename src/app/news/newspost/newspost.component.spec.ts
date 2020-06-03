import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewspostComponent } from './newspost.component';

describe('NewspostComponent', () => {
  let component: NewspostComponent;
  let fixture: ComponentFixture<NewspostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewspostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewspostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
