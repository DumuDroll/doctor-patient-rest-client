import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {Patient} from "../../../core/models/patient";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {Form, FormBuilder, FormGroup, Validators} from "@angular/forms";
import * as moment from "moment";
import {DateService} from "../../../core/services/date/date.service";
import {MatInput} from "@angular/material/input";

@Component({
  selector: 'app-patient-prescription-table',
  templateUrl: './patient-prescription-table.component.html',
  styleUrls: ['./patient-prescription-table.component.css']
})
export class PatientPrescriptionTableComponent implements OnInit {

  @Input() patients?: Patient[];

  @Input() tableData?: any[];

  @Input() totalItems?: number;

  @Input() pageSize?: number;

  @Input() columnHeader: any;

  @Input() dataService: any;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  @ViewChild('fromInput', {
    read: MatInput
  }) fromInput!: MatInput;

  @ViewChild('toInput', {
    read: MatInput
  }) toInput!: MatInput;

  objectKeys = Object.keys;

  dataSource: any;

  patient?: Patient;

  filterForm!: FormGroup;

  constructor(private formBuilder: FormBuilder,
              public dateService: DateService) {
    this.filterForm = this.formBuilder.group({
      patient: new Patient(),
      prescriptionStartDate: '',
      prescriptionEndDate: ''
    });
  }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.tableData);
  }

  onPatientChange(element?: any, page?: number) {
    this.patient = element;
    let pId = element.id;
    this.applyApiFilter(page, pId.toString());
  }


  compareObjects(o1: any, o2: any) {
    if (o1 != null && o2 != null) {
      return o1.id == o2.id;
    }
    return false;
  }

  clearDateFilters() {
    this.filterForm.value.prescriptionStartDate=null;
    this.filterForm.value.prescriptionEndDate=null;
    this.fromInput.value = '';
    this.toInput.value = '';
  }

  applyApiFilter(page?: number, patientId?: string, startDate?: Date, endDate?: Date) {
    this.dataService.findAllFiltered(this.dateService.transform(startDate), this.dateService.transform(endDate),
      page, this.paginator.pageSize, patientId).subscribe((data: any) => {
      this.dataSource = new MatTableDataSource(data['data']);
      this.paginator.pageIndex = data['currentPage'];
      this.totalItems = data['totalItems'];
      this.pageSize = data['pageSize'];
    });
  }

  submit() {
    if (this.filterForm.value.patient === null) {
      this.applyApiFilter(this.paginator.pageIndex, this.filterForm.value.prescriptionStartDate, this.filterForm.value.prescriptionEndDate);
    } else {
      this.applyApiFilter(this.paginator.pageIndex, this.filterForm.value.patient.id,
        this.filterForm.value.prescriptionStartDate, this.filterForm.value.prescriptionEndDate);
    }

  }

  changePage(filterValue: any, page: any) {
    this.applyApiFilter(filterValue, page);
  }
}
