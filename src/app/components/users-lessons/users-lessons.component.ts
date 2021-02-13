import { Component, OnInit, ViewChild, ViewChildren, QueryList } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, MatDialog, MatSnackBar } from '@angular/material';
import { APIService } from 'src/app/services/api/api.service';
import { User } from 'src/app/models/User.model';
import { Subject } from 'src/app/models/Subject.model';
import { AddSubjectComponent } from 'src/app/dialogs/add-subject/add-subject.component';
import { AddStudentComponent } from 'src/app/dialogs/add-student/add-student.component';
import { SelectionModel } from '@angular/cdk/collections';
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

@Component({
  selector: 'app-users-lessons',
  templateUrl: './users-lessons.component.html',
  styleUrls: ['./users-lessons.component.css'],
  providers: [MatSnackBar]
})
export class UsersLessonsComponent implements OnInit {
  /**
   * Arraeglo que contiene a todos los alumnos buscados
   */
  arrayStudents: Array<User>;
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
  displayedColumns: string[] = ['select','id', 'name','grade', 'group','delet'];
  
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

  /**
   * Contiene el valor del grupo seleccionado
   */
  profeSelected:String
  /**
   *  Propiedad que sirve para tener los grados de los alumnos
   * @param value es el valor que tendra como tal la seleccion 
   * @param viewValue es el valor que que se muestra para la seleccion 
   * 
   */
  grades:Grade[] = [
    {value: '1', viewValue:"1°"},
    {value: '2', viewValue:"2°"},
    {value: '3', viewValue:"3°"},
    {value: '4', viewValue:"4°"},
    {value: '5', viewValue:"5°"},
    {value: '6', viewValue:"6°"}
  ];

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

  

  @ViewChildren(MatPaginator, ) paginator:QueryList<MatPaginator>;
  @ViewChildren(MatSort)  sort:QueryList< MatSort>;

