import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs'
import { API, API2 } from 'src/app/app-config'
import { User } from 'src/app/models/User.model';
import { Subject } from 'src/app/models/Subject.model';
@Injectable({
  providedIn: 'root'
})

/**
 * Clase de la conexion de la api 
 */
export class APIService {

  /**
   * variable con la ruta de la api usada actualmente
   */
  api: string = API
  /**
   * varible de la api de prueba ya no se usa solo  para ciertas pruebas
   */
  api2: string = API2

  /**
   * Constructor de la clase del api service
   * @param http variable para comunicacion con la base de datos por medio de http
   */
  constructor(private http: HttpClient) { }

  /**
   * Función para mandar a registrar un usuario usando la api  
   * @param params recibe como parametro un objeto tipo usuario
   */
    register(params: User ):Observable<any>{
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          
        })
      }

      return this.http.post(`${this.api}users/`, params, httpOptions)
    }
    /**
     * Función de prueba para comprobar la conexion con la api se ejecuta una sola vez
     */
    getHello():Observable<any>{
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          
        })
      }
      return this.http.get(`${this.api2}`,httpOptions)

    }
    /**
     * Función para iniciar sesion 
     * @param params un json con los atributos email y password
     */
    login(params):Observable<any>{
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          
        })
      }
      return this.http.post(`${this.api}login/`, params, httpOptions);
    }

    
    /**
     * Función para obtener a todos los usuarios que no han sido activados
     */
    getUsersNotActivated(){
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          
        })
      }
      return this.http.get(`${this.api}users/`, httpOptions);
    }
    /**
     * Función para obtener a todo usuario que no este activado y que no este es una clase
     */
    getUsersActivatedNotInLesson(){
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          
        })
      }
      return this.http.get(`${this.api}users/`, httpOptions);
    }

    /**Añadir estudiante en lesson */
    addUserInLesson(param){
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        })
      }
      return this.http.post(`${this.api}lessons/`, param, httpOptions);
    }

    /**
     * Función para obtener todos los usuarios en una clase
     * @param params recibe un json con atributos grade y group los cuales son de los usuarios
     */
    getUsersInLesson(params){
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          
        }),
        params:params
      }
      return this.http.get(`${this.api}lessonsGroupGrade/`, httpOptions);
    }
    /**
     * Función para obtener todas las materias de un grado 
     * @param params recibe un json con atributo grade el cual es el grado en formato string
     */
    getSubjectsGrade(params){
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          
        }),
        params:params
      }
      return this.http.get(`${this.api}subjectsGrade/`, httpOptions);
    }
    /**
     * Funcion para obtneer a todos los usuarios que no esten en una clase
     */
    getUsersNotLesson(){
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          
        }),
      }
      return this.http.get(`${this.api}usersNotLesson/`, httpOptions);
    }

    /**
     * Función para actualizar un usuario
     * @param user objeto usuario con el parametro que desees cambiar de dicho usuario 
     */
    updateUser(user:User){
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          
        })
      }
      return this.http.put(`${this.api}users/${user.id}`,user ,httpOptions);
    }

    /**
     * Función para actualziar una materia 
     * @param subject objeto subject con el nuevo valor a poner al objeto
     */
    updateSubject(subject:Subject){
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          
        })
      }
      return this.http.put(`${this.api}subjects/${subject.id}`,subject ,httpOptions);
    }

    /**
     * Funcion para añadir nuevas materias
     * @param subject Objeto subject a añadir 
     */
    addSubject(subject:Subject){
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        })
      }
      return this.http.post(`${this.api}subjects/`,subject ,httpOptions);
    }

    /**
     * Función para eliminar un usuario de una clase
     * @param id id del usuario a eliminar
     */
    deleteLessonIdUser(id){
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        })
      }
      return this.http.delete(`${this.api}lessonsIdUser/${id}`,httpOptions);
    }

    getSubjectsByProfesor(id){
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        })
      }
      return this.http.get(`${this.api}subjectsByProfesor/${id}`,httpOptions);
    }

    getProfesors(){
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        })
      }
      return this.http.get(`${this.api}getProfesors/`,httpOptions);
    }

    getSubjectsByGradeProfesor(params){
        const httpOptions = {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
            
          }),
          params:params
        }
      return this.http.get(`${this.api}getSubjectsByGradeProfesor/`,httpOptions);
    }

    getScoresByAlumn(params){
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          
        }),
        params:params
      }
    return this.http.get(`${this.api}getScoresByAlumn/`,httpOptions);
    }

    addScore(params){
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        })
      }
      return this.http.post(`${this.api}scores/`, params, httpOptions);
    }

    updateScore(params){
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          
        })
      }
      return this.http.put(`${this.api}scores/${params.id}`,params ,httpOptions);
    }

    showLesson(id){
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        })
      }
      return this.http.get(`${this.api}subjects/${id}`,httpOptions);
    }

}
