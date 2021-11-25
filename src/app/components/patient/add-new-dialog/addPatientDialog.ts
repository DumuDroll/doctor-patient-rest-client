import {Component, Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {Patient} from "../../../core/models/patient";

class DialogData {
  firstName?: string;
  lastName?: string;
}

@Component({
  selector: 'add-patient-dialog',
  templateUrl: 'addPatientDialog.html',
})
export class AddPatientDialog {
  patient?: Patient;

  constructor(
    public dialogRef: MatDialogRef<AddPatientDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
