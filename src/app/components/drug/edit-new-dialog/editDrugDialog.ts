import {Component, Inject} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {Drug} from "../../../core/models/drug";

class DialogData {
  id?: number;
  name?: string;
}

@Component({
  selector: 'edit-drug-dialog',
  templateUrl: 'EditDrugDialog.html',
})
export class EditDrugDialog {
  drug?: Drug;

  constructor(
    public dialogRef: MatDialogRef<EditDrugDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }
}
