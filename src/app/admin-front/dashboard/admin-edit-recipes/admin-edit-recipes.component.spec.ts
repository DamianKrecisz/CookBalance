import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEditRecipesComponent } from './admin-edit-recipes.component';

describe('AdminEditRecipesComponent', () => {
  let component: AdminEditRecipesComponent;
  let fixture: ComponentFixture<AdminEditRecipesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminEditRecipesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminEditRecipesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
