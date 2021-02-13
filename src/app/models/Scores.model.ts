export class Scores {
    /**
     * Constructor de la clase
     * @param user_id Nombre de la calse
     * @param subject_id Grado de la clase 
     * @param b1 Grado de la clase 
     * @param b2 Grado de la clase 
     * @param b3 Grado de la clase 
     * @param b4 Grado de la clase 
     * @param b5 Grado de la clase 
     * @param deleted Indica el estado de la clase 
     * @param id Id respectivo de la clase
     */
      constructor(public user_id: number, public subject_id: number, public b1:number, public b2:number, public b3:number, public b4:number, public b5:number, public deleted:boolean, public id) {}
  
     
      
    }
     