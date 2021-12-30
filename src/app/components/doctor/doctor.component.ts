import {Component, OnInit} from '@angular/core';
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

  totalItems?: number;

  pageSize?: number;

  columnHeader = {
    'id': 'id',
    'name': 'Name',
    'experience': 'Experience',
    'modification': ''
  }

  constructor(public dialog: MatDialog, public doctorService: DoctorService) {
  }

  ngOnInit(): void {
    this.findAllFiltered()
  }

  showDoctorDialog(element: any): void {
    const dialogRef = this.dialog.open(DoctorDialog, {
      width: '250px',
      data: {id: element?.element.id,
        uuid: element?.element.uuid,
        name: element?.element.name,
        experience: element?.element.experience}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result != null) {
        if (element == null) {
          this.doctorService.create(result)
            .subscribe(() => this.findAllFiltered(element?.filterValue, element?.page, element?.pageSize));
        } else {
          this.doctorService.update(result)
            .subscribe(() => this.findAllFiltered(element?.filterValue, element?.page, element?.pageSize));
        }
      }
    });
  }

  findAllFiltered(name?: string, page?: number, pageSize?: number) {
    this.doctorService.findAllFiltered(name, page, pageSize)
      .subscribe((data: any) => {
        this.doctors = data['data'];
        this.totalItems = data['totalItems'];
        this.pageSize=data['pageSize'];
      });
  }
}
