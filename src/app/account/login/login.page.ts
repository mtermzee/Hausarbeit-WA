import { Component, ContentChild, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/authentication/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class LoginPage implements OnInit, OnDestroy {
  type;
  showPassword = false
  authError: any;

  private subscriptions = new Subscription();

  constructor(private router:Router, private authService: AuthService) { }

  ngOnInit() {
    this.type = 'password';
    const sub = this.authService.eventAuthError$.subscribe(data =>{
      this.authError = data;
    });
    this.subscriptions.add(sub);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
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
