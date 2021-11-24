import { Component, OnInit } from '@angular/core';
import {DrugService} from "../../core/services/drug.service";
import {Patient} from "../../core/models/patient";
import {PatientService} from "../../core/services/patient.service";

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css']
})
export class PatientComponent implements OnInit {
  patients?: Patient[];

  columnHeader = {'id': 'id', 'firstName': 'First name', 'lastName': 'Last name', 'fullInfo': 'Full info', 'doctor': 'Doctor', 'drug': 'Drug'}

  constructor(private patientService: PatientService) {
  }

  ngOnInit(): void {
    this.patientService.findAll()
      .subscribe(data => {
        this.patients = data;
      });
  }

}
