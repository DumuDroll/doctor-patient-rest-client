import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {Patient} from "../../../core/models/patient";
import {FullInfo} from "../../../core/models/full-info";
import {Doctor} from "../../../core/models/doctor";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DateService} from "../../../core/services/date/date.service";
import {MatSelect} from "@angular/material/select";
import {MatOption} from "@angular/material/core";
import {PatientPrescription} from "../../../core/models/patientPrescription";
import {HttpEventType, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import {PatientService} from "../../../core/services/patient.service";

class DialogData {
  id?: number;
  uuid?: string;
  firstName?: string;
  lastName?: string;
  fullInfo: FullInfo = new FullInfo();
  doctor?: Doctor;
  doctors?: Doctor[];
  drugs?: PatientPrescription[];
  allDrugs?: PatientPrescription[];
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

  currentFile?: File;
  progress = 0;
  message = '';

  fileName = 'Select File';
  fileInfo?: Observable<any>;

  currentUser: any;

  @ViewChild('drugsSelect') drugsSelect!: MatSelect;

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<PatientDialog>,
    private patientService: PatientService,
    private dateService: DateService,
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

  selectFile(event: any): void {
    if (event.target.files && event.target.files[0]) {
      const file: File = event.target.files[0];
      this.currentFile = file;
      this.fileName = this.currentFile.name;
    } else {
      this.fileName = 'Select File';
    }
  }

  upload(): void {
    this.progress = 0;
    this.message = "";

    if (this.currentFile) {
      this.patientService.upload(this.currentFile, this.currentUser.username).subscribe({
        next: ((event: any) => {
          if (event.type === HttpEventType.UploadProgress) {
            this.progress = Math.round(100 * event.loaded / event.total);
          } else if (event instanceof HttpResponse) {
            this.message = event.body.message;
            this.fileInfo = this.patientService.getFile(this.currentUser.id);
          }
        }),
        error: ((err: any) => {
          this.progress = 0;

          if (err.error && err.error.message) {
            this.message = err.error.message;
          } else {
            this.message = 'Could not upload the file!';
          }

          this.currentFile = undefined;
        })
      });
    }
  }

  submit() {
    this.data.firstName = this.patientForm.value.firstName;
    this.data.lastName = this.patientForm.value.lastName;
    this.data.fullInfo.email = this.patientForm.value.email;
    this.data.fullInfo.birthDate = this.dateService.transform(this.patientForm.value.birthDate);
    this.data.fullInfo.phoneNumber = this.patientForm.value.phoneNumber;
  }
}
