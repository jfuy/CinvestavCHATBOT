import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersLessonsComponent } from './users-lessons.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { AddSubjectComponent } from 'src/app/dialogs/add-subject/add-subject.component';
import { MatCardModule, MatButtonModule, MatToolbarModule, MatInputModule, MatIconModule, MatMenuModule, MatDialogModule, MatTableDataSource, MatTableModule, MatPaginatorModule, MatSelectModule, MatCheckboxModule } from '@angular/material';
import { HeaderComponent } from '../header/header.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

const angularMaterial=[
  MatCardModule,
  MatButtonModule,
  MatToolbarModule,
  MatInputModule,
  MatIconModule,
  MatMenuModule,
  MatDialogModule,
  MatToolbarModule,
  MatTableModule,
  MatPaginatorModule,
  MatSelectModule,
  MatCheckboxModule
]
describe('UsersLessonsComponent', () => {
  let component: UsersLessonsComponent;
  let fixture: ComponentFixture<UsersLessonsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        angularMaterial,
        FormsModule, 
        ReactiveFormsModule,
        RouterTestingModule,
        HttpClientTestingModule,
        BrowserAnimationsModule
      ],
      declarations: [ UsersLessonsComponent,AddSubjectComponent,HeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersLessonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
