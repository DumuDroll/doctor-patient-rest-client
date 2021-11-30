import {
  Component, EventEmitter, Input, OnChanges, OnInit, Output
} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";

@Component({
  selector: 'app-data-table-component',
  templateUrl: './data-table-component.component.html',
  styleUrls: ['./data-table-component.component.css']
})
export class DataTableComponentComponent implements OnInit, OnChanges {
  @Output() showAddDialog: EventEmitter<any> = new EventEmitter();
  @Output() showEditDialog: EventEmitter<any> = new EventEmitter();
  @Input() dataService?: any;
  @Input() tableData: any[] | undefined;
  @Input() columnHeader: any;
  objectKeys = Object.keys;
  dataSource: any | undefined;

  ngOnInit() {
    this.dataSource = new MatTableDataSource(this.tableData);
  }

  ngOnChanges(): void {
    this.dataSource = new MatTableDataSource(this.tableData);
    console.log("newData", this.tableData)
  }


  detectChanges(newData: any){
    this.dataSource = new MatTableDataSource(newData);
  }

  delete(element: any) {
    this.dataService.deleteById(element.id).subscribe((data: any[] | undefined) => {
      this.dataSource = new MatTableDataSource(data);
    });
    console.log("deleted", element.id)
  }

}
