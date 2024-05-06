import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EchellesComponent } from './echelles.component';

describe('EchellesComponent', () => {
  let component: EchellesComponent;
  let fixture: ComponentFixture<EchellesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EchellesComponent]
    });
    fixture = TestBed.createComponent(EchellesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
