import {Component, Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-campaign-dialog-email',
  templateUrl: './campaign-dialog-email.component.html',
  styleUrls: ['./campaign-dialog-email.component.css']
})
export class CampaignDialogEmailComponent {

  constructor(
    public dialogRef: MatDialogRef<CampaignDialogEmailComponent>,
    @Inject(MAT_DIALOG_DATA) public data) {}

    ngOnInit() {
    }

}
