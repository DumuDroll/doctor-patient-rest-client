import {Component, Inject, OnInit} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {Drug} from "../../../core/models/drug";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

class DialogData {
  id?: number;
  name?: string;
}

@Component({
  selector: 'add-drug-dialog',
  templateUrl: 'drug-dialog.component.html',
})
export class DrugDialog implements OnInit {
  drug?: Drug;
  drugForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<DrugDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
  }

  ngOnInit(): void {
    this.drugForm = this.formBuilder.group({
      name: [this.data.name, Validators.required],
    });
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

  submit() {
    this.data.name = this.drugForm.value.name;
  }
}
