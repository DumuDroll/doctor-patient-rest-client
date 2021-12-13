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
    'name': 'Name',
    'prescriptionStartDate': 'From',
    'prescriptionEndDate': 'To'
  }

  constructor(public dialog: MatDialog,
              public patientService: PatientService,
              public patientPrescriptionService: PatientPrescriptionService) {
  }

  ngOnInit(): void {
    this.patientService.findAll().subscribe(data => this.patients=data);
    this.findAllFiltered()
  }
  findAllFiltered(dateFrom?: string, dateTo?: string, page?: number, pageSize?: number) {
    this.patientPrescriptionService.findAllFiltered(dateFrom, dateTo, page, pageSize)
      .subscribe((data: any) => {
        this.patientPrescriptions = data['data'];
        this.totalItems = data['totalItems'];
        this.pageSize=data['pageSize'];
      });
  }
}
