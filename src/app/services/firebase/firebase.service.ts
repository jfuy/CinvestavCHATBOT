import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { User } from 'src/app/models/User.model';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFireDatabase } from '@angular/fire/database';
import { Reminder } from 'src/app/models/Reminder.model';
import { RemindersComponent } from 'src/app/components/reminders/reminders.component';


@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  /**
   * Constructor de la clase
   * @param firestore clase de firebase para guardar datos en firestore
   * @param database clase de firebase en angular para guardar datos en database fire
   */
  constructor( 
    private firestore: AngularFirestore, //firebase para usar firestore
    private database: AngularFireDatabase,
    private storage: AngularFireStorage,

    ) {

     }


  public listar(){
  
    var storageRef = this.storage.storage.refFromURL("/fotos").listAll().then(response=>{
      // console.log(response);
    });
    // var storageRef = this.storage.ref("").child('images');
    
  }

     /**
      * Funcion para guardar un archivo en firebase
      * @param file arhivo a guardar de firebase este es un json de tipo file
      */
    addFiles(file):Boolean{
      this.database.database.ref("Material").push(file).then(response=>{
        return true;
      }, error=>{
        return false;
      })
      return false;
    }

    addKeyInBD(data):Boolean{
      // this.database.database.ref("KeysProfesor").push(data).then(response=>{
      //   return true;
      // }, error=>{
      //   return false;
      // });
      // return false;
      this.database.database.ref(`KeyProfesor/${data.nameProfesor}`).set({keyG: data.keyG}); 
      return true;
    }

    /**
      * Funcion para guardar pruebas de calificaciones
      */
     addScore(data,usuario):Boolean{
      this.database.database.ref(`Calificaciones/${data.nombreMateria}/${usuario}`).push(data).then(response=>{
        return true;
      }, error=>{
        return false;
      })
      return false;
    }

    /**
     * Funcion para actualizar calificaciones
     */
    updateScore(data,usuario) { 
      //return this.firestore.collection("usuarios/").snapshotChanges();
      this.database.database.ref(`Calificaciones/${data.nombreMateria}/${usuario}`).set({bi1:data.bi1, bi2:data.bi2, bi3:data.bi3, bi4:data.bi4
      ,bi5:data.bi5,id:data.id, nombreMateria:data.nombreMateria, subject_id:data.subject_id, user_id:data.user_id}); 
      // this.database.database.ref(`Recordatorios/${id}`).set({delet:remin.delet,publication:remin.publication,reminder:remin.reminder}); 

   } 

  //funcion para obtener todas las calificaciones
   getScores() { 
    return this.firestore.collection("Calificaciones/").snapshotChanges();
  }


    /**
     * Función para guardar un usuario e firebase se hizo se probo pero actualmente los usuarios ya no se almacenan ahi  
     * @param data objeto tipo usuario  
     */
    addUser(data:User) {
    let id;
    return new Promise<any>((resolve, reject) =>{
        this.firestore
            .collection("usuarios/")
            .add(data)
            .then(res => {
              // console.log(res.id)
              id=res.id;
            }, err => reject(err));
        
    });
  }
  /**
   * Función para obtener los usuarios de firebase
   */
  getUsers() { 
    return this.firestore.collection("usuarios/").snapshotChanges();
  }
 
 /**
  * Función para actualizar un usuario esta funcion esta en proceso 
  * @param id id del usuario a actualizar 
  * @param user usuario a actualizar 
  */ 
  updateUser(id, user:User) {
    return this.firestore
        .collection("usuarios/")
        .doc(id)
        .set(
          { type: user.type }, 
          { merge: true }); 
 }

   viewExamens(){
    this.database.database.ref('Examenes/').once('value').then((snapshot) => {
      const value = snapshot.val();
      if (value !== null) {
          var t = "";
          for (var val in value) {
            t = t + value[val].clase;
          }
      }
    });
   } 

   addReminder(data){
    this.database.database.ref(`Recordatorios/`).push(data);
   }

   updateReminderActivated(id, remin) {
    // this.firestore.collection("Recordatorios/id").doc(id).set({ delet: remin.delet },{ merge: true }); 
    this.database.database.ref(`Recordatorios/${id}`).set({delet:remin.delet,publication:remin.publication,reminder:remin.reminder}); 
 }

  //Tarea para subir y guardar el archivo
  public tareaCloudStorage(carpeta:string, nombreArchivo: string, datos: any) {
    return this.storage.upload(`${carpeta}/`+nombreArchivo, datos);
  }

  /////
  /////
  /////

  //METODO 2 PARA GUARDAR
  public guarda2(userEmailDestinity:string, userEmailOrigin:string, dateInfo:string, description:string, datos: any){

    var metadata = {
      customMetadata: {
        'remitente': userEmailOrigin,
        'fecha': dateInfo,
        'description': description,
      }
    };    
    return this.storage.ref("Files/").child(`${userEmailDestinity}/` + datos.name).put(datos, metadata);
  }

  //METODO 2 PARA LISTAR
  public referenciaCloudStorageList2(userEmail:string) {
    return this.storage.storage.ref(`Files/${userEmail}/`).listAll();
  }


  /////
  /////
  /////


  //Referencia del archivo
  public referenciaCloudStorage(carpeta:string, nombreArchivo: string) {
    return this.storage.ref(`${carpeta}/`+nombreArchivo);
  }


  public referenciaCloudStorageList(carpeta:string) {
    //return this.storage.ref(`${carpeta}/`);
    return this.storage.storage.ref(`${carpeta}/`).listAll();
  }



}
