import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/authentication/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {
  authError: any;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.eventAuthError$.subscribe(data =>{
      this.authError = data;
    });
  }

  onSumbit(form){
    console.log(form.value.email);
    this.authService.RestPassword(form.value.email);
  }
}
