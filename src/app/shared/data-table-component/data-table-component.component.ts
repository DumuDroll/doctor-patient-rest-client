import {
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
export class DataTableComponentComponent implements OnInit, OnChanges {

  @Output() showModificationDialog:
    EventEmitter<{ element: any, filterValue: string, page: number, pageSize: number }> = new EventEmitter();

  @Input() dataService?: any;

  @Input() totalItems?: number;

  @Input() pageSize?: number;

  @Input() tableData?: any[];

  @Input() columnHeader: any;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  objectKeys = Object.keys;

  dataSource: any;

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource = new MatTableDataSource(this.tableData);
  }

  ngOnChanges(): void {
    this.dataSource = new MatTableDataSource(this.tableData);
  }

  checkIfFullInfo() {
    return (this.dataService instanceof FullInfoService);
  }

  applyFilter(filterValue: any) {
    this.dataSource.filter = filterValue;
  }

  applyApiFilter(filterValue: string, page?: number) {
    this.dataService.findAllFiltered(filterValue, page, this.paginator.pageSize).subscribe((data: any) => {
      this.dataSource = new MatTableDataSource(data['data']);
      this.paginator.pageIndex = data['currentPage'];
      this.totalItems = data['totalItems'];
      this.pageSize = data['pageSize'];
    });
  }

  changePage(filterValue: any, page: any) {
    this.applyApiFilter(filterValue, page);
  }

  emitToModificationDialog(element: any, filterValue: string, page: number, pageSize: number) {
    this.showModificationDialog.emit({element, filterValue, page, pageSize});
  }

  delete(element: any, filterValue: string, page: number) {
    this.dataService.deleteById(element.id).subscribe(() => this.applyApiFilter(filterValue, page));
  }
}
