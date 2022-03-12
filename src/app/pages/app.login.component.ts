import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './app.login.component.html',
})
export class AppLoginComponent {

  constructor(private httpClient: HttpClient, private router: Router) {

  }

  loginUrl: string = 'https://localhost:44350/api/User/Login';
  invalidLogin: boolean;

  login(form: NgForm) {
    const credentials = JSON.stringify(form.value);
    this.httpClient.post(this.loginUrl, credentials, {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    }).subscribe(response => {
      const token = (<any>response).token;
      localStorage.setItem('jwt', token);
      this.invalidLogin = false;
      this.router.navigate(['/']);
    }, err => {
      this.invalidLogin = true;
    });
  }
}
