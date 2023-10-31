import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor(private router : Router) {}
 isAuth:boolean
  ngOnInit() {

    let token = localStorage.getItem('token');
    if(token){
      this.isAuth = true
    }
    else{
      this.isAuth = false
    }
  }
  logout(){
    localStorage.setItem('token','')
    window.location.reload();
    this.router.navigateByUrl('/');
  }
  studyset(){

  }
  createfolder(){

  }
  createclass(){

  }
}
