import {Component, OnInit} from '@angular/core';
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

  patients?: Patient[];

  patient?: Patient;

  doctors?: Doctor[];

  drugs?: Drug[];

  patientEntityName = 'patient';

  totalItems?: number;

  pageSize?: number;

  columnHeader = {
    'id': 'id', 'firstName': 'First name', 'lastName': 'Last name', 'email': 'Full info',
    'doctorName': 'Doctor', 'drugsNames': 'Drugs', 'modification': ''
  }

  constructor(public dialog: MatDialog,
              public patientService: PatientService,
              public doctorService: DoctorService,
              public drugService: DrugService) {
  }

  ngOnInit(): void {
    this.doctorService.findAll().subscribe(data => {
      this.doctors = data
    })
    this.drugService.findAll().subscribe(data => {
      this.drugs = data
    })
    this.findAllFiltered()
  }

  showPatientDialog(element?: any): void {
    let fullInfo = element?.fullInfo;
    if (fullInfo == null) {
      fullInfo = new FullInfo();
    }
    const dialogRef = this.dialog.open(PatientDialog, {
      width: '300px',
      data: {
        id: element?.element.id,
        firstName: element?.element.firstName,
        lastName: element?.element.lastName,
        fullInfo: fullInfo,
        doctor: element?.element.doctor,
        drugs: element?.element.drugs,
        doctors: this.doctors,
        allDrugs: this.drugs
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result != null) {
        if (element == null) {
          this.patientService.create(result)
            .subscribe(() => this.findAllFiltered(element?.filterValue, element?.page, element?.pageSize));
          if (result.doctor != null) {
            this.patientService.addDoctorToPatient(result.doctor.id, result)
              .subscribe(() => this.findAllFiltered(element?.filterValue, element?.page, element?.pageSize));
          }
          if (result.drugs != null) {
            result.drugs.forEach((drug: Drug) => {
              this.drugService.addDrugToPatient(result.id, drug)
                .subscribe(() => this.findAllFiltered(element?.filterValue, element?.page, element?.pageSize));
            })
          }
        } else {
          this.patientService.update(result)
            .subscribe(() => this.findAllFiltered(element?.filterValue, element?.page, element?.pageSize));
        }
      }
    });
  }

  findAllFiltered(name?: string, page?: number, pageSize?: number) {
    console.log("name",name);
    this.patientService.findAllFiltered(name, page, pageSize)
      .subscribe((data: any) => {
        this.patients = data['data'];
        this.totalItems = data['totalItems'];
        this.pageSize = data['pageSize'];
      });
  }

}
