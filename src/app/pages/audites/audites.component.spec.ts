import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { AuditesComponent } from './audites.component';


describe('AuditesComponent', () => {
  let component: AuditesComponent;
  let fixture: ComponentFixture<AuditesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AuditesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuditesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
