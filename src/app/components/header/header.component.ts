import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  /**
   * @param existUser variable boleana que comprueba si exsite un usuario o no
   */
  existUser:boolean=false;
  
  /**
   * 
   * @param router varibale para manejar las rutas del header 
   */
  constructor(
    private router: Router,

  ) { }
  
  /**
   * Metodo que se ejcuta cuando se contruye el nav bar 
   */
  ngOnInit() {
    if(localStorage.getItem("user")!=undefined)
      this.existUser=true;
    else
      this.existUser=false;
  }
  /**
   * Metodo para cerrar sesion 
   */
  exitAcount(){
    this.router.navigateByUrl("");
  }

  /**
   * Metodo para ir a la ventana de registrase
   */
  register(){
    this.router.navigateByUrl("Register")
  }
  /**
   * Metodo para ir a la ventana de iniciar sesion
   */
  login(){
    this.router.navigateByUrl("Login")
  }

  //metodo para regresar al menu principal
  principal(){
    this.router.navigateByUrl("Menu");
  }
}
