import { Component, OnInit } from '@angular/core';
import {FullInfo} from "../../core/models/full-info";
import {FullInfoService} from "../../core/services/full-info.service";
import {Drug} from "../../core/models/drug";
import {DrugService} from "../../core/services/drug.service";

@Component({
  selector: 'app-drug',
  templateUrl: './drug.component.html',
  styleUrls: ['./drug.component.css']
})
export class DrugComponent implements OnInit {
  drugs?: Drug[];
  columnHeader = {'id': 'id', 'name': 'Name', 'patient': 'Patient'}

  constructor(private drugService: DrugService) {
  }

  ngOnInit(): void {
    this.drugService.findAll()
      .subscribe(data => {
        this.drugs = data;
      });
  }

}
