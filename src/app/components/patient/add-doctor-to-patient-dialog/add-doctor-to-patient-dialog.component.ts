import {Component, Inject, OnInit} from '@angular/core';
import {Patient} from "../../../core/models/patient";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FullInfo} from "../../../core/models/full-info";
import {Doctor} from "../../../core/models/doctor";

class DialogData {
  id?: number;
  firstName?: string;
  lastName?: string;
  fullInfo: FullInfo = new FullInfo();
  doctor?: Doctor;
  doctors?: Doctor[];
}

@Component({
  selector: 'app-add-doctor-to-patient-dialog',
  templateUrl: './add-doctor-to-patient-dialog.component.html',
  styleUrls: ['./add-doctor-to-patient-dialog.component.css']
})
export class AddDoctorToPatientDialogComponent {
  patient?: Patient;
  selected?: Doctor;
  constructor(
    public dialogRef: MatDialogRef<AddDoctorToPatientDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

}
