import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Message, MessageService } from 'primeng/api';
import { UserModel } from '../models/user';

@Component({
  selector: 'app-login',
  styles: [`
        :host ::ng-deep .p-button {
            min-width: 8em;
        }

		:host ::ng-deep .p-message {
			margin-left: .25em;
		}
    `],
    styleUrls:['./app.login.component.scss'],
  providers: [],
  templateUrl: './app.login.component.html',
})
export class AppLoginComponent {

  constructor(private httpClient: HttpClient, private router: Router) {

  }

  item: UserModel = { userName: null, password: null };
  loginUrl: string = 'https://localhost:44350/api/User/Login';
  invalidLogin: boolean;

  login(data: UserModel) {
    this.httpClient.post(this.loginUrl, data, {
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
