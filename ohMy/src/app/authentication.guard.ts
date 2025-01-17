import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { AuthguardServiceService } from './authguard-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {
  constructor(
    private router:Router,
    private activatedRoute:ActivatedRoute,
    private authGuard : AuthguardServiceService
  ){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {


      if(!this.authGuard.getToken()){
        Swal.fire({
          title: 'You must login to access this page !!!',
          text: "do you want to login ?",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, go to login page'
        }).then((result) => {
          if (result.isConfirmed) {
            this.router.navigateByUrl("/login")
          } else {
            this.router.navigateByUrl("/")           
          }
        })
        return false;
      } else {
        return true
      }
    
  }
  
}
