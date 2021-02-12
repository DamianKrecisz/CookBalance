import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientFavoriteRecipesComponent } from './client-favorite-recipes.component';

describe('ClientFavoriteRecipesComponent', () => {
  let component: ClientFavoriteRecipesComponent;
  let fixture: ComponentFixture<ClientFavoriteRecipesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientFavoriteRecipesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientFavoriteRecipesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
