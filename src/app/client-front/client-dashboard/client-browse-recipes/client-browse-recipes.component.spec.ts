import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientBrowseRecipesComponent } from './client-browse-recipes.component';

describe('ClientBrowseRecipesComponent', () => {
  let component: ClientBrowseRecipesComponent;
  let fixture: ComponentFixture<ClientBrowseRecipesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientBrowseRecipesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientBrowseRecipesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
