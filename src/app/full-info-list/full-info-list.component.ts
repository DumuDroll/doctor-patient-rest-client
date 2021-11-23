import { Component, OnInit } from '@angular/core';
import {FullInfo} from "../full-info";
import {FullInfoService} from "../full-info.service";

@Component({
  selector: 'app-full-info-list',
  templateUrl: './full-info-list.component.html',
  styleUrls: ['./full-info-list.component.css']
})
export class FullInfoListComponent implements OnInit {

  fullInfos: FullInfo[];

  constructor(private fullInfoService: FullInfoService) { }

  ngOnInit(): void {
    this.fullInfoService.findAll().subscribe(data =>{
      this.fullInfos = data;
    })
  }

}
