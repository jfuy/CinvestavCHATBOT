import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment"
import { ApiAiClient } from 'api-ai-javascript/es6/ApiAiClient'; 
import { Message } from 'src/app/models/Message.model';
import { User } from 'src/app/models/User.model';
@Injectable({
  providedIn: 'root'
})
/**
 * Clase de la conexion con el chatbot
 */
export class ChatbotService {
  /**
   * variable que solo sirve de lecturar hacia el token de dialogflow
   */
  readonly token = environment.dialogflow.cinvestavChatbot;
  /**
   * variable que solo sirve d electura hacia el tken de dialogflow del profesor
   */
  readonly tokenProfesor = environment.dialogflow.cinvestavChatbotProfesor;
  /**
   * cliente que se conectara usando el token respectivo
   */
  client;

  /**
   * usuario actual del sistema
   */
  user:User=JSON.parse(localStorage.getItem("user"))
  /**
   * Constuctor de la clase
   */
  constructor() {
  }
  /**
   * Función para enviar mensajes al chatbot
   * @param msg mensaje a enviar es de tipo string y solo es el contenido del mensaje
   */
   converse(msg: String) {
    if(this.user.type=="Profesor"){
      this.client = new ApiAiClient({ accessToken: this.tokenProfesor });
    }
    if(this.user.type=="Alumno"){

      this.client = new ApiAiClient({ accessToken: this.token });
    }
    //mandas mensaje y esperas respuesta
    return this.client.textRequest(msg)
               .then(res => {
                  const speech = res.result.fulfillment.speech;
                  const botMessage = new Message(speech, 'bot','bot' );
                  return botMessage
               });

  }

  /**
   * Función de prueba para probar con el chatbot
   */
  talk(){
    if(this.user.type=="Profesor"){
      this.client = new ApiAiClient({ accessToken: this.tokenProfesor });
    }
    if(this.user.type=="Alumno"){

      this.client = new ApiAiClient({ accessToken: this.token });
    }
    this.client.textRequest("hola").then(response=>{
      // console.log(response.result.fulfillment.speech);
    })

  }


}
