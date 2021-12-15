import {Injectable} from "@angular/core";
import {DatePipe} from "@angular/common";

@Injectable({
  providedIn: 'root'
})
export class DateService {
  initialDate: any;
  formattedDate?: Date;

  constructor(private datePipe: DatePipe) {
  }

  transform(date: any) {
    this.initialDate = this.datePipe.transform(date, "dd/MM/yyyy");
    this.formattedDate = this.initialDate;
    return this.formattedDate;
  }

}
