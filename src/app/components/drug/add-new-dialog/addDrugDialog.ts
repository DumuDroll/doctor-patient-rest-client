import {Component, Inject} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {Drug} from "../../../core/models/drug";

class DialogData {
  id?: number;
  name?: string;
}

@Component({
  selector: 'add-drug-dialog',
  templateUrl: 'addDrugDialog.html',
})
export class AddDrugDialog {
  drug?: Drug;

  constructor(
    public dialogRef: MatDialogRef<AddDrugDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }
}
