import {Component} from '@angular/core';
import {FullInfo} from "../full-info";
import {ActivatedRoute, Router} from "@angular/router";
import {FullInfoService} from "../full-info.service";

@Component({
  selector: 'app-full-info-form',
  templateUrl: './full-info-form.component.html',
  styleUrls: ['./full-info-form.component.css']
})
export class FullInfoFormComponent {

  fullInfo: FullInfo

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fullInfoService: FullInfoService) {
    this.fullInfo = new FullInfo();
  }

  onSubmit() {
    this.fullInfoService.save(this.fullInfo).subscribe(result=> this.gotoFullInfoList());
  }

  gotoFullInfoList(){
    this.router.navigate(['/fullInfo']);
  }
}
