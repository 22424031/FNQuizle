import { Injectable } from '@angular/core';
import {  CanActivate, Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { AccountService } from './account.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {


  connection!:boolean;

  constructor( private  authService: AccountService,
    private router: Router) {}


  canActivate(): boolean {
    if(!this.authService.isAuthenticated()){
        this.router.navigateByUrl('auth/login'); 
        return false;
    }
    return true
  }
  


  
}
