import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/User.model';

@Injectable({
  providedIn: 'root'
})
export class AdminGuardianGuard implements CanActivate {
  /**
   * 
   * @param router parametro que permite moverte entre rutas
   */
  constructor(private router: Router) {}

 
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    let user:User = JSON.parse(localStorage.getItem("user"))
    if(user.type=='Administrador'){
      // console.log("Entre")
      return true
    }
    this.router.navigateByUrl("notFound");
    return false
  } 
  
}
