import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router'
import { HttpClientModule } from '@angular/common/http'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import 'hammerjs';

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { MathJaxDirective } from './directive/math-jax.directive';
import { MaterialModule } from './module/material/material.module'
import { ComponentModule } from './module/component/component.module'
import { AppRoutingModule } from './app.router'
import { AppComponent } from './app.component';

import { AuthenticationService } from './service/authentication.service';
import { ExamcontrolService } from './service/examcontrol.service';
import { CookieService } from 'ngx-cookie-service';

import { SecurityGuard } from './guard/security.guard';
import { Global } from './Globel';

import { FooterComponent } from './component/templet/footer/footer.component';
import { HeaderComponent } from './component/templet/header/header.component';
import { LoginComponent } from './component/body/login/login.component';
import { CourseComponent } from './component/body/course/course.component';
import { InstructionComponent } from './component/body/instruction/instruction.component';
import { ExamComponent } from './component/body/exam/exam.component';
import { ExamSubjectWiesComponent } from './component/body/exam-subject-wies/exam-subject-wies.component'
import { ResultComponent } from './component/body/result/result.component';
import { DashboardComponent } from './component/dashboardbody/dashboard/dashboard.component';
import { StudentDetailsComponent } from './component/dashboardbody/student-details/student-details.component';
import { QuestionBodyComponent } from './component/dashboardbody/question/question-body/question-body.component';
import { McqQuestionComponent } from './component/dashboardbody/question/mcq-question/mcq-question.component';
import { McqQuestionParaComponent } from './component/dashboardbody/question/mcq-question-para/mcq-question-para.component';
import { DashHeaderComponent } from './component/dashboardbody/dashtemp/dash-header/dash-header.component';
import { DashSideMenuComponent } from './component/dashboardbody/dashtemp/dash-side-menu/dash-side-menu.component';
import { DashboardMainComponent } from './component/dashboardbody/dashboard-main/dashboard-main.component';

import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { WebStorageModule } from 'ngx-store';



@NgModule({
  declarations: [
    AppComponent,
    MathJaxDirective,
    //ComponentModule,
    FooterComponent,
    HeaderComponent,
    LoginComponent,
    CourseComponent,
    InstructionComponent,
    ExamComponent,
    ExamSubjectWiesComponent,
    ResultComponent,
    DashboardComponent,
    StudentDetailsComponent,
    QuestionBodyComponent,
    McqQuestionComponent,
    McqQuestionParaComponent,
    DashHeaderComponent,
    DashSideMenuComponent,
    DashboardMainComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    WebStorageModule,
  
    AppRoutingModule,
    BrowserAnimationsModule,
    RouterModule
  ],
  providers: [
    AuthenticationService,
    ExamcontrolService,
    SecurityGuard,
    CookieService,
    Global,
    {provide: LocationStrategy, useClass: HashLocationStrategy}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }