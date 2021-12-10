export class PatientDrug {

  patientId: number;

  drugId: number;

  prescriptionStartDate?: Date;

  prescriptionEndDate?: Date;

  constructor(patientId: number, drugId: number, prescriptionStartDate: Date, prescriptionEndDate: Date) {
    this.patientId = patientId;
    this.drugId = drugId;
    this.prescriptionStartDate = prescriptionStartDate;
    this.prescriptionEndDate = prescriptionEndDate;
  }
}
