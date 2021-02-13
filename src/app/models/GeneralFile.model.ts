export class GeneralFile {
    /**
     * Constructor para un archivo
     * @param clase clase a la que pertenece el archivo
     * @param grado grado al que pertenece el archivo 
     * @param grupo grupo al que pertenece el archivo
     * @param definicion definicion del archivo
     * @param url la url del archivo
     */
      constructor(public nameFile: String, public remitente: String, public timeSend:String, public description:String, public url: String) {}

      setNameFile(nF:string){
          this.nameFile = nF;
      }

      setRemitente(r:string){
          this.remitente = r;
      }

      setTimeSend(tS: string){
          this.timeSend = tS;
      }

      setDescription(d:string){
          this.description = d;
      }

      setUrl(u:string){
          this.url = u;
      }

    }
    