import {Component, OnInit} from '@angular/core';
import {Patient} from "../../core/models/patient";
import {PatientService} from "../../core/services/patient.service";
import {MatDialog} from "@angular/material/dialog";
import {AddPatientDialog} from "./add-new-dialog/addPatientDialog";

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css']
})
export class PatientComponent implements OnInit {
  patients?: Patient[];
  patient?: Patient;
  columnHeader = {
    'id': 'id', 'firstName': 'First name', 'lastName': 'Last name', 'fullInfo': 'Full info',
    'doctor': 'Doctor', 'drug': 'Drug', 'modification': ''
  }

  constructor(public dialog: MatDialog, public patientService: PatientService) {
  }

  ngOnInit(): void {
    this.patientService.findAll()
      .subscribe(data => {
        this.patients = data;
      });
  }

  showPatientEditDialog(element?: any): void {
    console.log("ddd");
      const dialogRef = this.dialog.open(AddPatientDialog, {
        width: '250px',
        data: {firstName: element?.firstName, lastName: element?.lastName},
      });
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
      });
  }

}
