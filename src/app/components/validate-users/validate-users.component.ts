import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { Router } from '@angular/router';
import { User } from 'src/app/models/User.model';
import { APIService } from 'src/app/services/api/api.service';

@Component({
  selector: 'app-validate-users',
  templateUrl: './validate-users.component.html',
  styleUrls: ['./validate-users.component.css']
})
export class ValidateUsersComponent implements OnInit {

  /**
   * Columnas a mostrar de los usuarios
   */
  displayedColumns: string[] = ['id', 'name', 'email','activated', 'type'];
  /**
   * tabla con los valores de los usuarios
   */
  dataSource: MatTableDataSource<User>;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  /**
   * 
   * @param api variable de la conexion con la base de datos
   */
  constructor(
    private api: APIService,
    private router: Router,
  ) {

  }
  /**
   * Funcion que se ejecuta cuando se crea la ventana
   */

  ngOnInit() {
    let array: Array<User>;
    this.api.getUsersNotActivated().subscribe(response=>{
      array=response as Array<User>
      // console.log(array)
      this.dataSource = new MatTableDataSource(array);
      this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    });

    
  }
  /**
   * Funcion que cambia el valor de activado de un usuario
   * @param activated varible del nuevo estado de activado del usuario
   * @param user usuario al cual se le asiganta el nuevo valor
   */
  changeActivated(activated:Boolean, user : User){
    user.activated=activated;
    this.api.updateUser(user).subscribe(response=>{
      // console.log(response)
    })
  }
  /**
   * Funcion que cambia el tipo de usuario
   * @param type tipo de usuario a asignar
   * @param user usuario al que se le asignara el tipo de usuario
   */
  changeType(type:String, user : User){
    
    user.type=type;
    this.api.updateUser(user).subscribe(response=>{
      // console.log(response)
    })
  }

  /**
   * Funcion para filtrar datos en la tabla
   * @param filterValue Filtro para la busqueda
   */
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
//metodo para regresar al menu principal
  menuP(){
    this.router.navigateByUrl("Menu");
  } 

}
