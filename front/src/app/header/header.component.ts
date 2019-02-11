import { Component, OnInit } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  username = '';

  constructor(private dataStorageService : DataStorageService, private router : Router) {
    let userDetails = this.dataStorageService.getUserDetails();
    this.username = userDetails.name;
   }

   logout() {
     this.dataStorageService.logout();
    this.router.navigate(['login']);
   }

  ngOnInit() {
  }

}
