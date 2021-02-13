import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSubjectComponent } from './add-subject.component';
import { MatDialogRef, MAT_DIALOG_DATA, MatCardModule, MatButtonModule, MatToolbarModule, MatIconModule, MatRadioModule, MatDialogModule, MatProgressSpinnerModule, MatMenuModule, MatSelectModule, MatInputModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

describe('AddSubjectComponent', () => {
  let component: AddSubjectComponent;
  let fixture: ComponentFixture<AddSubjectComponent>;
  const angularMaterial=[
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatInputModule,
    MatIconModule,
    MatRadioModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatMenuModule,
    MatSelectModule
    
  ]
  
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        angularMaterial,
        FormsModule, 
        ReactiveFormsModule,
        
        BrowserAnimationsModule
        
      ],
      providers: [
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: [] },
        // ...
      ],
      declarations: [ AddSubjectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSubjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
