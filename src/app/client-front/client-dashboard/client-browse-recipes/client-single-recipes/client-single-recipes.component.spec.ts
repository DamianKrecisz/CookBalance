import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientSingleRecipesComponent } from './client-single-recipes.component';

describe('ClientSingleRecipesComponent', () => {
  let component: ClientSingleRecipesComponent;
  let fixture: ComponentFixture<ClientSingleRecipesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientSingleRecipesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientSingleRecipesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
