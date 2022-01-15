import { Component, ContentChild, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IonInput } from '@ionic/angular';
import { AuthService } from '../services/authentication/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})


export class LoginPage implements OnInit {
  pass;
  showPassword = false
  authError: any;

  constructor(private router:Router, private authService: AuthService) { }

  ngOnInit() {
    this.pass = 'password';
    this.authService.eventAuthError$.subscribe(data =>{
      this.authError = data;
    })
  }

  toggleShow() {
      if (this.pass === 'password') {
        this.pass= 'text';
        this.showPassword = true;
      } else {
        this.pass = 'password';
        this.showPassword = false;
      }
    }
  
    // login with user data
    login(form){
      return this.authService.login(form.value.email, form.value.password);
    }
}
