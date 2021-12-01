import {NgModule} from '@angular/core';
import {MatSidenavModule} from '@angular/material/sidenav';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {AppComponent} from './app.component';
import {FullInfoService} from './core/services/full-info.service';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatListModule} from "@angular/material/list";
import {MatIconModule} from "@angular/material/icon";
import {DrugComponent} from './components/drug/drug.component';
import {DoctorComponent} from './components/doctor/doctor.component';
import {PatientComponent} from './components/patient/patient.component';
import {MatTableModule} from "@angular/material/table";
import {DataTableComponentComponent} from './shared/data-table-component/data-table-component.component';
import {MatButtonModule} from "@angular/material/button";
import {FullInfoComponent} from './components/full-info/full-info.component';
import {DrugService} from "./core/services/drug.service";
import {DoctorService} from "./core/services/doctor.service";
import {PatientService} from "./core/services/patient.service";
import {MatDialogModule} from "@angular/material/dialog";
import {MatInputModule} from "@angular/material/input";
import {PatientDialog} from "./components/patient/add-new-dialog/patient-dialog.component";
import {DoctorDialog} from "./components/doctor/add-new-dialog/doctor-dialog.component";
import {DrugDialog} from "./components/drug/add-new-dialog/drug-dialog.component";
import {MatSelectModule} from "@angular/material/select";

@NgModule({
  declarations: [
    AppComponent,
    DrugComponent,
    DoctorComponent,
    PatientComponent,
    DataTableComponentComponent,
    FullInfoComponent,
    PatientDialog,
    DoctorDialog,
    DrugDialog,
  ],
  imports: [
    FormsModule,
    MatSidenavModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatListModule,
    MatIconModule,
    MatTableModule,
    MatButtonModule,
    MatDialogModule,
    MatInputModule,
    MatSelectModule
  ],
  providers: [FullInfoService, DrugService, DoctorService, PatientService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
