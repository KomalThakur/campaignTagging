import { Component, OnInit } from "@angular/core";
import { PagerService } from "../shared/pager.service";
import { MatDialog } from "@angular/material";
import { CampaignDialogEmailComponent } from "../campaign-dialog-email/campaign-dialog-email.component";

import * as _ from "lodash";
import { DataStorageService } from "../shared/data-storage.service";
import { getLocaleDateFormat } from "@angular/common";
import { Router } from "@angular/router";
import { SearchPipe } from "../filters/search.pipe";

@Component({
  selector: "app-campaigns",
  templateUrl: "./campaigns.component.html",
  styleUrls: ["./campaigns.component.css"]
})
export class CampaignsComponent implements OnInit {
  // pager object
  pager: any = {};

  // paged items
  pagedItems: any[];

  selectedTab = "tab1";
  sortByElements = ["Creation Date", "Deployment Date"];

  campaignsCommon = [];
  campaignsUser = [];
  campaignCommonDup = [];
  campaignUserdup = [];

  searchText;

  constructor(
    private pagerService: PagerService,
    public dialog: MatDialog,
    private dataStorageService: DataStorageService,
    private searchFilter : SearchPipe
  ) {}

  ngOnInit() {
    this.getAllData();
  }

  async getAllData() {
    try {
      this.campaignsCommon = await this.dataStorageService.getAllCampaigns();
      this.campaignsUser = await this.dataStorageService.getCampaignsByUser();
      this.campaignCommonDup = JSON.parse(JSON.stringify(this.campaignsCommon));
      this.campaignUserdup = JSON.parse(JSON.stringify(this.campaignsUser));
      this.setPage(1);
    } catch(err) {
      alert(err.message);
    }
   
  }

  setPage(page: number,) {


    
    console.log("selected tab ", this.selectedTab);

    if (this.selectedTab === "tab1") {
      this.pager = this.pagerService.getPager(
        this.campaignsCommon.length,
        page,
        5
      );
      this.pagedItems = this.campaignsCommon.slice(
        this.pager.startIndex,
        this.pager.endIndex + 1
      );
    } else {
      this.pager = this.pagerService.getPager(
        this.campaignsUser.length,
        page,
        5
      );
      this.pagedItems = this.campaignsUser.slice(
        this.pager.startIndex,
        this.pager.endIndex + 1
      );
    }
  }
  openCampaignModal(campaign) {
    const dialogRef = this.dialog.open(CampaignDialogEmailComponent, {
      width: "1000px",
      data: campaign
    });
  }

  onFilterChange(event) {
    if (event.target.id === "tab1") {
      this.selectedTab = "tab1";
    } else {
      this.selectedTab = "tab2";
    }

    this.setPage(1);
  }

  sortBy(event) {
    console.log(event);
    if (this.selectedTab === "tab1") {
      if (event.target.value === "Creation Date") {
        this.campaignsCommon = _.orderBy(
          this.campaignsCommon,
          ["createTimestamp"],
          ["desc"]
        );
      } else if (event.target.value === "Deployment Date") {
        console.log("sort by deployment date");
        this.campaignsCommon = _.orderBy(
          this.campaignsCommon,
          ["deploymentDate"],
          ["desc"]
        );
        console.log(this.campaignsCommon);
      }
    } else {
      if (event.target.value === "Creation Date") {
        this.campaignsUser = _.orderBy(
          this.campaignsUser,
          ["createTimestamp"],
          ["desc"]
        );
      } else if (event.target.value === "Deployment Date") {
        this.campaignsUser = _.orderBy(
          this.campaignsUser,
          ["deploymentDate"],
          ["desc"]
        );
      }
    }

    this.setPage(1);
  }

  onSearchChange(value) {
    if(this.selectedTab === 'tab1') {
      if(value !== "") {
        this.campaignsCommon = this.searchFilter.transform(this.campaignCommonDup, value);
      } else {
        this.campaignsCommon = JSON.parse(JSON.stringify(this.campaignCommonDup));
      }
      
    } else {
      if(value !== "") {
        this.campaignsUser = this.searchFilter.transform(this.campaignUserdup, value);
      } else {
        this.campaignsUser = JSON.parse(JSON.stringify(this.campaignUserdup));
      }
    }

    this.setPage(1);
    
  }
}
