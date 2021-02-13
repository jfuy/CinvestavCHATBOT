export class Subject {
  /**
   * Constructor de la clase
   * @param name Nombre de la calse
   * @param grade Grado de la clase 
   * @param profesor_id Id del profesor
   * @param deleted Indica el estado de la clase 
   * @param id Id respectivo de la clase
   */
    constructor(public name: String, public grade: String, public profesor_id:number, public deleted:boolean, public id) {}

   
    
  }
  