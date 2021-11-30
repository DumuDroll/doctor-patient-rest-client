import {Component, Inject} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {Doctor} from "../../../core/models/doctor";

class DialogData {
  id?: number;
  name?: string;
  experience?: string;
}

@Component({
  selector: 'add-doctor-dialog',
  templateUrl: 'addDoctorDialog.html',
})
export class AddDoctorDialog {
  doctor?: Doctor;

  constructor(
    public dialogRef: MatDialogRef<AddDoctorDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }
}
