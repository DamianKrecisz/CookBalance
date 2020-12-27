import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientCaloriesRequiredComponent } from './client-calories-required.component';

describe('ClientCaloriesRequiredComponent', () => {
  let component: ClientCaloriesRequiredComponent;
  let fixture: ComponentFixture<ClientCaloriesRequiredComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientCaloriesRequiredComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientCaloriesRequiredComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
