import {FullInfo} from "./full-info";
import {Doctor} from "./doctor";
import {Drug} from "./drug";

export class Patient {

  id?: number;
  firstName?: string;
  lastName?: string;
  fullInfo?: FullInfo;
  doctor?: Doctor;
  drugs?: Drug[];

}
