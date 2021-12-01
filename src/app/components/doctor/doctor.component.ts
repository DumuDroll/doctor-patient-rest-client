import { Component, OnInit } from '@angular/core';
import {Doctor} from "../../core/models/doctor";
import {DoctorService} from "../../core/services/doctor.service";
import {DoctorDialog} from "./add-new-dialog/doctor-dialog.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.css']
})
export class DoctorComponent implements OnInit {
  doctors?: Doctor[];

  columnHeader = {'id': 'id', 'name': 'Name', 'experience': 'Experience', 'patientsNames': "Patients",'modification': ''}

  constructor(public dialog: MatDialog, public doctorService: DoctorService) {
  }

  ngOnInit(): void {
    this.findAll()
  }

  showDoctorDialog(element?: any): void {
    const dialogRef = this.dialog.open(DoctorDialog, {
      width: '250px',
      data: {id: element?.id, name: element?.name, experience: element?.experience}
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result!=null){
        if(element==null){
          this.doctorService.create(result)
            .subscribe(() => this.findAll());
        }else{
          this.doctorService.update(result)
            .subscribe(() => this.findAll());
        }
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
