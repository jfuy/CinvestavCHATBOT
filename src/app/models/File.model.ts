export class File {
  /**
   * Constructor para un archivo
   * @param clase clase a la que pertenece el archivo
   * @param grado grado al que pertenece el archivo 
   * @param grupo grupo al que pertenece el archivo
   * @param definicion definicion del archivo
   * @param url la url del archivo
   */
    constructor(public clase: String, public grado: String, public grupo:String, public definicion:String, public url: String) {}
  }
  