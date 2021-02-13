import { Component, OnInit, Injector, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog} from "@angular/material";
import { AlertComponent } from '../alert/alert.component';
import { FirebaseService } from '../../services/firebase/firebase.service';
import { GeneralFile } from 'src/app/models/GeneralFile.model';

@Component({
  selector: 'app-xyz',
  templateUrl: './xyz.component.html',
  styleUrls: ['./xyz.component.css']
})

export class XyzComponent implements OnInit {

  formFile: FormGroup;
  public nombreArchivo = "";
  public porcentaje = 0;

  //usuario que enviara el archivo
  public nameUserAct = JSON.parse(localStorage.getItem("user")).email;


  public datosFormulario = new FormData();//obtener y almacenar todos los valores del input (los archivos q selecciona el user)

  constructor(
    public dialog : MatDialog,
    private formbuilder : FormBuilder,
    private firebaseStorage : FirebaseService
  ) { 
    this.formFile = this.formbuilder.group({
      archivo : [''],
      correoDestinity : ['',[Validators.required]],
      description : ['',[Validators.required]],
    });

  }

  openDialog():void{
    const dialogRef = this.dialog.open(AlertComponent);
    dialogRef.afterClosed().subscribe(response=>{
      console.log(response);
    })
  }
  
  //Evento que se gatilla cuando el input de tipo archivo cambia
  public cambioArchivo(event) {
    //verifica si hay archivos seleccionados
    if (event.target.files.length > 0) {
      //recorre la lista de archivos
      for (let i = 0; i < event.target.files.length; i++) {
        // this.mensajeArchivo = `Archivo preparado: ${event.target.files[i].name}`;
        this.nombreArchivo = event.target.files[i].name;
        this.datosFormulario.delete('archivo');//elimina el archivo 
        this.datosFormulario.append('archivo', event.target.files[i], event.target.files[i].name)//añade los archivos creados
      }
    } else {
      // this.mensajeArchivo = 'No hay un archivo seleccionado';
    }
  }

  //Sube el archivo a Cloud Storage
  public subirArchivo() {
    //obtenemos datos del formulario y los ligamos
    let archivo = this.datosFormulario.get('archivo');
    let correoDestinity =this.formFile.get('correoDestinity').value;
    let description =this.formFile.get('description').value;

    if(correoDestinity===""){
        alert("Favor de ingresar el correo electronico del destinatario. \n(Debe ser el mismo correo que su destinatatio registro en la plataforma)");
    }else{
      if(archivo ===null){
        alert("Seleccione el archivo a enviar!");
      }else{    
        //obtenemos fecha y hora del sistema actualmente
        let fecha = new Date();
        let fechaStr = fecha.getDate()+"/"+(fecha.getMonth()+1)+"/"+fecha.getFullYear()+" - "+fecha.getHours()+":"+fecha.getMinutes();
        this.firebaseStorage.guarda2(correoDestinity.toString(), this.nameUserAct, fechaStr, description, archivo);
      }
      
    }
    
  }


///////////SEGUNDO LISTA
  listar2(){

    //este sera el correo original o actual aqui usamos el destino como prueba para ver los archivos
    let correoDestinity =this.formFile.get('correoDestinity').value;    
    let nGFilesTmp: GeneralFile[]=[];

      this.firebaseStorage.referenciaCloudStorageList2(correoDestinity.toString()).then((response)=>{
        response.items.forEach(function(ite) {         

            let nGF = new GeneralFile("","","","","");
            ite.getMetadata().then(r=>{

              nGF.setNameFile(ite.name);
              nGF.setRemitente(r["customMetadata"].remitente);
              nGF.setTimeSend(r["customMetadata"].fecha);
              nGF.setDescription(r["customMetadata"].description);

              ite.getDownloadURL().then((r)=>{
                nGF.setUrl(r);
              });

            });
            nGFilesTmp.push(nGF);
        });
        
      }).then(()=>{
        this.generalFiles = nGFilesTmp;
      });

  }

  generalFiles: GeneralFile[];

  ngOnInit() {
  }

}
