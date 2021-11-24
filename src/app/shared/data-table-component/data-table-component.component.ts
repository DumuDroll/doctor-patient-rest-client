import {
  Component, Input, OnInit
} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";

@Component({
  selector: 'app-data-table-component',
  templateUrl: './data-table-component.component.html',
  styleUrls: ['./data-table-component.component.css']
})
export class DataTableComponentComponent implements OnInit {
  @Input() tableData: any[] | undefined;
  @Input() columnHeader: any;
  @Input() source: any;
  objectKeys = Object.keys;
  dataSource: any | undefined;

  constructor() {
  }

  ngOnInit() {
    console.log("tableData ", this.tableData);
    console.log("columnHeader ", this.columnHeader);
    console.log("objectKeys ", this.objectKeys(this.columnHeader));
    this.dataSource = new MatTableDataSource(this.tableData);
    console.log("datasource ", this.dataSource);
  }
}
