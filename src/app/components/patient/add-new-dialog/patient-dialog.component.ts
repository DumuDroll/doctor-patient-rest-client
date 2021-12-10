import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {Patient} from "../../../core/models/patient";
import {FullInfo} from "../../../core/models/full-info";
import {Doctor} from "../../../core/models/doctor";
import {Drug} from "../../../core/models/drug";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DateService} from "../../../core/services/date.service";
import * as moment from 'moment';
import {MatSelect} from "@angular/material/select";
import {MatOption} from "@angular/material/core";
import {PatientDrug} from "../../../core/models/patientDrug";

class DialogData {
  id?: number;
  firstName?: string;
  lastName?: string;
  fullInfo: FullInfo = new FullInfo();
  doctor?: Doctor;
  doctors?: Doctor[];
  drugs?: PatientDrug[];
  allDrugs?: Drug[];
}


@Component({
  selector: 'add-patient-dialog',
  templateUrl: 'patient-dialog.component.html',
  styleUrls: ['./patient-dialog.component.css']
})
export class PatientDialog implements OnInit {

  patient?: Patient;

  patientForm!: FormGroup;

  allSelected = false;

  @ViewChild('drugsSelect') drugsSelect!: MatSelect;

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<PatientDialog>,
    private dateService: DateService,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
  }

  ngOnInit(): void {
    this.patientForm = this.formBuilder.group({
      firstName: [this.data.firstName, Validators.required],
      lastName: [this.data.lastName, Validators.required],
      email: [this.data.fullInfo.email, [Validators.required, Validators.email]],
      birthDate: [moment(this.data.fullInfo.birthDate, "dd/MM/yyyy").toDate()],
      phoneNumber: [this.data.fullInfo.phoneNumber]
    });
  }

  toggleAllSelection() {
    this.allSelected = !this.allSelected;
    if (this.allSelected) {
      this.drugsSelect.options.forEach((item: MatOption) => {
        if(item.value!=null){
          item.select();
        }else {
          item.deselect();
        }
      });
    } else {
      this.drugsSelect.options.forEach((item: MatOption) => {
        item.deselect();
      });
    }
    this.drugsSelect.close();
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
    this.data.fullInfo.email = this.patientForm.value.email;
    this.data.fullInfo.birthDate = this.dateService.transform(this.patientForm.value.birthDate);
    this.data.fullInfo.phoneNumber = this.patientForm.value.phoneNumber;
  }
}
