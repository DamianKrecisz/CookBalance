import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientStartPageComponent } from './client-start-page.component';

describe('ClientStartPageComponent', () => {
  let component: ClientStartPageComponent;
  let fixture: ComponentFixture<ClientStartPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientStartPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientStartPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
