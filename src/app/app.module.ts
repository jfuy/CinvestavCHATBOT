import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { XyzComponent } from './components/xyz/xyz.component';
import { AbcComponent } from './components/abc/abc.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import { LoginComponent, CustomSnackBarComponentLogin } from './components/login/login.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import { HeaderComponent } from './components/header/header.component';
import {MatInputModule, MatProgressSpinnerModule, MatDatepickerModule, MatNativeDateModule, MatSnackBarModule} from '@angular/material';
import { RegisterComponent, CustomSnackBarComponentRegister } from './components/register/register.component';
import {MatRadioModule} from '@angular/material/radio';
import { MenuComponent } from './components/menu/menu.component';
import { ChatbotComponent } from './components/chatbot/chatbot.component';
import {MatDialogModule} from '@angular/material/dialog';
import { AlertComponent } from './components/alert/alert.component';
import { environment } from 'src/environments/environment';
import {MatMenuModule} from '@angular/material/menu';
import {MatSelectModule} from '@angular/material/select';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatTableModule} from '@angular/material/table';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { ClipboardModule } from 'ngx-clipboard';


import { AngularFireModule } from '@angular/fire';
import {AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';

import { AddFilesComponent, CustomSnackBarComponentAddFilesChatbot } from './dialogs/add-files/add-files.component';
import { RouteGuardGuard } from './guardians/route-guard/route-guard.guard';
import { LoginRegisterGuard } from './guardians/loginRegister/login-register.guard';
import { ValidateUsersComponent } from './components/validate-users/validate-users.component';
import { AdminGuardianGuard } from './guardians/admin-guardian/admin-guardian.guard';
import { UsersLessonsComponent,CustomSnackBarComponentUserLessonsAddLesson, CustomSnackBarComponentUserLessonsAddStudent } from './components/users-lessons/users-lessons.component';
import { LessonsComponent } from './components/lessons/lessons.component';
import { AddSubjectComponent } from './dialogs/add-subject/add-subject.component';
import { AddStudentComponent } from './dialogs/add-student/add-student.component';
import { ScoresComponent,CustomSnackBarComponentAddScore } from './components/scores/scores.component';
import { ScoreUserComponent } from './dialogs/score-user/score-user.component';
import { GeneralFilesComponent, CustomSnackBarComponentSendGeneralFile } from './components/general-files/general-files.component';
import { RemindersComponent, CustomSnackBarComponent } from './components/reminders/reminders.component';
import { GenerateKeyComponent } from './dialogs/generate-key/generate-key.component';

/**
 * Variable para importar todas las librerias de angular material
 */
const angularMaterial=[
  MatCheckboxModule,
  MatCardModule,
  MatButtonModule,
  MatToolbarModule,
  MatInputModule,
  MatIconModule,
  MatRadioModule,
  MatDialogModule,
  MatProgressSpinnerModule,
  MatMenuModule,
  MatSelectModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatTableModule,
  MatPaginatorModule,
  MatSnackBarModule
]
@NgModule({
  declarations: [
    AppComponent,
    XyzComponent,
    AbcComponent,
    LoginComponent,
    HeaderComponent,
    RegisterComponent,
    MenuComponent,
    ChatbotComponent,
    AlertComponent,
    AddFilesComponent,
    ValidateUsersComponent,
    UsersLessonsComponent,
    LessonsComponent,
    AddSubjectComponent,
    AddStudentComponent,
    ScoresComponent,
    ScoreUserComponent,
    GeneralFilesComponent,
    RemindersComponent,
    GenerateKeyComponent,
    CustomSnackBarComponent,
    CustomSnackBarComponentUserLessonsAddLesson,
    CustomSnackBarComponentUserLessonsAddStudent,
    CustomSnackBarComponentRegister,
    CustomSnackBarComponentSendGeneralFile,
    CustomSnackBarComponentAddFilesChatbot,
    CustomSnackBarComponentAddScore,
    CustomSnackBarComponentLogin,
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    angularMaterial,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    ClipboardModule,
         
  ],
  providers: [RouteGuardGuard, LoginRegisterGuard, MatDatepickerModule, AdminGuardianGuard],
  bootstrap: [AppComponent],
  entryComponents: [AlertComponent,AddFilesComponent, AddSubjectComponent, 
    AddStudentComponent, ScoreUserComponent, GenerateKeyComponent, CustomSnackBarComponent,
    CustomSnackBarComponentUserLessonsAddLesson, CustomSnackBarComponentUserLessonsAddStudent,
    CustomSnackBarComponentRegister,CustomSnackBarComponentSendGeneralFile,
    CustomSnackBarComponentAddFilesChatbot,CustomSnackBarComponentAddScore,
    CustomSnackBarComponentLogin,
  ]
})
export class AppModule { }
