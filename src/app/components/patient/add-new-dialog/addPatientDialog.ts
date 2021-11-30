import {Component, Inject} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {Patient} from "../../../core/models/patient";
import {FullInfo} from "../../../core/models/full-info";

class DialogData {
  id?: number;
  firstName?: string;
  lastName?: string;
  fullInfo: FullInfo = new FullInfo();
}

@Component({
  selector: 'add-patient-dialog',
  templateUrl: 'addPatientDialog.html',
})
export class AddPatientDialog {
  patient?: Patient;

  constructor(
    public dialogRef: MatDialogRef<AddPatientDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }
}