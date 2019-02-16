import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataStorageService } from '../shared/data-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router, private dataStorageService : DataStorageService) { }

  user = {
    email : '',
    password : ''
  }

  invalidLogin = false;

  ngOnInit() {
  }

  async login() {
    this.user.email = this.user.email.toLowerCase();
    this.invalidLogin = false;
    try {
      await this.dataStorageService.login(this.user);
      let userDetails = this.dataStorageService.getUserDetails();
      if(userDetails.role === 'Admin')
        this.router.navigate(['super']);
      else 
        this.router.navigate(['main']);
    } catch(err) {
      this.invalidLogin = true;
    }
    

  }

}
