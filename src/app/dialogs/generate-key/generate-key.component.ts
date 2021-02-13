import { Component, OnInit, Inject } from '@angular/core';
import { APIService } from 'src/app/services/api/api.service';
import { FirebaseService } from 'src/app/services/firebase/firebase.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';


@Component({
  selector: 'app-generate-key',
  templateUrl: './generate-key.component.html',
  styleUrls: ['./generate-key.component.css']
})
export class GenerateKeyComponent implements OnInit {

  nameUser:any;
  keyG:any;
  /**
   * form con los datos del archivo
   */
  formFile:FormGroup;


  constructor(private api: APIService,
    public formBuilder: FormBuilder,
    public dialogRef : MatDialogRef<GenerateKeyComponent>,
    public firebase: FirebaseService,
    @Inject(MAT_DIALOG_DATA) public message:string) {
      
      this.nameUser = JSON.parse(localStorage.getItem("user")).username;
      this.keyG = this.generateAleatoryKey();
      this.addKeyBD(this.nameUser, this.keyG);
    }

  ngOnInit() {

  }

  //agregar la key generada a la base de datos de firebase para su posterior validacion por las firebase functions
  addKeyBD(nameProfesor, keyGenerate){
    var data={
      nameProfesor: nameProfesor,
      keyG: keyGenerate,
    };
    let response:Boolean = this.firebase.addKeyInBD(data);
  }

  //metodo para generar una nueva key, se genera por medio de aleatorios y un array alfanumerico.
  generateAleatoryKey(): string{

    var caracteres = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z",
  "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z",
"1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];

    
    let numAleatorio=0;
    let cad = "";
    for (let i = 0; i < 16; i++) {
      numAleatorio = Math.floor(Math.random() * (62 - 0)) + 0;
      cad = cad+caracteres[numAleatorio];
    }
    
    return cad;
  }

    /**
   * Funcion para cerrar el dialog 
   */
  okClick():void{
    this.dialogRef.close()
  }

}
