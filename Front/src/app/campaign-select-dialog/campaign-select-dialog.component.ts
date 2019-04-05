import { Component, Inject } from "@angular/core";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { SearchPipe } from "../filters/search.pipe";

@Component({
  selector: "app-campaign-select-dialog",
  templateUrl: "./campaign-select-dialog.component.html",
  styleUrls: ["./campaign-select-dialog.component.css"]
})
export class CampaignSelectDialogComponent {
  dataDup = [];
  campaign;
  constructor(
    public dialogRef: MatDialogRef<CampaignSelectDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private searchFilter : SearchPipe
  ) {
    this.dataDup = this.data;
  }

  ngOnInit() {}

  onSearchChange(value) {
      if (value !== "") {
        this.data = this.searchFilter.transform(
          this.dataDup,
          value
        );
      } else {
        this.data = JSON.parse(
          JSON.stringify(this.data)
        );
      }
    
  }

  onCloseClick(data) {
    if(data === 'submit')
      this.dialogRef.close(this.campaign);
    else
      this.dialogRef.close(undefined);
  }
}
