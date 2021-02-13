import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { APIService } from 'src/app/services/api/api.service';
import { Grade } from 'src/app/components/users-lessons/users-lessons.component';
import { FirebaseService } from 'src/app/services/firebase/firebase.service';
import { Scores } from 'src/app/models/Scores.model';

@Component({
  selector: 'app-add-subject',
  templateUrl: './score-user.component.html',
  styleUrls: ['./score-user.component.css']
})
export class ScoreUserComponent implements OnInit {

 /** Form con los datos del archivo a subir*/
 formFile:FormGroup;

 /** Variable que comprueba que ya se envio*/
 enviado:Boolean;

/**Arraeglo que contiene a todos los grados y materias de un profesor*/
elementScores: Scores;
 

  profes:Grade[];
  nombreAlumno:any;

 /**
  * 
  * @param formBuilder Constructor clasico de un form 
  * @param dialogRef Referencia para tener acceso al dialog
  * @param data información recibida del componente que invoco al dialog 
  */
 constructor(
   private api: APIService,
   public formBuilder: FormBuilder,
   public firebase: FirebaseService,
   public dialogRef : MatDialogRef<ScoreUserComponent>,
   @Inject(MAT_DIALOG_DATA) public data:any ) { 

    this.formFile = this.formBuilder.group({
      idScore:[0,],
      exits:["insert", ],
      bim1:[0, [Validators.required]],
      bim2:[0, [Validators.required]],
      bim3:[0, [Validators.required]],
      bim4:[0, [Validators.required]],
      bim5:[0, [Validators.required]],
    });
    this.nombreAlumno = data.nombreAlumno;
 
    let params={
      subject_id:data.subject_id,
      user_id: data.user_id,
    }
    //consultar calificaciones anteriores
    this.api.getScoresByAlumn(params).subscribe(response=>{
          this.elementScores=response as Scores  

          if(response.toString()!=""){

            this.formFile = this.formBuilder.group({
              idScore:[this.elementScores[0].id,],
              exits:["update", ],
              bim1:[this.elementScores[0].bi1, [Validators.required]],
              bim2:[this.elementScores[0].bi2, [Validators.required]],
              bim3:[this.elementScores[0].bi3, [Validators.required]],
              bim4:[this.elementScores[0].bi4, [Validators.required]],
              bim5:[this.elementScores[0].bi5, [Validators.required]],
            });
          }    
          
    });

 }
 /**
  * Funcion para cerrar el dialog
  */
 onClickNo():void{
   this.dialogRef.close()
 }
 ngOnInit() {
   //this.retornaProfes();
 }

 //agrega las calificaciones a firebase
 addScoresToFirebase(){
  this.data=this.formFile.value;
  let response:Boolean = this.firebase.addFiles(this.data);
 }

}
