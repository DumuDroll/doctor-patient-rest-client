import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Patient} from "../../core/models/patient";
import {PatientService} from "../../core/services/patient.service";
import {MatDialog} from "@angular/material/dialog";
import {PatientDialog} from "./add-new-dialog/patient-dialog.component";
import {FullInfo} from "../../core/models/full-info";
import {Doctor} from "../../core/models/doctor";
import {DoctorService} from "../../core/services/doctor.service";
import {DrugService} from "../../core/services/drug.service";
import {Drug} from "../../core/models/drug";

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css']
})
export class PatientComponent implements OnInit {
  @Output() changesOnParent = new EventEmitter<Patient[]>();
  patients?: Patient[];
  patient?: Patient;
  doctors?: Doctor[];
  drugs?: Drug[];
  patientEntityName = 'patient';
  columnHeader = {
    'id': 'id', 'firstName': 'First name', 'lastName': 'Last name', 'fullInfo': 'Full info',
    'doctor': 'Doctor', 'modification': ''
  }

  constructor(public dialog: MatDialog,
              public patientService: PatientService,
              public doctorService: DoctorService,
              public drugService: DrugService) {
  }

  ngOnInit(): void {
    this.doctorService.findAll().subscribe(data => {
      console.log("doctors ", data);
      this.doctors = data
    })
    this.drugService.findAll().subscribe(data => {
      this.drugs = data
    })
    this.findAll()
  }

  showPatientDialog(element?: any): void {
    let fullInfo = element?.fullInfo;
    if (fullInfo == null) {
      fullInfo = new FullInfo();
    }
    const dialogRef = this.dialog.open(PatientDialog, {
      width: '250px',
      data: {
        id: element?.id, firstName: element?.firstName, lastName: element?.lastName,
        fullInfo: fullInfo, doctor: element?.doctor, drugs: element?.drugs, doctors: this.doctors, allDrugs: this.drugs
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result != null) {
        if (element == null) {
          this.patientService.create(result)
            .subscribe(() => this.findAll());
          this.patientService.addDoctorToPatient(result.doctor.id, result)
            .subscribe(() => this.findAll());
          if (result.drugs != null) {
            result.drugs.forEach((drug: Drug) => {
              console.log("result", result);
              this.drugService.addDrugToPatient(result.id, drug)
                .subscribe(() => this.findAll());
            })
          }
        } else {
          this.patientService.update(result)
            .subscribe(() => this.findAll());
        }
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
