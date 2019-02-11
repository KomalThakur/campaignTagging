import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { DataStorageService } from '../shared/data-storage.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  isButtonVisible = true;

  constructor(private activatedRoute: ActivatedRoute, private route : Router, private auth : DataStorageService) {
    if(auth.getUserDetails().role === 'Admin') {
      this.route.navigate(['/super']);
    } else {
      this.route.navigate(['dashboard'], {relativeTo:this.activatedRoute});
      this.isButtonVisible = true;
    }
    
  }

  ngOnInit() {
    this.isButtonVisible = true;
  }

  addNewCampaign() {
    this.route.navigate(['addCampaign'], {relativeTo:this.activatedRoute});
    this.isButtonVisible = false;
  }

}
