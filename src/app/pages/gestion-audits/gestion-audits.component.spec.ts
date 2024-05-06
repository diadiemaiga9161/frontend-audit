import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionAuditsComponent } from './gestion-audits.component';

describe('GestionAuditsComponent', () => {
  let component: GestionAuditsComponent;
  let fixture: ComponentFixture<GestionAuditsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GestionAuditsComponent]
    });
    fixture = TestBed.createComponent(GestionAuditsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
