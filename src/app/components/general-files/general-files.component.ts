import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FirebaseService } from '../../services/firebase/firebase.service';
import { GeneralFile } from 'src/app/models/GeneralFile.model';
import { MatPaginator, MatSort, MatTableDataSource, MatDialog, MatSnackBar } from '@angular/material';


@Component({
  selector: 'app-general-files',
  templateUrl: './general-files.component.html',
  styleUrls: ['./general-files.component.css'],
  providers: [MatSnackBar]
})
export class GeneralFilesComponent implements OnInit {

  displayedColumns: string[] = ['link', 'name','origen', 'fecha', 'info'];

  formFile: FormGroup;
  public nombreArchivo = "";
  generalFiles: GeneralFile[];
  dataSource: MatTableDataSource<GeneralFile>;


  //email de quien va a enviar los archivos
  public nameUserAct = JSON.parse(localStorage.getItem("user")).email;

  public datosFormulario = new FormData();//obtener y almacenar todos los valores del input (los archivos q selecciona el user)

  @ViewChildren(MatPaginator, ) paginator:QueryList<MatPaginator>;
  @ViewChildren(MatSort)  sort:QueryList< MatSort>;


  constructor (
    private router: Router,
    public dialog : MatDialog,
    private formbuilder : FormBuilder,
    private firebaseStorage : FirebaseService,
    private snackBar: MatSnackBar,
  ) {

    this.formFile = this.formbuilder.group({
      archivo : ['',[Validators.required]],
      correoDestinity : ['',[Validators.required]],
      description : [''],
    });
 }


  //Evento que se gatilla cuando el input de tipo archivo cambia
  public cambioArchivo(event) {
    //verifica si hay archivos seleccionados
    if (event.target.files.length > 0) {
      //recorre la lista de archivos
      for (let i = 0; i < event.target.files.length; i++) {
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
        this.openCustomerSnackBar();
      }   
    }    
  }

  //lista los mensajes y archivos que han sido recibidos por el usuario que actualmente esta activo en el sistema, obteniendo además
  //los metadatos del archivo como informacion del remitente, fecha, descripción
  listar2(){
 
    let nGFilesTmp: GeneralFile[]=[];

      this.firebaseStorage.referenciaCloudStorageList2(this.nameUserAct).then((response)=>{
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
        this.dataSource = new MatTableDataSource(this.generalFiles);
        this.dataSource.paginator = this.paginator.first;
        this.dataSource.sort = this.sort.first;
      });
  }

  //inicialmente listamos los archivos que han llegado invocando a la funcion de listar2
  ngOnInit() { 
    this.listar2();
   }

   //para regresar al menu principal
  menuP(){
    this.router.navigateByUrl("Menu");
  }
//para mostrar un mensaje emergente notificando que un archivo ha sido enviado correctamente.
  openCustomerSnackBar(){
    return this.snackBar.openFromComponent(CustomSnackBarComponentSendGeneralFile, {duration: 4000});
  }

}


@Component({
  selector: 'custom-snackbar',
  template: `<span style='color: #00ff4ce3;'><strong>Archivo Enviado Correctamente</strong></span>`
})
export class CustomSnackBarComponentSendGeneralFile{}