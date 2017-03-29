import { Component } from '@angular/core';
import { ProductService } from './services/product.service';
import { Router } from '@angular/router';
import { AuthService } from './providers/auth.service';
import { Userinfo } from './userinfo';
import { LoginService } from './services/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers:[ProductService, LoginService]
})

export class AppComponent {

  userInfos: Userinfo[];
  private isLoggedIn: Boolean;
  private fullname: String;
  private email: String;
  
  constructor(public authService: AuthService, private router: Router, private loginService: LoginService) {
    this.authService.af.auth.subscribe(
      (auth) => {
        if (auth == null) {
      
          this.isLoggedIn = false;
          this.fullname = '';
          this.email = '';
          this.router.navigate(['']);
        } else {
          this.isLoggedIn = true;
          this.fullname = auth.google.displayName;
          this.email = auth.google.email;

          var newUser = {
            fullname: this.fullname,
            email: this.email
          }
          console.log(newUser);
          this.loginService.addUser(newUser)
            .subscribe(userinfo => {
                this.userInfos.push(userinfo);
            });
          this.router.navigate(['product']);
        }
      }
    );
  }
}