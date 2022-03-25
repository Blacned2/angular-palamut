import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FacebookLoginProvider, GoogleLoginProvider, SocialAuthService, SocialUser } from 'angularx-social-login';
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


  item: UserModel = { userName: null, email: null, password: null };
  loginUrl: string = 'https://localhost:44350/api/User/Login';
  socialLoginUrl: string = 'https://localhost:44350/api/User/SocialLogin';
  invalidLogin: boolean;
  socialUser!: SocialUser;

  constructor(private httpClient: HttpClient,
    private router: Router,
    private socialAuthService: SocialAuthService,
  ) { }


  ngOnInit(): void {

  }



  login(data: UserModel) {
    this.item = data;
    this.httpClient.post(this.loginUrl, data, {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    }).subscribe(response => {
      const token = (<any>response).token;
      localStorage.setItem('jwt', token);
      localStorage.setItem('name', this.item.userName)
      this.invalidLogin = false;
      this.router.navigate(['/']);
    }, err => {
      this.invalidLogin = true;
    });
  }


  loginWithGoogle() {
    this.socialAuthService.authState.subscribe((user) => {
      this.socialUser = user;
      this.item.userName = this.socialUser.email.length
        + this.socialUser.email.substring(0, this.socialUser.email.length / 2)
        + `palamutSocialUser/${this.socialUser.email.length}`;
      this.item.email = this.socialUser.email.toLowerCase();
      this.item.password = this.socialUser.email + this.socialUser.lastName.length + this.socialUser.email.substring(0, 2);

      this.invalidLogin = user == null;
      if (!this.invalidLogin) {
        this.httpClient.post(this.socialLoginUrl, this.item, {
          headers: new HttpHeaders({
            "Content-Type": "application/json"
          })
        }).subscribe(response => {
          console.log(this.item)
          const token = (<any>response).token;
          localStorage.setItem('name', user.firstName + ' ' + user.lastName);
          localStorage.setItem('jwt', token);
          this.router.navigate(['/']);
        }, err => {
          this.invalidLogin = true;
        })
      }
    })
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
    this.socialAuthService.refreshAuthToken(GoogleLoginProvider.PROVIDER_ID)
  }

  loginWithFacebook() {
    this.socialAuthService.authState.subscribe((user) => {
      this.socialUser = user;
      this.item.userName = this.socialUser.email.length
        + this.socialUser.email.substring(0, this.socialUser.email.length / 2)
        + `palamutSocialUser/${this.socialUser.email.length}`;
      this.item.email = this.socialUser.email.toLowerCase();
      this.item.password = this.socialUser.email + this.socialUser.lastName.length + this.socialUser.email.substring(0, 2);

      this.invalidLogin = user == null;
      if (!this.invalidLogin) {
        this.httpClient.post(this.socialLoginUrl, this.item, {
          headers: new HttpHeaders({
            "Content-Type": "application/json"
          })
        }).subscribe(response => {
          console.log(this.item)
          const token = (<any>response).token;
          localStorage.setItem('name', user.firstName + ' ' + user.lastName);
          localStorage.setItem('jwt', token);
          this.router.navigate(['/']);
        }, err => {
          this.invalidLogin = true;
        })
      }
    })
    this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID);
    this.socialAuthService.refreshAuthToken(FacebookLoginProvider.PROVIDER_ID)
  }


}
