export class PatientPrescription {

  patientId: number;

  drugId: number;

  uuid?: string;

  drugName?: string;

  prescriptionStartDate: Date;

  prescriptionEndDate: Date;

  constructor(patientId: number, drugId: number, drugName: string, prescriptionStartDate: Date, prescriptionEndDate: Date) {
    this.patientId = patientId;
    this.drugId = drugId;
    this.drugName = drugName;
    this.prescriptionStartDate = prescriptionStartDate;
    this.prescriptionEndDate= prescriptionEndDate;
  }

}
