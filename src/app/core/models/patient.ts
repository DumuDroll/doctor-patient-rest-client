import {FullInfo} from "./full-info";
import {Doctor} from "./doctor";
import {PatientPrescription} from "./patientPrescription";

export class Patient {

  id?: number;
  uuid?: string;
  firstName?: string;
  lastName?: string;
  fullInfo?: FullInfo;
  doctor?: Doctor;
  drugs?: PatientPrescription[];

}
