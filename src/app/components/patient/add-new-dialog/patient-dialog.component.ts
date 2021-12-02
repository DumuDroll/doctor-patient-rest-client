import {Component, Inject, OnInit} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {Patient} from "../../../core/models/patient";
import {FullInfo} from "../../../core/models/full-info";
import {Doctor} from "../../../core/models/doctor";
import {Drug} from "../../../core/models/drug";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

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
export class PatientDialog implements OnInit {
  dateRegex = "";
  patient?: Patient;
  patientForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<PatientDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
  }

  ngOnInit(): void {
    this.patientForm = this.formBuilder.group({
      firstName: [this.data.firstName, Validators.required],
      lastName: [this.data.lastName, Validators.required],
      email: [this.data.fullInfo.email, [Validators.required, Validators.email]],
      birthDate: [this.data.fullInfo.birthDate],
      phoneNumber: [this.data.fullInfo.phoneNumber]
    });
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

  onDoctorChange(element?: any) {
    this.data.doctor = element;
  }

  onDrugsChange(element?: any) {
    this.data.drugs = element;
  }

  compareObjects(o1: any, o2: any) {
    if (o1 != null && o2 != null) {
      return o1.id == o2.id;
    }
    return false;
  }

  submit() {
    this.data.firstName = this.patientForm.value.firstName;
    this.data.lastName = this.patientForm.value.lastName;
    if (this.patientForm.value.email != null) {
      this.data.fullInfo.email = this.patientForm.value.email;
    }
    if (this.patientForm.value.birthDate != null) {
      this.data.fullInfo.birthDate = this.patientForm.value.birthDate;
    }
    if (this.patientForm.value.phoneNumber != null) {
      this.data.fullInfo.phoneNumber = this.patientForm.value.phoneNumber;
    }
  }
}
