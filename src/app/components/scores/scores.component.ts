import { Component, OnInit, ViewChild, ViewChildren, QueryList } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, MatDialog, MatSnackBar } from '@angular/material';
import { APIService } from 'src/app/services/api/api.service';
import { User } from 'src/app/models/User.model';
import { Subject } from 'src/app/models/Subject.model';
import { FirebaseService } from 'src/app/services/firebase/firebase.service';
import { SelectionModel } from '@angular/cdk/collections';
import { ScoreUserComponent } from 'src/app/dialogs/score-user/score-user.component';
import { HtmlParser } from '@angular/compiler';
import { Router } from '@angular/router';

/**
 * Interace para mantener dos valores uno a mostrar y otro el valor que relamente tendra
 */
export interface Grade{
  /**
   * value es el valor real que tendra 
   */
  value: any,
  /**
   * es el valor a mostrar de a interface
   */
  viewValue: any
}
/**
 * Interace para mantener dos valores uno a mostrar y otro el valor que relamente tendra
 */
export interface Group{
  /**
   * value es el valor real que tendra 
   */
  value: any,
  /**
   * es el valor a mostrar de a interface
   */
  viewValue: any
}

export interface Materia{
  /**
   * value es el valor real que tendra 
   */
  value: any,
  /**
   * es el valor a mostrar de a interface
   */
  viewValue: any
}


@Component({
  selector: 'app-scores',
  templateUrl: './scores.component.html',
  styleUrls: ['./scores.component.css'],
  providers: [MatSnackBar]
})
export class ScoresComponent implements OnInit {
 /**
   * Arraeglo que contiene a todos los alumnos buscados
   */
  arrayStudents: Array<User>;

 /**
   * Arraglo que contiene a todos los grados y materias de un profesor
   */
  arraySubjects: Array<Subject>;
 /**
   * Arreglo que contiene a todos las materias de cierto profesor y grado
   */
  arrayMaterias: Array<Subject>;

  /**
   * Arreglo que contiene todas las materias de los alumnos
   */
  arrayLessons: Array<Subject>;
  
  /**
   * Indica si ya se buscaron materias  
   */
  materias: Boolean =false;
  /**
   * Indica si ya se buscaron estudiantes anteriormente
   */
  estudiantes: Boolean =false;
  
  /**
   * Arreglo que tiene todos los alumnos seleccionados
   */
  selection = new SelectionModel<any>(true, []);


  /**
   * Columnas a mostrar para los alumnos
   */
  displayedColumns: string[] = ['id', 'name','grade', 'group', 'calificar'];
  
  /**
   * Tabla donde estan los datos de los usuarios
   */
  dataSource: MatTableDataSource<User>;

  /**
   * Columnas a mostrar para las materias
   */
  displayedColumnsLessons: string[] = ['name','grade', 'deleted'];
  
  
  /**
   * Tabla donde estan los datos de los usuarios
   */
  dataSourceLessons: MatTableDataSource<Subject>;

  /**
   * Contiene el valor del grado seleccionado
   */
  gradeSelected:String

  /**
   * Contiene el valor del grupo seleccionado
   */
  groupSelected:String

  status;
  /**
   * Contiene el valor del grupo seleccionado
   */
  materiaSelected:String
  /**
   *  Propiedad que sirve para tener los grados de los alumnos
   * @param value es el valor que tendra como tal la seleccion 
   * @param viewValue es el valor que que se muestra para la seleccion 
   * 
   */
 retornaGrados(){

  this.user= JSON.parse(localStorage.getItem("user"));

  // console.log(this.user.id);
  
   this.api.getSubjectsByProfesor(this.user.id).subscribe(response=>{
          this.arraySubjects=response as Array<Subject>  
          // console.log(this.arraySubjects);
          let grades: Grade[] = [];
          for (let i = 0; i < this.arraySubjects.length; i++) {
            var grado = this.arraySubjects[i].grade;
            grades.push({value: grado, viewValue: grado});
          }
          this.grades = grades;
  });

 }

  subjects:Materia[];
  grades:Grade[];
  statusBtn:string="hidden";

  /**
   * Propiedad que indica 
   * @param value es el valor que tendra como tal la seleccion 
   * @param viewValue es el valor que que se muestra para la seleccion 
   * 
   */
  groups:Group[] = [
    {value: 'A', viewValue:"A"},
    {value: 'B', viewValue:"B"},
    {value: 'C', viewValue:"C"},
    {value: 'D', viewValue:"D"},
    {value: 'E', viewValue:"E"},
    {value: 'F', viewValue:"F"}
  ];

    /**
   * @param user usuario actual del sistema
   */
  user:User;
  

  @ViewChildren(MatPaginator, ) paginator:QueryList<MatPaginator>;
  @ViewChildren(MatSort)  sort:QueryList< MatSort>;

