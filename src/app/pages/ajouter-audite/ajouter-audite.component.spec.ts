import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouterAuditeComponent } from './ajouter-audite.component';

describe('AjouterAuditeComponent', () => {
  let component: AjouterAuditeComponent;
  let fixture: ComponentFixture<AjouterAuditeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AjouterAuditeComponent]
    });
    fixture = TestBed.createComponent(AjouterAuditeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
