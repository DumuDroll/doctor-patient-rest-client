import {Component, Inject} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {Patient} from "../../../core/models/patient";
import {FullInfo} from "../../../core/models/full-info";
import {Doctor} from "../../../core/models/doctor";
import {Drug} from "../../../core/models/drug";

class DialogData {
  id?: number;
  firstName?: string;
  lastName?: string;
  fullInfo?: FullInfo;
  doctor?: Doctor;
  drugs?: Drug[];
}

@Component({
  selector: 'edit-patient-dialog',
  templateUrl: 'editPatientDialog.html',
})
export class EditPatientDialog {
  patient?: Patient;

  constructor(
    public dialogRef: MatDialogRef<EditPatientDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }
}
