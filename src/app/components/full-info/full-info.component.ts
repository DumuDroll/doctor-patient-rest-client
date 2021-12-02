import {Component, OnInit} from '@angular/core';
import {FullInfo} from "../../core/models/full-info";
import {FullInfoService} from "../../core/services/full-info.service";
import {FullInfoDialog} from "./modify-dialog/full-info-dialog.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-full-info-list',
  templateUrl: './full-info.component.html',
  styleUrls: ['./full-info.component.css']
})
export class FullInfoComponent implements OnInit {

  fullInfos?: FullInfo[];
  columnHeader = {'id': 'id', 'email': 'Email', 'birthDate': 'Birth date', 'phoneNumber': 'Phone number'
    , 'modification': ''}

  constructor(public dialog: MatDialog, public fullInfoService: FullInfoService) {
  }

  ngOnInit(): void {
    this.findAll();
  }

  showFullInfoDialog(element?: any): void {
    const dialogRef = this.dialog.open(FullInfoDialog, {
      width: '300px',
      data: {id: element?.id, email: element?.email, birthDate: element?.birthDate, phoneNumber: element?.phoneNumber}
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result!=null){
          this.fullInfoService.update(result)
            .subscribe(() => this.findAll());
      }
    });
  }

  findAll() {
    this.fullInfoService.findAll()
      .subscribe(data => {
        this.fullInfos = data;
      });
  }

}
