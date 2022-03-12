import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './app.register.component.html',
})
export class AppRegisterComponent {

  constructor(private httpClient:HttpClient,private router:Router) { }

  registerUrl: string = 'https://localhost:44350/api/User/Register';
  isAuth: boolean;
  invalidLogin: boolean;

  register(form: NgForm) {
    const credentials = JSON.stringify(form.value);
    this.httpClient.post(this.registerUrl, credentials, {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    }).subscribe(response => {
      const token = (<any>response).token;
      localStorage.setItem('jwt', token);
      this.invalidLogin = false;
      this.router.navigate(['/lgn']);
    }, err => {
      this.invalidLogin = true;
    })
  }
}
