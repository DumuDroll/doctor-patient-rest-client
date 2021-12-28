import {
  Component, EventEmitter, Input, OnChanges, OnInit, Output, ViewChild
} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {FullInfoService} from "../../core/services/full-info.service";
import {MatPaginator} from "@angular/material/paginator";
import {UserService} from "../../core/services/user.service";

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

  blocked?: boolean;

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

  checkIfAdminBoard() {
    return (this.dataService instanceof UserService);
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue;
  }

  applyApiFilter(filterValue: string, page?: number, blocked?: boolean) {
    if (typeof this.blocked !== 'undefined') {
      blocked = this.blocked;
    }
    this.dataService.findAllFiltered(filterValue, page, this.paginator.pageSize, blocked).subscribe((data: any) => {
      this.dataSource = new MatTableDataSource(data['data']);
      this.paginator.pageIndex = data['currentPage'];
      this.totalItems = data['totalItems'];
      this.pageSize = data['pageSize'];
    });
  }

  changePage(filterValue: string, page: number) {
    this.applyApiFilter(filterValue, page, this.blocked);
  }

  emitToModificationDialog(element: any, filterValue: string, page: number, pageSize: number) {
    this.showModificationDialog.emit({element, filterValue, page, pageSize});
  }

  delete(element: any, filterValue: string, page: number) {
    this.dataService.deleteById(element.id).subscribe(() => this.applyApiFilter(filterValue, page, this.blocked));
  }

  block(element: any, filterValue: string, page: number) {
    element.status = "BLOCKED";
    this.dataService.update(element).subscribe(() => this.applyApiFilter(filterValue, page));
  }

  toggleActive(filterValue: string) {
    if (typeof this.blocked == 'undefined') {
      this.blocked = true;
    }
    this.blocked = !this.blocked;
    this.applyApiFilter(filterValue, 0, this.blocked);
  }
}
