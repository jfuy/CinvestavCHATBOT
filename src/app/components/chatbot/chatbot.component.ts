import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { ChatbotService } from 'src/app/services/chatbot/chatbot.service';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/User.model';
import { Message } from 'src/app/models/Message.model';
import { MatDialog, MatDatepickerInputEvent } from '@angular/material';
import { AddFilesComponent } from 'src/app/dialogs/add-files/add-files.component';

import * as _moment from 'moment';
import {MomentDateAdapter} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import { GenerateKeyComponent } from 'src/app/dialogs/generate-key/generate-key.component';

import { Router } from '@angular/router';

/**
 * variable para obtneer el dia
 */
const moment = _moment;

/**
 * Fomato del date picker 
 */
export const MY_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'LL',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};
@Component({
  selector: 'app-chatbot', 
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.css'],
  providers: 
  [
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
})


export class ChatbotComponent implements OnInit {
 

  /**
   * @param date es el parametro con el cual obtenemos la fecha del datepicker ´date´
  */
  date = new FormControl(moment());
  
  /**
   * @param formChat form del chat cuenta con el atributo message
   */
  formChat:FormGroup;
  
  /**
   *  @param array_messages arreglo que contiene en el todos los mensajes enviados en esa conversacion con el chatbot
   */
  array_messages: Message[]=[];

  /**
   * @param currentUser es el id del usuario actual del uso del sistema
   */
  currentUser:String ="";
  
  /**
   * @param user es el usuario actual del sistema este valor cuenta con todos los atributos de la clase usuario
   */
  user:User = JSON.parse(localStorage.getItem("user"))

  
  /**
   * Constructuor de la clase
   * @param formbuilder contructor base de un form
   * @param chabtot es el servicio con el cual podemos interactuar con el chatbot
   * @param dialog es el parametro que nos permite hacer uso de los dialog en esta clase
   */
  constructor(
    private formbuilder : FormBuilder,
    private chabtot: ChatbotService,
    public dialog : MatDialog,
    private router: Router,
  ) {
    this.formChat = this.formbuilder.group({
      message : [''],
    })
   }

   /**
    * Metodo que se ejecuta cuando se crea la ventana
    */
  ngOnInit() {
    this.currentUser=this.user.id;

  }
  /**
   * Metodo para enviar mensaje al bot por parte del usuario
   */
  sendMessage(){
    let value = this.formChat.get("message").value
    let mensajeUsuario:Message = new Message (value, this.user.id, this.user.username) ;
    this.chabtot.converse(mensajeUsuario.content).then(responseBot=>{
      if("¿Qué día sera el examen?"==responseBot.content){
      //  console.log("el dia") 
        responseBot.dateCondition=true;
      }
      this.array_messages.push(mensajeUsuario)    
      this.array_messages.push(responseBot)    
      

    })
    this.formChat.reset();
  }
  /**
   * Metodo para enviar un mensaje al bot por medio de un parametro, no usa el valor obtenido del form
   * @param data mensaje a enviar por parte del usuario 
   * @event addEvent se ejecuta exclusivamente despues de la funcion addEvent
   */
  sendMessageBot(data){
    let value = data
    let mensajeUsuario:Message = new Message (value, this.user.id, this.user.username) ;
    this.chabtot.converse(mensajeUsuario.content).then(responseBot=>{
      if("¿Qué día sera el examen?"==responseBot.content){
      //  console.log("el dia") 
        responseBot.dateCondition=true;
      }
      this.array_messages.push(mensajeUsuario)    
      this.array_messages.push(responseBot)    

    })
    this.formChat.reset();
  }
  /**
   * Metodo para abrir un dialog en este caso es el de añadir un archivo
   */
  openDialogAddFile(){
    const dialogRef = this.dialog.open(AddFilesComponent);
    dialogRef.afterClosed().subscribe(response=>{  
      
    })
  }
  /**
   * Metodo para obtener la fecha de un calendario 
   * @param data fecha obtenida 
   * @param event datepicker del cual se obtiene dicha fecha. 
   */
  addEvent(data: Message, event: MatDatepickerInputEvent<Date>) {
    // console.log("evento date picker")
    data.dateActivate=true
    let temp:string =`${event.value}`
    let dias = temp.split(" ")[0]
    let mes:string = temp.split(" ")[1].toString()
    let dia = temp.split(" ")[2]
    let año = temp.split(" ")[3]
    
    switch(mes){
      case "Jan": {
        mes="Enero"
        break;
      }
      case "Feb": {
        mes="Febrero"
        break;
      }
      case "Mar": {
        mes="Marzo"
        break;
      }
      case "Apr": {
        mes="Abril"
        break;
      }
      case "May": {
        mes="Mayo"
        break;
      }
      case "Jun": {
        mes="Junio"
        break;
      }
      case "Jul": {
        mes="Julio"
        break;
      }
      case "Aug": {
        mes="Agosto"
        break;
      }
      case "Sep": {
        mes="Septiembre"
        break;
      }
      case "Oct": {
        mes="Octubre"
        
        break;
      }
      case "Nov": {
        mes="Noviembre"
        break;
      }
      case "Dec": {
        mes="Diciembre"
        break;
      }
      default:
        break;
    }
    let value = mes+" "+dia+ " del "+ año;
    // let mesageBot:Message = new Message (value, "bot", "bot");
    // this.array_messages.push(mesageBot) 
    this.sendMessageBot(value)
  }
/**
   * Metodo para abrir un dialog en este caso es el de generar una key para el profesor
   */
  generateKeyProfesor(){
    const dialogRef = this.dialog.open(GenerateKeyComponent);
    dialogRef.afterClosed().subscribe(response=>{      
    })
  }

  //para retornar al menu principal
  menuP(){
    this.router.navigateByUrl("Menu");
  } 

}
