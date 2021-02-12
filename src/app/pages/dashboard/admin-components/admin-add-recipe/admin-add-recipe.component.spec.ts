import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAddRecipeComponent } from './admin-add-recipe.component';

describe('AdminAddRecipeComponent', () => {
  let component: AdminAddRecipeComponent;
  let fixture: ComponentFixture<AdminAddRecipeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminAddRecipeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAddRecipeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
