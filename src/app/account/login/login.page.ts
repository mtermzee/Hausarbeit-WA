import { Component, ContentChild, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/authentication/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})


export class LoginPage implements OnInit {
  type;
  showPassword = false
  authError: any;

  constructor(private router:Router, private authService: AuthService) { }

  ngOnInit() {
    this.type = 'password';
    this.authService.eventAuthError$.subscribe(data =>{
      this.authError = data;
    });
  }

  toggleShow() {
      if (this.type === 'password') {
        this.type= 'text';
        this.showPassword = true;
      } else {
        this.type = 'password';
        this.showPassword = false;
      }
  }
  
    // login with user data
    login(form){
      return this.authService.login(form.value.email, form.value.password);
    }
  
}
