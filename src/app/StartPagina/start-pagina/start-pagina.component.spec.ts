import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StartPaginaComponent } from './start-pagina.component';

describe('StartPaginaComponent', () => {
  let component: StartPaginaComponent;
  let fixture: ComponentFixture<StartPaginaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StartPaginaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StartPaginaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
