import { Component, OnInit } from '@angular/core';
import {Drug} from "../../core/models/drug";
import {DrugService} from "../../core/services/drug.service";
import {MatDialog} from "@angular/material/dialog";
import {AddDrugDialog} from "./add-new-dialog/addDrugDialog";
import {EditDrugDialog} from "./edit-new-dialog/editDrugDialog";

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

  showDrugAddDialog(element?: any): void {
    const dialogRef = this.dialog.open(AddDrugDialog, {
      width: '250px',
      data: {id: element?.id, name: element?.name}
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result!=null){
        this.drugService.create(result)
          .subscribe(() => this.findAll());
      }
    });
  }

  showDrugEditDialog(element?: any): void {
    const dialogRef = this.dialog.open(EditDrugDialog, {
      width: '250px',
      data: {id: element?.id, name: element?.name}
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result!=null){
        this.drugService.update(result)
          .subscribe(() => this.findAll());
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