  /**
   * Constructor de la clase 
   * @param api es la variable de la api que conecta con la base de datos
   * @param dialog variable para hacer llamada a un dialog externo
   */
  constructor(
    private api: APIService,
    public firebase: FirebaseService,
    public dialog : MatDialog,
    private router: Router,
    private snackBar: MatSnackBar,
  ) {
    this.user= JSON.parse(localStorage.getItem("user"));    
  }

  ngOnInit() {    
    this.retornaGrados();
  }
  /**
   * Metodo que sirve para buscar un estudiante haciendo una llamada a la base de datos por la 
   * API este metodo no recibe parametros porque saca los valores de los campos seleccionador de el grado y el grupo
   */
  searchStudents(){ 
    
    if (this.gradeSelected){

      let parms={
        "grade":this.gradeSelected,
        "profesor_id":this.user.id
      }

    //llamamos a las materias que da el profesor en dicho grado para llenar la lista
    this.api.getSubjectsByGradeProfesor(parms).subscribe(response=>{
      this.arrayMaterias=response as Array<Subject>  

      let subjects: Materia[] = [];
      for (let i = 0; i < this.arrayMaterias.length; i++) {
        subjects.push({value: this.arrayMaterias[i].id, viewValue: this.arrayMaterias[i].name});
      }
      this.subjects = subjects;
    });

      let params={
        grade:this.gradeSelected
      }

      this.api.getSubjectsByProfesor(params).subscribe(response=>{
        this.materias=true
        this.arrayLessons=response as Array<Subject>

        this.dataSourceLessons = new MatTableDataSource(this.arrayLessons);
        this.dataSourceLessons.paginator = this.paginator.first;
        this.dataSourceLessons.sort = this.sort.first;
      });
    }

    if (this.gradeSelected != null && this.groupSelected != null) {
      let params={
        "grade":this.gradeSelected,
	      "group":this.groupSelected
      }
      
      this.api.getUsersInLesson(params).subscribe(response=>{
        this.estudiantes=true;

        this.arrayStudents=response as Array<User>

          this.dataSource = new MatTableDataSource(this.arrayStudents);
          this.dataSource.paginator = this.paginator.last;
          this.dataSource.sort = this.sort.last;
        });
    }

  }


  //ver la info de un usuario dado click en su boton de calificar, ademas el metodo permite modificar o bien registrar
  //una nueva calificacion en el sistema, tanto a nivel mysql como a firebase
  setScores(row){
    const dialogRef = this.dialog.open(ScoreUserComponent,{
      data: {
        subject_id:this.materiaSelected,
        user_id:row.id_user,
        nombreAlumno: row.username,
      }
    });
    dialogRef.afterClosed().subscribe(response=>{
        if(response){
          let params={
            id:response.idScore,
            user_id: row.id_user,
            subject_id: this.materiaSelected,
            bi1: response.bim1,
            bi2: response.bim2,
            bi3: response.bim3,
            bi4: response.bim4,
            bi5: response.bim5,
          }    

          let data={
            id:response.idScore,
            user_id: row.id_user,
            subject_id: this.materiaSelected,
            nombreMateria: null,
            bi1: response.bim1,
            bi2: response.bim2,
            bi3: response.bim3,
            bi4: response.bim4,
            bi5: response.bim5,
          };

          if(response.exits=="insert"){
            //añade MySQL
            this.api.addScore(params).subscribe(response=>{ });
            this.api.showLesson(this.materiaSelected).subscribe(response=>{
              data.nombreMateria = (response as Subject).name;
              //añade FIREBASE
              this.firebase.updateScore(data, row.username);

              this.openCustomerSnackBar();
            });
          }

          if(response.exits=="update"){   
            //modifica MySQL
            this.api.updateScore(params).subscribe(response=>{ });
            this.api.showLesson(this.materiaSelected).subscribe(response=>{
              data.nombreMateria = (response as Subject).name;
              //modifica FIREBASE
              this.firebase.updateScore(data, row.username);
              this.openCustomerSnackBar();  
            });
          }        

        } 
    })
    
  }


//metodo para regresar al menu principal
  menuP(){
    this.router.navigateByUrl("Menu");
  } 

  //metodo para mostrar una notificacion emergente de que las calificaciones han sido modificadas o añadidas correctamente
  openCustomerSnackBar(){
    return this.snackBar.openFromComponent(CustomSnackBarComponentAddScore, {duration: 4000});
  }

}


@Component({
  selector: 'custom-snackbar',
  template: `<span style='color: #00ff4ce3;'><strong>Calificaciones Añadidas/Modificadas Correctamente</strong></span>`
})
export class CustomSnackBarComponentAddScore{}