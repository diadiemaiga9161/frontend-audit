import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuditsCoursComponent } from './audits-cours.component';

describe('AuditsCoursComponent', () => {
  let component: AuditsCoursComponent;
  let fixture: ComponentFixture<AuditsCoursComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AuditsCoursComponent]
    });
    fixture = TestBed.createComponent(AuditsCoursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
