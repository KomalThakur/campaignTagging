import { Component, OnInit } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-form-data',
  templateUrl: './create-form-data.component.html',
  styleUrls: ['./create-form-data.component.css']
})
export class CreateFormDataComponent{
  formData;
  isLoading = false
  constructor(private dataStorageService : DataStorageService, private router: Router) { 
    this.getFormData();
  }

  async getFormData(){
    try {
      this.isLoading  = true;
      this.formData = JSON.stringify(await this.dataStorageService.getFormData(), null, 2);
      this.isLoading  = false;
    }catch(err) {
      alert(err.message);
      this.router.navigate(["/main"]);
    }
    
  }
  async update() {
    try {
      let data = JSON.parse(this.formData)
      console.log(data);
      this.isLoading  = true;
      await this.dataStorageService.updateFormData(data);
      this.isLoading = false;
      alert("data updated");
    } catch(e) {
      this.isLoading = false;
      console.log(e);
      alert(" JSON parsing error, please check the data again.");
    }
    
  }

}
