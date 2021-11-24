import {Component, OnInit} from '@angular/core';
import {FullInfo} from "../../core/models/full-info";
import {FullInfoService} from "../../core/services/full-info.service";

@Component({
  selector: 'app-full-info-list',
  templateUrl: './full-info.component.html',
  styleUrls: ['./full-info.component.css']
})
export class FullInfoComponent implements OnInit {

  fullInfos?: FullInfo[];
  columnHeader = {'id': 'id', 'birthDate': 'Birth date', 'email': 'Email', 'phoneNumber': 'Phone number'}

  constructor(private fullInfoService: FullInfoService) {
  }

  ngOnInit(): void {
    this.fullInfoService.findAll()
      .subscribe(data => {
        this.fullInfos = data;
      });
  }

}
