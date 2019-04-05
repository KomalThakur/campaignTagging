import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import {
  MatAutocompleteModule,
  MatBadgeModule,
  MatBottomSheetModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatDividerModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatStepperModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatTreeModule
} from '@angular/material';
import { DataStorageService } from './shared/data-storage.service';
import { AppRoutingModule } from './app-routing.module';
import { HeaderComponent } from './header/header.component';
import { MainComponent } from './main/main.component';
import { CampaignsComponent } from './campaigns/campaigns.component';
import { PagerService } from './shared/pager.service';
import { CampaignFormComponent } from './campaign-form/campaign-form.component';
import { CampaignDialogEmailComponent } from './campaign-dialog-email/campaign-dialog-email.component';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { EmailCampaignFormComponent } from './email-campaign-form/email-campaign-form.component';
import { PnCampaignFormComponent } from './pn-campaign-form/pn-campaign-form.component';
import { ChecklistDatabase } from './shared/checklist-database.service';
import { CreateFormDataComponent } from './create-form-data/create-form-data.component';
import { AuthGuardService } from './shared/auth-guard.service';
import { SearchPipe } from './filters/search.pipe';
import { CampaignSelectDialogComponent } from './campaign-select-dialog/campaign-select-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    MainComponent,
    CampaignsComponent,
    CampaignFormComponent,
    CampaignDialogEmailComponent,
    ConfirmationDialogComponent,
    EmailCampaignFormComponent,
    PnCampaignFormComponent,
    CreateFormDataComponent,
    CampaignSelectDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatAutocompleteModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatStepperModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule,
    HttpModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [DataStorageService, PagerService, ChecklistDatabase, AuthGuardService, SearchPipe], 
  bootstrap: [AppComponent, CampaignDialogEmailComponent, ConfirmationDialogComponent, CampaignSelectDialogComponent]
})
export class AppModule { }