  /**
   * Constructor de la clase 
   * @param api es la variable de la api que conecta con la base de datos
   * @param dialog variable para hacer llamada a un dialog externo
   */
  constructor(
    private api: APIService,
    public dialog : MatDialog,
    private router: Router,
    private snackBar: MatSnackBar,

  ) {

  }
  ngOnInit() {    
  }
  /**
   * Metodo que sirve para buscar un estudiante haciendo una llamada a la base de datos por la 
   * API este metodo no recive parametros porque saca los valores de los campos seleccionador de el grado y el grupo
   */
  searchStudents(){ 
    if (this.gradeSelected){
      let params={
        grade:this.gradeSelected
      }

      this.api.getSubjectsGrade(params).subscribe(response=>{
        this.materias=true
        this.arrayLessons=response as Array<Subject>
        // console.log(this.arrayLessons)
        // console.log("users")
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
 

  /**
   * Filtro para busqueda en la tabla de alumnos
   * @param filterValue Valor a filtrar en la tabla de alumnos
   */
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  /**
   * Metodo que elimina una materia 
   * @param row Matetria qu recibe como parametro para eliminar
   */
  deleted(row:Subject){
    row.deleted=true;
    this.api.updateSubject(row).subscribe(response=>{
      // console.log(response);
      let params={
        grade:this.gradeSelected
      }
  
      this.api.getSubjectsGrade(params).subscribe(response=>{
        this.materias=true
        this.arrayLessons=response as Array<Subject>
        this.dataSourceLessons = new MatTableDataSource(this.arrayLessons);
        this.dataSourceLessons.paginator = this.paginator.first;
        this.dataSourceLessons.sort = this.sort.first;
      });
    })
    
  }
  /**
   * Metodo que filtra la busqueda de materias
   * @param filterValue Valor a filtrar para la busqueda de materias
   */
  applyFilterLesson(filterValue: string) {
    this.dataSourceLessons.filter = filterValue.trim().toLowerCase();

    if (this.dataSourceLessons.paginator) {
      this.dataSourceLessons.paginator.firstPage();
    }
  }

  /**
   * Metodo para añadir una nueva materia abre un dialog
   */
  addSubject(){
    const dialogRef = this.dialog.open(AddSubjectComponent,{
      data: {
        grade: this.gradeSelected,
        group:this.groupSelected,
      }
    });
    dialogRef.afterClosed().subscribe(response=>{
        if(response){
          let subject:Subject= new Subject(response.materia, response.grado, response.profesor, false, 1 );
          this.api.addSubject(subject).subscribe(response=>{
            if(response){
              let params={ 
                grade:this.gradeSelected
              }
          
              this.api.getSubjectsGrade(params).subscribe(response=>{
                this.materias=true
                this.arrayLessons=response as Array<any>
                /**MOSTRAR NOTIFICACION */
                this.openCustomerSnackBarLesson();

                this.dataSourceLessons = new MatTableDataSource(this.arrayLessons);
                this.dataSourceLessons.paginator = this.paginator.first;
                this.dataSourceLessons.sort = this.sort.first;
              });
            }
          })
          
        } 
           
    })
  }

  /**
   * Metodo para añadir un estudiante 
   */

  addStudent(){
    const dialogRef = this.dialog.open(AddStudentComponent,{
      data: {
        grade: this.gradeSelected,
        group:this.groupSelected
      }
    });
    dialogRef.afterClosed().subscribe(responseDialog=>{
        if(responseDialog){

          for (let index = 0; index < responseDialog.length; index++) {
            this.api.addUserInLesson(responseDialog[index]).subscribe(response=>{
              if(response){
                let params={
                  "grade":this.gradeSelected,
                  "group":this.groupSelected
                }
  
                this.api.getUsersInLesson(params).subscribe(response=>{
                  this.estudiantes=true;
          
                  this.arrayStudents=response as Array<User>

                  this.openCustomerSnackBarStudent();
          
                    this.dataSource = new MatTableDataSource(this.arrayStudents);
                    this.dataSource.paginator = this.paginator.last;
                    this.dataSource.sort = this.sort.last;
            
                });
              }
            })
          }


        }    
    })
  }
  /**
   * Metodo para eliminar un estudiante
   * @param row Estudiante a eliminar
   */
  deleteStudent(row){
    this.api.deleteLessonIdUser(row.id_user).subscribe(response=>{
      // this.dataSource.data.find(row).
    })
  }
  /**
   * Metodo para comprobar si todos en una pagina han sido seleccionados
   */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }
  /**
   * Metodo para seleccionar 
   */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }
  /**
   * Metood para eliminar a todo seleccionado
   */
  async removeSelectedRows() {
    this.selection.selected.forEach(item => {
      let index: number = this.arrayStudents.findIndex(d => d === item);
      //console.log(this.arrayStudents.findIndex(d => d === item));
      let temp:any = this.arrayStudents.find(d => d === item)
      //console.log(temp)
      
      this.api.deleteLessonIdUser(temp.id_user).subscribe(response=>{
        this.arrayStudents.splice(index,1)
        this.dataSource = new MatTableDataSource<User>(this.arrayStudents);
      })

    });
    this.selection = new SelectionModel<User>(true, []);
  }

  //metodo para regresar al menu principal
  menuP(){
    this.router.navigateByUrl("Menu");
  } 

  //para mostrar un cuadro emergente con el mensaje de que una materia ha sido agregada correctamente
  openCustomerSnackBarLesson(){
    return this.snackBar.openFromComponent(CustomSnackBarComponentUserLessonsAddLesson, {duration: 4000});
  }
  //para mostrar un cuadro emergente con el mensaje de que un alumno ha sido agregado correctamente
  openCustomerSnackBarStudent(){
    return this.snackBar.openFromComponent(CustomSnackBarComponentUserLessonsAddStudent, {duration: 4000});
  }

}


@Component({
  selector: 'custom-snackbar',
  template: `<span style='color: #00ff4ce3;'><strong>Materia Añadida Correctamente</strong></span>`
})
export class CustomSnackBarComponentUserLessonsAddLesson{}

@Component({
  selector: 'custom-snackbar',
  template: `<span style='color: #00ff4ce3;'><strong>Estudiante Agregado Correctamente</strong></span>`
})
export class CustomSnackBarComponentUserLessonsAddStudent{}