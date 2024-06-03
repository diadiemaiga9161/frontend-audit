import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouterReferentielsComponent } from './ajouter-referentiels.component';

describe('AjouterReferentielsComponent', () => {
  let component: AjouterReferentielsComponent;
  let fixture: ComponentFixture<AjouterReferentielsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AjouterReferentielsComponent]
    });
    fixture = TestBed.createComponent(AjouterReferentielsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
