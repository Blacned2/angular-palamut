import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AppComponent } from '../app.component';
import { AppMainComponent } from './app.main.component';

@Component({
  selector: 'app-topbar',
  templateUrl: './app.topbar.component.html'
})
export class AppTopBarComponent implements OnInit{

  name:string = '';
  constructor(public app: AppComponent, public appMain: AppMainComponent,private jwtHelper:JwtHelperService,private router:Router) {}
  ngOnInit(): void {
    this.name = localStorage.getItem("name");
  }

    isUserAuthenticated(){
      const token:string = localStorage.getItem("jwt");
      if(token && !this.jwtHelper.isTokenExpired(token)){
        return true;
      }else{
        return false;
      }
    }  
  
    public logOut = () =>{
      localStorage.removeItem("jwt");
      localStorage.removeItem("name");
      this.router.navigate(['/login'])
    }
}
