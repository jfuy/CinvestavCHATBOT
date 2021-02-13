export class Message {
  /**
   * Condicion para seleccionar un dia 
   */
    public dateCondition=false;

    /**
     * 
     * Condicion para activar la selección de un dia
     *  
     */
    public dateActivate=false;
    /**
     * Constructor del mensaje
     * @param content contenido del mensaje
     * @param idUser id del usuario que manda el mensaje
     * @param name nombre del que manda el mensaje
     */
    constructor(public content: String, public idUser: String, public name:String) {}

    /**
     * metodo para obtener el valor de la condicion del calendario
     */
    public getDateCondition() {
      return this.dateCondition;
    }
    /**
     * metodo para cambiar el valor de la condicion del calendario
     */
    public setDateCondition(data:boolean){
      this.dateCondition=data;
    }
  }
  