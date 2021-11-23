import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { FullInfoListComponent } from './full-info-list/full-info-list.component';
import { FullInfoFormComponent } from './full-info-form/full-info-form.component';
import { FullInfoService } from './full-info.service';

@NgModule({
  declarations: [
    AppComponent,
    FullInfoListComponent,
    FullInfoFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [FullInfoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
