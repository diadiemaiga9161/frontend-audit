import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatistiquesbetaComponent } from './statistiquesbeta.component';

describe('StatistiquesbetaComponent', () => {
  let component: StatistiquesbetaComponent;
  let fixture: ComponentFixture<StatistiquesbetaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StatistiquesbetaComponent]
    });
    fixture = TestBed.createComponent(StatistiquesbetaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
