import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Patient} from "../../core/models/patient";
import {PatientService} from "../../core/services/patient.service";
import {MatDialog} from "@angular/material/dialog";
import {EditPatientDialog} from "./edit-dialog/editPatientDialog";
import {AddPatientDialog} from "./add-new-dialog/addPatientDialog";
import {FullInfo} from "../../core/models/full-info";

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css']
})
export class PatientComponent implements OnInit {
  @Output() changesOnParent = new EventEmitter<Patient[]>();
  patients?: Patient[];
  patient?: Patient;
  columnHeader = {
    'id': 'id', 'firstName': 'First name', 'lastName': 'Last name', 'fullInfo': 'Full info',
    'doctor': 'Doctor', 'modification': ''
  }

  constructor(public dialog: MatDialog, public patientService: PatientService) {
  }

  ngOnInit(): void {
    this.findAll()
  }

  showPatientAddDialog(element?: any): void {
    const dialogRef = this.dialog.open(AddPatientDialog, {
      width: '250px',
      data: {
        id: element?.id, firstName: element?.firstName, lastName: element?.lastName,
        fullInfo: new FullInfo(), doctor: element?.doctor, drugs: element?.drugs
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result != null) {
        this.patientService.create(result)
          .subscribe(() => this.findAll());
      }
    });
  }

  showPatientEditDialog(element?: any): void {
    const dialogRef = this.dialog.open(EditPatientDialog, {
      width: '250px',
      data: {
        id: element?.id, firstName: element?.firstName, lastName: element?.lastName,
        fullInfo: element?.fullInfo, doctor: element?.doctor, drugs: element?.drugs
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result != null) {
        this.patientService.update(result)
          .subscribe(() => this.findAll());
      }
    });
  }

  findAll() {
    this.patientService.findAll()
      .subscribe(data => {
        this.patients = data;
      });
  }

}
