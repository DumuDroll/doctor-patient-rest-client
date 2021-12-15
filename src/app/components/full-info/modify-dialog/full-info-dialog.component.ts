import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FullInfo} from "../../../core/models/full-info";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DateService} from "../../../core/services/date/date.service";
import * as moment from 'moment';

class DialogData {
  id?: number;
  email?: string;
  birthDate?: Date;
  phoneNumber?: string;
}
export const MY_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'YYYY',
  },
};
@Component({
  selector: 'modify-full-info-dialog',
  templateUrl: 'full-info-dialog.component.html',
})
export class FullInfoDialog implements OnInit {
  fullInfo?: FullInfo;
  fullInfoForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private dateService: DateService,
    public dialogRef: MatDialogRef<FullInfoDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
  }

  ngOnInit(): void {
    this.fullInfoForm = this.formBuilder.group({
      email: [this.data.email, [Validators.email, Validators.required]],
      birthDate: [this.data.birthDate],
      phoneNumber: [this.data.phoneNumber]
    });
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

  submit() {
    this.data.email = this.fullInfoForm.value.email;
    this.data.birthDate = this.dateService.transform(this.fullInfoForm.value.birthDate);
    this.data.phoneNumber = this.fullInfoForm.value.phoneNumber;
  }
}
