import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {DateService} from "../../../core/services/date/date.service";

class DialogData {
  id?: number;
  diagnosis?: File;
}

@Component({
  selector: 'app-patient-diagnosis',
  templateUrl: './patient-diagnosis.component.html',
  styleUrls: ['./patient-diagnosis.component.css']
})

export class PatientDiagnosisComponent implements OnInit {

  patientDiagnosisForm!: FormGroup;

  constructor( private formBuilder: FormBuilder,
               public dialogRef: MatDialogRef<PatientDiagnosisComponent>,
               private dateService: DateService,
               @Inject(MAT_DIALOG_DATA) public data: DialogData) {

  }

  ngOnInit(): void {
    this.patientDiagnosisForm = this.formBuilder.group({
      id: [this.data.id],
      diagnosis: [this.data.diagnosis]
    });
  }

  submit() {
    this.data.id = this.patientDiagnosisForm.value.id;
    this.data.diagnosis = this.patientDiagnosisForm.value.diagnosis;
  }

}
