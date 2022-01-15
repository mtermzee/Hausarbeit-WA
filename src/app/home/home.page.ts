import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/authentication/auth.service';
import firebase from "firebase/compat/app";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  user: firebase.User;

  constructor(private router:Router, private authService: AuthService) {}

  ngOnInit() {
    return this.authService.getUserState()
      .subscribe(user => {
        this.user =  user;
      })
  }

}
