import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/authentication/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})



export class SignupPage implements OnInit {
  pass;
  showPassword = false;
  loading: boolean;
  editable: boolean;
  authError: any;


  constructor(private router:Router, private authService: AuthService) { }

  ngOnInit() {
    this.pass = 'password';
    this.authService.eventAuthError$.subscribe(data =>{
      this.authError = data;
    })
  }

  // show or hide Password
  toggleShow() {
      if (this.pass === 'password') {
        this.pass = 'text';
        this.showPassword = true;
      } else {
        this.pass = 'password';
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
