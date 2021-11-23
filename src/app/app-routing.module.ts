import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FullInfoListComponent } from './full-info-list/full-info-list.component';
import { FullInfoFormComponent } from './full-info-form/full-info-form.component';

const routes: Routes = [
  { path: 'fullInfo', component: FullInfoListComponent },
  { path: 'addFullInfo', component: FullInfoFormComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
