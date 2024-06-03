import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouterAuditComponent } from './ajouter-audit.component';

describe('AjouterAuditComponent', () => {
  let component: AjouterAuditComponent;
  let fixture: ComponentFixture<AjouterAuditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AjouterAuditComponent]
    });
    fixture = TestBed.createComponent(AjouterAuditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
