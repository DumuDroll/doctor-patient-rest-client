import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {DoctorComponent} from "./components/doctor/doctor.component";
import {PatientComponent} from "./components/patient/patient.component";
import {DrugComponent} from "./components/drug/drug.component";
import {FullInfoComponent} from "./components/full-info/full-info.component";
import {PatientPrescriptionComponent} from "./components/patient-prescription-dialog/patient-prescription.component";
import {LoginComponent} from "./components/login/login.component";
import {RegisterComponent} from "./components/register/register.component";
import {ProfileComponent} from "./components/profile/profile.component";
import {BoardAdminComponent} from "./components/board-admin/board-admin.component";

const routes: Routes = [
  {path: 'doctors', component: DoctorComponent},
  {path: 'patients', component: PatientComponent},
  {path: 'patientPrescriptions', component: PatientPrescriptionComponent},
  {path: 'drugs', component: DrugComponent},
  {path: 'fullInfo', component: FullInfoComponent},
  {path: '', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'profile', component: ProfileComponent},
  {path: 'admin', component: BoardAdminComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
