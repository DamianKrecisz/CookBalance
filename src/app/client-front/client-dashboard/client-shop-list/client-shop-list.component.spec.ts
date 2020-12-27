import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientShopListComponent } from './client-shop-list.component';

describe('ClientShopListComponent', () => {
  let component: ClientShopListComponent;
  let fixture: ComponentFixture<ClientShopListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientShopListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientShopListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
