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
  fullInfo: FullInfo = new FullInfo();
  doctor?: Doctor;
  doctors?: Doctor[];
  drugs?: Drug[];
  allDrugs?: Drug[];
}

@Component({
  selector: 'add-patient-dialog',
  templateUrl: 'patient-dialog.component.html',
})
export class PatientDialog {
  patient?: Patient;

  constructor(
    public dialogRef: MatDialogRef<PatientDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

  onDoctorChange(element?: any){
    this.data.doctor=element;
  }

  onDrugsChange(element?: any){
    this.data.drugs=element;
  }
}
