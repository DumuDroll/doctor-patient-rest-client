import { Component, OnInit } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {PatientPrescriptionService} from "../../core/services/patient-prescription.service";
import {PatientPrescription} from "../../core/models/patientPrescription";
import {PatientService} from "../../core/services/patient.service";
import {Patient} from "../../core/models/patient";

@Component({
  selector: 'app-patient-prescription',
  templateUrl: './patient-prescription.component.html',
  styleUrls: ['./patient-prescription.component.css']
})
export class PatientPrescriptionComponent implements OnInit {

  patientPrescriptions?: PatientPrescription[];

  patients?: Patient[];

  totalItems?: number;

  pageSize?: number;

  columnHeader = {
    'drugName': 'Drug',
    'prescriptionStartDate': 'Start date',
    'prescriptionEndDate': 'End date', 'modification': ''
  }

  constructor(public dialog: MatDialog,
              public patientService: PatientService,
              public patientPrescriptionService: PatientPrescriptionService) {
  }

  ngOnInit(): void {
    this.patientService.findAll().subscribe(data => this.patients=data);
    this.findAllFiltered();
  }

  findAllFiltered() {
    this.patientPrescriptionService.findAllFiltered()
      .subscribe((data: any) => {
        this.patientPrescriptions = data['data'];
        this.totalItems = data['totalItems'];
        this.pageSize=data['pageSize'];
      });
  }
}
