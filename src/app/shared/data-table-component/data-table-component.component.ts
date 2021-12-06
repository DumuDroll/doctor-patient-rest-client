import {
  AfterViewInit,
  Component, EventEmitter, Input, OnChanges, OnInit, Output, ViewChild
} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {FullInfoService} from "../../core/services/full-info.service";
import {MatPaginator} from "@angular/material/paginator";

@Component({
  selector: 'app-data-table-component',
  templateUrl: './data-table-component.component.html',
  styleUrls: ['./data-table-component.component.css']
})
export class DataTableComponentComponent implements OnInit, OnChanges, AfterViewInit{
  @Output() showModificationDialog: EventEmitter<any> = new EventEmitter();
  @Input() dataService?: any;
  @Input() tableData: any[] | undefined;
  @Input() columnHeader: any;
  @Input() parentEntity?: string;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  objectKeys = Object.keys;
  dataSource: any | undefined;

  ngOnInit() {
    this.dataSource = new MatTableDataSource(this.tableData);
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
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

  applyFilter(filterValue: any) {
    console.log(filterValue);
    this.dataSource.filter = filterValue;
  }
}
