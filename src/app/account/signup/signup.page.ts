import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/authentication/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})

export class SignupPage implements OnInit, OnDestroy {
  type;
  showPassword = false;
  loading: boolean;
  editable: boolean;
  authError: any;

  private subscriptions = new Subscription();

  constructor(private router:Router, private authService: AuthService) { }

  ngOnInit() {
    this.type = 'password';
    const sub = this.authService.eventAuthError$.subscribe(data => {
      this.authError = data;
    });
    this.subscriptions.add(sub);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  // show or hide Password
  toggleShow() {
      if (this.type === 'password') {
        this.type = 'text';
        this.showPassword = true;
      } else {
        this.type = 'password';
        this.showPassword = false;
      }
  }

  // Create User auth
  createUser(form){
      this.loading = true;
      this.authService.createUser(form.value);
  }

  // check if box is checked
  toggleEditable(event){
      this.editable = false;
      if ( event.target.checked ) {
            this.editable = true;
        }
  }
  
}
