import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from 'src/app/models/User.model';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { APIService } from 'src/app/services/api/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lessons',
  templateUrl: './lessons.component.html',
  styleUrls: ['./lessons.component.css']
})

/**
 * Clase del componente de clases del sistema
 */
export class LessonsComponent implements OnInit {
  /**
   * es el arreglo que contiene todos los usuarios a mostrar en la tabla
   */
  array: Array<User>;
  
  /**
   * columnas con las que cuenta la tabla
   */
  displayedColumns: string[] = ['id', 'name', 'activated', ];
  
  /**
   * Tabla donde estan los datos es de tipo usuario
   */
  dataSource: MatTableDataSource<User>;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  /**
   * @param api es la api con la que contactamos con la base de datos
   */
  constructor(
    private api: APIService,
    private router: Router,
  ) {

  }

  /**
   * Funcion que se ejecuta cuando se crtea la vista en este caso hace una llamada a la base de datos por todos los usuarios no activados
   */
  ngOnInit() {
    
    this.api.getUsersNotActivated().subscribe(response=>{
      this.array=response as Array<User>
      // console.log(this.array)
      // console.log("users")
      this.dataSource = new MatTableDataSource(this.array);
      this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    });

    
  }

  /**
   * Metodo para cambiar el estatus de un usuario
   * @param activated nuevo valor el cual tendra el usuario este puede ser falso o verdadero 
   * @param user usuario al cual sera asignado el nuevo valor es de tipo usuario
   */
  changeActivated(activated:Boolean, user : User){
    user.activated=activated;
    this.api.updateUser(user).subscribe(response=>{
      // console.log(response)
    })
  }
  /**
   * Metodo para cambiar los pivilegios del usuario
   * @param type tipo de privilegios a otorgar estos pueden ser Alumno Profesor o Administrador
   * @param user Usuario al que se le otrogaran los privilegios
   */
  changeType(type:String, user : User){
    
    user.type=type;
    this.api.updateUser(user).subscribe(response=>{
      // console.log(response)
    })
  }

  /**
   * Metodo para filtrar datos de la tabla
   * @param filterValue valor por el cual filtrar los datos de la tabla
   */
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  //funcion para regresar al menu principal
  menuP(){
    this.router.navigateByUrl("Menu");
  } 

}
