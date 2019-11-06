import { DataStorageService } from "../shared/data-storage.service";
import { Router } from "@angular/router";
import { Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";

@Component({
  selector: "app-create-form-data",
  templateUrl: "./create-form-data.component.html",
  styleUrls: ["./create-form-data.component.css"]
})
export class CreateFormDataComponent {
  formData;
  campaignsInfo = [];
  isLoading = false;
  displayedColumns: string[] = [
    "campaignId",
    "sendCount",
    "or",
    "ctor",
    "ctr",
    "targetCategory",
    "allCategories"
  ];
  dataSource;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(
    private dataStorageService: DataStorageService,
    private router: Router
  ) {
    this.getFormData();
    this.getCampaignsInfo();
  }
  async getFormData() {
    try {
      this.isLoading = true;
      this.formData = JSON.stringify(
        await this.dataStorageService.getFormData(),
        null,
        2
      );
      this.isLoading = false;
    } catch (err) {
      alert(err.message);
      this.router.navigate(["/main"]);
    }
  }

  async getCampaignsInfo() {
    try {
      this.isLoading = true;
      this.campaignsInfo = await this.dataStorageService.getAllCampaignInfo();
      console.log(this.campaignsInfo);
      this.refreshDataSource();
      this.isLoading = false;
    } catch (err) {
      alert(err.message);
      this.router.navigate(["/main"]);
    }
  }

  ngAfterViewInit() {
    this.refreshDataSource();
  }

  refreshDataSource() {
    this.dataSource = new MatTableDataSource(this.campaignsInfo);
    this.dataSource.paginator = this.paginator;
  }
  async update() {
    try {
      let data = JSON.parse(this.formData);
      this.isLoading = true;
      await this.dataStorageService.updateFormData(data);
      this.isLoading = false;
      alert("data updated");
    } catch (e) {
      this.isLoading = false;
      alert(" JSON parsing error, please check the data again.");
    }
  }

  async updateInfo() {
    try {
      this.isLoading = true;
      await this.dataStorageService.updateCampaignInfoData({
        campaignInfos: this.campaignsInfo
      });
      this.isLoading = false;
      alert("data updated");
    } catch (e) {
      this.isLoading = false;
      alert("Some error");
    }
  }
}
