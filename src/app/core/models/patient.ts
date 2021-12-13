import {FullInfo} from "./full-info";
import {Doctor} from "./doctor";
import {PatientPrescription} from "./patientPrescription";

export class Patient {

  id?: number;
  firstName?: string;
  lastName?: string;
  fullInfo?: FullInfo;
  doctor?: Doctor;
  drugs?: PatientPrescription[];

}
