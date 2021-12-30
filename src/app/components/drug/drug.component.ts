import {Component, OnInit} from '@angular/core';
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

  totalItems?: number;

  pageSize?: number;

  columnHeader = {'id': 'id', 'name': 'Name', 'modification': ''}

  constructor(public dialog: MatDialog, public drugService: DrugService) {
  }

  ngOnInit(): void {
    this.findAllFiltered()
  }

  showDrugDialog(element?: any): void {
    const dialogRef = this.dialog.open(DrugDialog, {
      width: '250px',
      data: {
        id: element?.element.id,
        uuid: element?.element.uuid,
        name: element?.element.name
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result != null) {
        if (element == null) {
          this.drugService.create(result)
            .subscribe(() => this.findAllFiltered(element?.filterValue, element?.page, element?.pageSize));
        } else {
          this.drugService.update(result)
            .subscribe(() => this.findAllFiltered(element?.filterValue, element?.page, element?.pageSize));
        }
      }
    });
  }

  findAllFiltered(name?: string, page?: number, pageSize?: number) {
    this.drugService.findAllFiltered(name, page, pageSize)
      .subscribe((data: any) => {
        this.drugs = data['data'];
        this.totalItems = data['totalItems'];
        this.pageSize = data['pageSize'];
      });
  }

}
