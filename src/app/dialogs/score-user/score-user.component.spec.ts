import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScoreUserComponent } from './score-user.component';

describe('ScoreUserComponent', () => {
  let component: ScoreUserComponent;
  let fixture: ComponentFixture<ScoreUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScoreUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScoreUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
