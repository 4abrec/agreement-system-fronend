import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HeaderComponent} from "./component/shared/header/header.component";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {HttpInterceptorProvider} from "./interceptor/auth-interceptor";
import {LoginComponent} from './component/auth/login/login.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {MatSelectModule} from "@angular/material/select";
import {MatSliderModule} from "@angular/material/slider";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {InfoComponent} from './component/info/info.component';
import {BaseSnackbarComponent} from "./component/bar/base-snackbar/base-snackbar.component";
import { ChatComponent } from './component/chat/chat.component';
import { ModuleComponent } from './component/module/module.component';
import { StatsComponent } from './component/stats/stats.component';
import { AgreementComponent } from './component/agreement/agreement.component';
import { ProfileComponent } from './component/profile/profile.component';
import { StudentComponent } from './component/student/student.component';
import {MatTableModule} from "@angular/material/table";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatSortModule} from "@angular/material/sort";
import { RegistrationDialogComponent } from './component/dialog/registration-dialog/registration-dialog.component';
import {MatDialogModule} from "@angular/material/dialog";
import { UpdateDialogComponent } from './component/dialog/update-dialog/update-dialog.component';
import { AddModuleDialogComponent } from './component/dialog/add-module-dialog/add-module-dialog.component';
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import { EditModuleDialogComponent } from './component/dialog/edit-module-dialog/edit-module-dialog.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {NgxMatSelectSearchModule} from "ngx-mat-select-search";
import { TaskComponent } from './component/task/task.component';
import { AgreementDialogComponent } from './component/dialog/agreement-dialog/agreement-dialog.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    InfoComponent,
    BaseSnackbarComponent,
    ChatComponent,
    ModuleComponent,
    StatsComponent,
    AgreementComponent,
    ProfileComponent,
    StudentComponent,
    RegistrationDialogComponent,
    UpdateDialogComponent,
    AddModuleDialogComponent,
    EditModuleDialogComponent,
    TaskComponent,
    AgreementDialogComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSlideToggleModule,
    MatSelectModule,
    MatSliderModule,
    MatSnackBarModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatDialogModule,
    FormsModule,
    MatButtonToggleModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatButtonModule,
    MatFormFieldModule,
    NgxMatSelectSearchModule
  ],
  providers: [HttpClient, HttpInterceptorProvider],
  exports: [
    HeaderComponent,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
