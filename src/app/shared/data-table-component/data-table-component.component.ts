import {
  Component, EventEmitter, Input, OnChanges, OnInit, Output
} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {FullInfoService} from "../../core/services/full-info.service";

@Component({
  selector: 'app-data-table-component',
  templateUrl: './data-table-component.component.html',
  styleUrls: ['./data-table-component.component.css']
})
export class DataTableComponentComponent implements OnInit, OnChanges {
  @Output() showModificationDialog: EventEmitter<any> = new EventEmitter();
  @Input() dataService?: any;
  @Input() tableData: any[] | undefined;
  @Input() columnHeader: any;
  @Input() parentEntity?: string;
  objectKeys = Object.keys;
  dataSource: any | undefined;

  ngOnInit() {
    this.dataSource = new MatTableDataSource(this.tableData);
  }

  ngOnChanges(): void {
    this.dataSource = new MatTableDataSource(this.tableData);
  }

  delete(element: any) {
    this.dataService.deleteById(element.id).subscribe((data: any[] | undefined) => {
      this.dataSource = new MatTableDataSource(data);
    });
  }

  checkIfFullInfo(){
    return (this.dataService instanceof FullInfoService);
  }

}
