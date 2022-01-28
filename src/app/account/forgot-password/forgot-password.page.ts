import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/authentication/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {
  authError: any;
   loading: boolean;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.eventAuthError$.subscribe(data =>{
      this.authError = data;
    });
  }

  onSumbit(form){
    console.log(form.value.email);
    this.loading = true;
    this.authService.RestPassword(form.value.email);
  }
}
