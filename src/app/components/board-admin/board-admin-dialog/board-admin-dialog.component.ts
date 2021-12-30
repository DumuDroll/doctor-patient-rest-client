import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {MatSelect} from "@angular/material/select";
import {User} from "../../../core/models/user";
import {MatOption} from "@angular/material/core";

class DialogData {
  id?: number;
  uuid?: string;
  username?: string;
  roles?: string[];
  allRoles?: string[];
  status?: string;
  statuses?: string[];
}

@Component({
  selector: 'app-board-admin-dialog',
  templateUrl: './board-admin-dialog.component.html',
  styleUrls: ['./board-admin-dialog.component.css']
})
export class BoardAdminDialogComponent implements OnInit {

  boardAdminForm!: FormGroup;

  user?: User;

  allSelected = false;

  @ViewChild('roleSelect') roleSelect!: MatSelect;


  constructor(private formBuilder: FormBuilder,
              public dialogRef: MatDialogRef<BoardAdminDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  ngOnInit(): void {
    this.boardAdminForm = this.formBuilder.group({
      username: [this.data.username, [Validators.required, Validators.email]],
    });
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

  onStatusChange(element?: any) {
    this.data.status = element;
  }

  onRoleChange(element?: any) {
    this.data.roles = element;
  }

  compareObjects(o1: any, o2: any) {
    if (o1 != null && o2 != null) {
      return o1 == o2;
    }
    return false;
  }

  submit() {
    this.data.username = this.boardAdminForm.value.username;
  }
  toggleAllSelection() {
    this.allSelected = !this.allSelected;
    if (this.allSelected) {
      this.roleSelect.options.forEach((item: MatOption) => {
        if(item.value!=null){
          item.select();
        }else {
          item.deselect();
        }
      });
    } else {
      this.roleSelect.options.forEach((item: MatOption) => {
        item.deselect();
      });
    }
    this.roleSelect.close();
  }


}
