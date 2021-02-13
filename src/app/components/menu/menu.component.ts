import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/User.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  /**
   * @param typeMenu tipo de menu de la vista existente estos pueden ser:  Alumno, Profesor y Adminsitrador
   */
  typeMenu:String ="" //existen tres tipos de menu Alumno, Profesor y Adminsitrador entre esos debe de cambiar la variable
  
  /**
   * @param name variable del nombre a mostrar en el menu
   */
  name:String="Luis"

  /**
   * saber si esta activo el usuario
   */
  status:Boolean;

  /**
   * @param user usuario actual del sistema
   */
  user:User;

  /**
   * 
   * @param router variable para cambiar la vista
   */
  constructor(
    private router: Router,
  ) {
    this.user= JSON.parse(localStorage.getItem("user"))
    
   }

   /**
    * Metodo que se ejecuta cuando se crea la vista inicializa el usuario y el nombre
    */
  ngOnInit() {
    this.typeMenu=this.user.type;
    this.name= this.user.username;
    this.status = this.user.activated;
    // console.log(this.user)
    
  }

  /**
   * Metodo para dirigirse a la vista de archivos
   */
  goToGeneralFiles(){
    this.router.navigateByUrl("General-files");
  }

  /**
   * Metodo para dirigirse a la vista del chatbot
   */
  goToChatbot(){
    this.router.navigateByUrl("Chatbot")
  }

  /**
   * Metodo para dirigirse a la vista de las materias 
   */
  goToMaterias(){
    this.router.navigateByUrl("Users-lessons")
  }

  /**
   * Metodo para dirigirse a la vista de las recordatorios reminders 
   */
  goToRecordatorios(){
    this.router.navigateByUrl("reminders")
  }

  /**
   * Metodo para dirigirse a la vista para validar usuarios 
   */
  goToValidateUsers(){
    this.router.navigateByUrl("Validate-users")
  }
  /**
   * Metodo para dirigirse a la vista para calificar usuarios 
   */
  goToScoresUsers(){
    this.router.navigateByUrl("Scores");
  }
}
