import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { MainComponent } from "./main/main.component";
import { CampaignFormComponent } from "./campaign-form/campaign-form.component";
import { CampaignsComponent } from "./campaigns/campaigns.component";
import { EmailCampaignFormComponent } from "./email-campaign-form/email-campaign-form.component";
import { PnCampaignFormComponent } from "./pn-campaign-form/pn-campaign-form.component";
import { CreateFormDataComponent } from "./create-form-data/create-form-data.component";
import { AuthGuardService } from './shared/auth-guard.service';

const appRoutes: Routes = [
  { path: "", redirectTo: "/main", pathMatch: "full" },
  { path: "login", component: LoginComponent },
  {
    path: "main",
    component: MainComponent,
    canActivate: [AuthGuardService],
    children: [
      { path: "addCampaign", component: CampaignFormComponent },
      { path: "dashboard", component: CampaignsComponent },
      { path: "form/email", component: EmailCampaignFormComponent },
      { path: "form/pn", component: PnCampaignFormComponent }
    ]
  },
  { path: 'super', component: CreateFormDataComponent, canActivate: [AuthGuardService]}
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
