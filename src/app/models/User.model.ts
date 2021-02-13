/**
 * Clase usuario la cual modela al usuario de la aplicación
 * 
 */
export class User{
  /**
   * @param age es la edad del usuario
   * @param email es el email del usuario
   * @param password es la contraseña del usuario 
   * @param type es el tipo del usuario
   * @param activated es el tipo del usuario
   */
   
    constructor (
      public username:String,
      public age:Number,
      public email:String, 
      public password:String,
      public type:String,
      public id:String,
      public activated: Boolean
    ){

    }
  }