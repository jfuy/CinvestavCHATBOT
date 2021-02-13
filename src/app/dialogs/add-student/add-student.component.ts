import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { Grade, Group } from 'src/app/components/users-lessons/users-lessons.component';
import { User } from 'src/app/models/User.model';
import { MatTableDataSource, MatPaginator, MatSort, MAT_DIALOG_DATA } from '@angular/material';
import { APIService } from 'src/app/services/api/api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SelectionModel } from '@angular/cdk/collections';
import { group } from '@angular/animations';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css']
})
export class AddStudentComponent implements OnInit {


  formStudent:FormGroup;

  selection = new SelectionModel<any>(true, []);
/**
 * Arreglo de estudiantes
 */
  arrayStudents:Array<User>=[];  
  arrayStudentsT: Array<User>;
  

  /**
   * variable que indica si ya se busco un estudiante 
   */
  estudiantes: Boolean =false;
  
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  /**
   * columnas de la tabla
   */
  displayedColumns: string[] = ['select','id', 'name','grade', 'group'];
  
  /**
   * tabla con los datos de los estudiantes
   */
  dataSource: MatTableDataSource<User>;
 

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
   * Propiedad que indica el grupo al que pertenece el estudiante
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
   * 
   * @param api Conexion a la base de datos
   * @param formBuilder Constructor clasico de un form 
   * @param data informacion que viene del que invoco al dialog 
   */
  constructor(
    private api: APIService,
    public formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public  data:any, 
  ) {
    this.formStudent = this.formBuilder.group({
      grade:['', [Validators.required]],
      group: ['', [Validators.required]],

    });

   }

   //inicialmente se listan los usuarios dependiendo el grado y grupo seleccionado, llenando la tabla que se muesra
   //y validando que solo se muestren alumnos
  ngOnInit() {
    if (this.data.group) {
      this.formStudent.get('group').setValue(this.data.group)
      
    }
    if(this.data.grade){
      this.formStudent.get('grade').setValue(this.data.grade)

    }

    if (this.formStudent.valid) {
      
      this.api.getUsersNotLesson().subscribe(response=>{
        this.estudiantes=true;

        this.arrayStudentsT = response as Array<User>;
        
        for (let index = 0; index < this.arrayStudentsT.length; index++) {
           if(this.arrayStudentsT[index].type==="Alumno"){
            this.arrayStudents.push(this.arrayStudentsT[index]);
           }
        }
      
          this.dataSource = new MatTableDataSource(this.arrayStudents);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
  
      });
    }

  }

  /**
   * Funcion para bucar un valor en la tabla 
   * @param filterValue Valor a filtrar en la busqueda
   */
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  /*añadir student*/ 
  check(){
    let studentsArray = [];

    if(this.dataSource!=undefined || this.dataSource!=null){
      this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => { 
          if(this.selection.isSelected(row)){
            let studentTmp = {
              id_user: row.id,
              grade: this.data.grade,
              group: this.data.group,
            };
            studentsArray.push(studentTmp);
          }
      });
    }
    return studentsArray;
  }
  /**
   * Función que compureba si todo ha sido seleccionado en una pagina
   */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /**
   * Función para seleccionar
   */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => { this.selection.select(row);
    });
  }
  /**
   * Funcion para remover las filas seleccionadas
   */
  async removeSelectedRows() {
    this.selection.selected.forEach(item => {
      let index: number = this.arrayStudents.findIndex(d => d === item);
      // console.log(this.arrayStudents.findIndex(d => d === item));
      let temp:any = this.arrayStudents.find(d => d === item)
      // console.log(temp)
      
      this.api.deleteLessonIdUser(temp.id_user).subscribe(response=>{
        this.arrayStudents.splice(index,1)
        this.dataSource = new MatTableDataSource<User>(this.arrayStudents);
      })

    });
    this.selection = new SelectionModel<User>(true, []);
  }
}
