import { Component, OnInit } from '@angular/core';
import {Doctor} from "../../core/models/doctor";
import {DoctorService} from "../../core/services/doctor.service";
import {AddDoctorDialog} from "./add-new-dialog/addDoctorDialog";
import {EditDoctorDialog} from "./edit-doctor-dialog/editDoctorDialog";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.css']
})
export class DoctorComponent implements OnInit {
  doctors?: Doctor[];

  columnHeader = {'id': 'id', 'name': 'Name', 'experience': 'Experience', 'modification': ''}

  constructor(public dialog: MatDialog, public doctorService: DoctorService) {
  }

  ngOnInit(): void {
    this.findAll()
  }

  showDoctorAddDialog(element?: any): void {
    const dialogRef = this.dialog.open(AddDoctorDialog, {
      width: '250px',
      data: {id: element?.id, name: element?.name, experience: element?.experience}
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result!=null){
        this.doctorService.create(result)
          .subscribe(() => this.findAll());
      }
    });
  }

  showDoctorEditDialog(element?: any): void {
    const dialogRef = this.dialog.open(EditDoctorDialog, {
      width: '250px',
      data: {id: element?.id, name: element?.name, experience: element?.experience}
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result!=null){
        this.doctorService.update(result)
          .subscribe(() => this.findAll());
      }
    });
  }

  findAll() {
    this.doctorService.findAll()
      .subscribe(data => {
        this.doctors = data;
      });
  }

}
