import { Component, OnInit } from '@angular/core';
import {Drug} from "../../core/models/drug";
import {DrugService} from "../../core/services/drug.service";
import {MatDialog} from "@angular/material/dialog";
import {DrugDialog} from "./add-new-dialog/drug-dialog.component";

@Component({
  selector: 'app-drug',
  templateUrl: './drug.component.html',
  styleUrls: ['./drug.component.css']
})
export class DrugComponent implements OnInit {
  drugs?: Drug[];
  columnHeader = {'id': 'id', 'name': 'Name', 'modification': ''}

  constructor(public dialog: MatDialog, public drugService: DrugService) {
  }

  ngOnInit(): void {
    this.findAll()
  }

  showDrugDialog(element?: any): void {
    const dialogRef = this.dialog.open(DrugDialog, {
      width: '250px',
      data: {id: element?.id, name: element?.name}
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result!=null){
        if(element==null) {
          this.drugService.create(result)
            .subscribe(() => this.findAll());
        }else{
          this.drugService.update(result)
            .subscribe(() => this.findAll());
        }
      }
    });
  }

  findAll() {
    this.drugService.findAll()
      .subscribe(data => {
        this.drugs = data;
      });
  }

}
