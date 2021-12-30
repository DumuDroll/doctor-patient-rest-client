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

  totalItems?: number;

  pageSize?: number;

  columnHeader = {'id': 'id', 'email': 'Email', 'birthDate': 'Birth date', 'phoneNumber': 'Phone number'
    , 'modification': ''}

  constructor(public dialog: MatDialog, public fullInfoService: FullInfoService) {
  }

  ngOnInit(): void {
    this.findAllFiltered();
  }

  showFullInfoDialog(element?: any): void {
    const dialogRef = this.dialog.open(FullInfoDialog, {
      width: '300px',
      data: {id: element?.element.id,
        uuid: element?.element.uuid,
        email: element?.element.email,
        birthDate: element?.element.birthDate,
        phoneNumber: element?.element.phoneNumber}
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result!=null){
          this.fullInfoService.update(result)
            .subscribe(() => this.findAllFiltered(element?.filterValue, element?.page, element?.pageSize));
      }
    });
  }

  findAllFiltered(name?: string, page?: number, pageSize?: number) {
    this.fullInfoService.findAllFiltered(name,page,pageSize)
      .subscribe((data: any) => {
        this.fullInfos = data['data'];
        this.totalItems = data['totalItems'];
        this.pageSize=data['pageSize'];
      });
  }

}
