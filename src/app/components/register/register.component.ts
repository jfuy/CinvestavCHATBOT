import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { APIService } from 'src/app/services/api/api.service';
import { MatDialog, MatDialogRef, MatSnackBar } from '@angular/material';
import { AlertComponent } from '../alert/alert.component';
import { User } from 'src/app/models/User.model';
import { FirebaseService } from 'src/app/services/firebase/firebase.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [MatSnackBar]
})


export class RegisterComponent implements OnInit {
  
  /**
   * @param formRegister es el register 
   */
  formRegister : FormGroup; 

  /**
   * @param submitted es la variable que indica si existe algun error en el formulario de existir su valor se vuelve True
   */
  submitted=false; 
  
  /**
   * @param roles son los roles existentes para el registro
   */
  rols: string[] = ['Profesor', 'Alumno']; 
  
  /**
   * @param alertComponentRef componente de alerta todavia no esta terminado
   */
  alertComponentRef:MatDialogRef<AlertComponent>; 

  /**
   * Constructor de la clase del registro en el se instancian las variables importadas
   * @param api varibale que permite la conexion con la api alojada en adonis
   * @param formbuilder constructor del formRegister, esta variable solo se encarga de eso
   * @param router es la variable que permite movernos entre vistas de la aplicación
   * @param dialog es la alerta esta variable permite mostrar las alertas todavia esta en desarrollo esa parte
   * @param firabse variable para conectar con el servicio de firebase
   */
  constructor(
    private api: APIService,
    private formbuilder : FormBuilder,
    private router: Router,
    private dialog: MatDialog,
    private firabse: FirebaseService,
    private snackBar: MatSnackBar,
  ) { 
    this.formRegister = this.formbuilder.group({
      username : ['',Validators.required],
      lastNameFather : ['', Validators.required],
      lastNameMother : ['',Validators.required],
      yearsold:['',Validators.required],
      password : ['',Validators.required],
      rol: ['',Validators.required],
      email : ['',Validators.required],
      confirmPassword: ['',Validators.required],
    })
  }
  

  /**
   * Inicializacion del controlador
   */
  ngOnInit() {


  }

  /**
   * Metodo para mandar a llamar a la alerta no esta terminado 
   */
  openAddFileDialog() {
    this.alertComponentRef = this.dialog.open(AlertComponent,{
      hasBackdrop: false,
      autoFocus: true
    });
  }


  /**
   * Metodo que permite obtener el form para validar errores
   * @returns retorna los controls del form del register
   */
  get f() { return this.formRegister.controls; }


  /**
   * Permite realizar el registro del usuario
   */
  register(){
    let user: User;
    user={
      username:this.formRegister.get("username").value+" "+this.formRegister.get("lastNameFather").value+" "+this.formRegister.get("lastNameMother").value,
      password:this.formRegister.get("password").value,
      email: this.formRegister.get("email").value,
      age: this.formRegister.get("yearsold").value,
      type:this.formRegister.get("rol").value,
      activated:null,
      id:null
    }
    this.api.register(user).subscribe(response =>{
      localStorage.setItem("user", JSON.stringify(user))
      // localStorage.setItem("token", response.token) 
      this.router.navigateByUrl("Menu")
    }, error=>{
      console.log(error);
    })
   
    
  }

  /**
   * Envia y compruba que los campos del form esten bien
   * @returns retorna un elemento vacio para terminar la funcion 
   */
  sendRegister(){
    
    this.submitted=true;
    if(this.formRegister.invalid || (this.formRegister.get("password").value != this.formRegister.get("confirmPassword").value ) ){
      // console.log(this.formRegister.value)
      this.openCustomerSnackBarLesson();
      return;
    }

    this.register();
    this.submitted=false;

    
  }
  /**
   * Funcion que redirige al login
   */
  Login(){
    this.router.navigateByUrl("Login")
  }

  /**
   * Funcion para probar el guardado de datos en firebase
   */
  testFirebase(){
    let user:User = new User ("Alex",12,"luis_pesar@hotmail.com","Alejandro1998a","Alumno","",false)
    let id;
    this.firabse.getUsers().subscribe(response=>{
      for (let index = 0; index < response.length; index++) {
        const element = response[index];
        // console.log(element.payload.doc.data())
        // console.log(element.payload.doc.id)
        id=element.payload.doc.id
        // user=element.payload.doc.data
        
      }
    })
    this.firabse.updateUser("4nbQ5UTx4YWWI17w2gH2", user) 
  }

  //para ir directamente a la ventana del login
  loginP(){
    this.router.navigateByUrl("");
  } 

  //para mostrar un mensaje emergente de que algo salio mal al capturar los datos y registrarse
  openCustomerSnackBarLesson(){
    return this.snackBar.openFromComponent(CustomSnackBarComponentRegister, {duration: 4000});
  }

}


@Component({
  selector: 'custom-snackbar',
  template: `<span style='color: #ee0303dc;'><strong>Error al Registrar, Favor de Verificar la Información Ingresada</strong></span>`
})
export class CustomSnackBarComponentRegister{}