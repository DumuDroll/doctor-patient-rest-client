import {Component, Inject} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {Doctor} from "../../../core/models/doctor";

class DialogData {
  id?: number;
  name?: string;
  experience?: string;
}

@Component({
  selector: 'edit-doctor-dialog',
  templateUrl: 'editDoctorDialog.html',
})
export class EditDoctorDialog {
  doctor?: Doctor;

  constructor(
    public dialogRef: MatDialogRef<EditDoctorDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }
}
