import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrossReferentielsComponent } from './cross-referentiels.component';

describe('CrossReferentielsComponent', () => {
  let component: CrossReferentielsComponent;
  let fixture: ComponentFixture<CrossReferentielsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CrossReferentielsComponent]
    });
    fixture = TestBed.createComponent(CrossReferentielsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
