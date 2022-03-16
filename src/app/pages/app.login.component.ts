import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FacebookLoginProvider, SocialAuthService, SocialUser } from 'angularx-social-login';
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
  styleUrls: ['./app.login.component.scss'],
  providers: [],
  templateUrl: './app.login.component.html',
})
export class AppLoginComponent implements OnInit {


  item: UserModel = { userName: null, password: null };
  loginUrl: string = 'https://localhost:44350/api/User/Login';
  invalidLogin: boolean;
  socialUser!: SocialUser;
  
  constructor(private httpClient: HttpClient,
    private router: Router,
    private socialAuthService: SocialAuthService,
  ) { }


  ngOnInit(): void {
    this.socialAuthService.authState.subscribe((user) => {
      this.socialUser = user;
      this.invalidLogin = user == null;
      if (!this.invalidLogin) {
        const token = (<any>user).token;
        localStorage.setItem('jwt', token);
        this.router.navigate(['/']);
      } else {
        this.router.navigate(['/login']);
      }
    })
  }



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

  loginWithFacebook() {
    this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }


}
