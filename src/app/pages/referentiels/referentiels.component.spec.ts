import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReferentielsComponent } from './referentiels.component';

describe('ReferentielsComponent', () => {
  let component: ReferentielsComponent;
  let fixture: ComponentFixture<ReferentielsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReferentielsComponent]
    });
    fixture = TestBed.createComponent(ReferentielsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
