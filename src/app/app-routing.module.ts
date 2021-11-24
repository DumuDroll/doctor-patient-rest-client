import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {DoctorComponent} from "./components/doctor/doctor.component";
import {PatientComponent} from "./components/patient/patient.component";
import {DrugComponent} from "./components/drug/drug.component";
import {FullInfoComponent} from "./components/full-info/full-info.component";

const routes: Routes = [
  {path: 'doctors', component: DoctorComponent},
  {path: 'patients', component: PatientComponent},
  {path: 'drugs', component: DrugComponent},
  {path: 'fullInfo', component: FullInfoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
