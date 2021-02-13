import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuComponent } from './menu.component';
import { HeaderComponent } from '../header/header.component';
import { RouterTestingModule } from '@angular/router/testing';
import { MatButtonModule, MatToolbarModule, MatIconModule, MatMenuModule } from '@angular/material';
import { User } from 'src/app/models/User.model';

describe('MenuComponent', () => {
  let component: MenuComponent;
  let fixture: ComponentFixture<MenuComponent>;
  const angularMaterial=[
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,

  ]
  
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        angularMaterial,
        RouterTestingModule
      ],
      declarations: [ 
        MenuComponent,
        HeaderComponent 
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuComponent);
    component = fixture.componentInstance;
    component.user = new User("alex",12,"luis_pesar@hotmail.com","not","Alumno","1",true) //Se crea un usuario de prueba para el testing 

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
