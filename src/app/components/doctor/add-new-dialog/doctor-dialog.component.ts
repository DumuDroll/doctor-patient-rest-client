import {Component, Inject, OnInit} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {Doctor} from "../../../core/models/doctor";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

class DialogData {
  id?: number;
  name?: string;
  experience?: string;
}

@Component({
  selector: 'add-doctor-dialog',
  templateUrl: 'doctor-dialog.component.html',
})
export class DoctorDialog implements OnInit {
  doctor?: Doctor;
  doctorForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<DoctorDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
  }

  ngOnInit(): void {
    this.doctorForm = this.formBuilder.group({
      name: [this.data.name, Validators.required],
      experience: [this.data.experience],
    });
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

  submit() {
    this.data.name = this.doctorForm.value.name;
    this.data.experience = this.doctorForm.value.experience;
  }
}
