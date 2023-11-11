import { Injectable } from '@angular/core';
import {  CanActivate, Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { AccountService } from './account.service';

@Injectable({
  providedIn: 'root',
})
export class HomeGuard implements CanActivate {


  connection!:boolean;

  constructor( private  authService: AccountService,
    private router: Router) {}


  canActivate(): boolean {
    if(!this.authService.isAuthenticated()){
        localStorage.setItem('token','')
       
    }
    return true;
   
  }
  
}
