import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/authentication/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
  
export class ForgotPasswordPage implements OnInit, OnDestroy {
  authError: any;
  loading: boolean;

  private subscriptions = new Subscription();

  constructor(private authService: AuthService) { }

  ngOnInit() {
    const sub = this.authService.eventAuthError$.subscribe(data =>{
      this.authError = data;
    });
    this.subscriptions.add(sub);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  onSumbit(form){
    console.log(form.value.email);
    this.loading = true;
    this.authService.RestPassword(form.value.email);
  }
}
