import { Component, OnInit } from '@angular/core';
import {Drug} from "../../core/models/drug";
import {DrugService} from "../../core/services/drug.service";
import {Doctor} from "../../core/models/doctor";
import {DoctorService} from "../../core/services/doctor.service";

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.css']
})
export class DoctorComponent implements OnInit {
  doctors?: Doctor[];

  columnHeader = {'id': 'id', 'name': 'Name', 'patient': 'Patient', 'modification': ''}

  constructor(public doctorService: DoctorService) {
  }

  ngOnInit(): void {
    this.doctorService.findAll()
      .subscribe(data => {
        this.doctors = data;
      });
  }
}
