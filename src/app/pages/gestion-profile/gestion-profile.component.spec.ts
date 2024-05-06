import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionProfileComponent } from './gestion-profile.component';

describe('GestionProfileComponent', () => {
  let component: GestionProfileComponent;
  let fixture: ComponentFixture<GestionProfileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GestionProfileComponent]
    });
    fixture = TestBed.createComponent(GestionProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
