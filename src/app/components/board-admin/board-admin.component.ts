import { Component, OnInit } from '@angular/core';
import {Doctor} from "../../core/models/doctor";
import {MatDialog} from "@angular/material/dialog";
import {DoctorService} from "../../core/services/doctor.service";
import {DoctorDialog} from "../doctor/add-new-dialog/doctor-dialog.component";
import {User} from "../../core/models/user";
import {UserService} from "../../core/services/user.service";
import {BoardAdminDialogComponent} from "./board-admin-dialog/board-admin-dialog.component";

@Component({
  selector: 'app-board-admin',
  templateUrl: './board-admin.component.html',
  styleUrls: ['./board-admin.component.css']
})
export class BoardAdminComponent implements OnInit {

  users?: User[];

  totalItems?: number;

  pageSize?: number;

  columnHeader = {
    'id': 'id',
    'username': 'Username',
    'roles': 'Roles',
    'status': 'Status',
    'modification': ''
  }

  constructor(public dialog: MatDialog,
              public userService: UserService) {
  }

  ngOnInit(): void {
    this.findAllFiltered()
  }

  showUserDialog(element: any): void {
    const dialogRef = this.dialog.open(BoardAdminDialogComponent, {
      width: '250px',
      data: {id: element?.element.id,
        username: element?.element.username,
        status: element?.element.status,
        statuses: ['FIRST_IN', 'ACTIVE', 'BLOCKED'],
        roles: element?.element.roles,
        allRoles: ['ROLE_USER', 'ROLE_ADMIN']},
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result != null) {
        if (element == null) {
          this.userService.create(result)
            .subscribe(() => this.findAllFiltered(element?.filterValue, element?.page, element?.pageSize));
        } else {
          this.userService.update(result)
            .subscribe(() => this.findAllFiltered(element?.filterValue, element?.page, element?.pageSize));
        }
      }
    });
  }

  findAllFiltered(name?: string, page?: number, pageSize?: number) {
    this.userService.findAllFiltered(name, page, pageSize)
      .subscribe((data: any) => {
        this.users = data['data'];
        this.totalItems = data['totalItems'];
        this.pageSize=data['pageSize'];
      });
  }


}
