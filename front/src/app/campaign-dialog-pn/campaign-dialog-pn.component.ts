import {Component, Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-campaign-dialog-pn',
  templateUrl: './campaign-dialog-pn.component.html',
  styleUrls: ['./campaign-dialog-pn.component.css']
})
export class CampaignDialogPnComponent {

  constructor(
    public dialogRef: MatDialogRef<CampaignDialogPnComponent>,
    @Inject(MAT_DIALOG_DATA) public data) {}

    ngOnInit() {
    }

}
