import {FullInfo} from "./full-info";
import {Doctor} from "./doctor";
import {PatientDrug} from "./patientDrug";

export class Patient {

  id?: number;
  firstName?: string;
  lastName?: string;
  fullInfo?: FullInfo;
  doctor?: Doctor;
  drugs?: PatientDrug[];

}
