import { Component, ViewChild } from "@angular/core";

import { Router, ActivatedRoute } from "@angular/router";
import { DataStorageService } from "../shared/data-storage.service";

@Component({
  selector: "app-campaign-form",
  templateUrl: "./campaign-form.component.html",
  styleUrls: ["./campaign-form.component.css"]
})
export class CampaignFormComponent {
  channel = "";
  campaignChannels = ["Email", "Push Notification"];
  constructor(private route: Router, private activatedRoute: ActivatedRoute, private dataStorageService : DataStorageService) {}

  async navigate() {
    try {
      await this.dataStorageService.getFormData();
    } catch(err) {
      alert(err.message);
      this.route.navigate(["/main"]);
    }
    
    if (this.channel === "Email") {
      this.route.navigate(["/main/form/email"]);
    } else {
      this.route.navigate(["/main/form/pn"]);
    }
  }
}
