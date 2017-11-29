import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FooterComponent } from '../../component/templet/footer/footer.component';
import { HeaderComponent } from '../../component/templet/header/header.component';
import { LoginComponent } from '../../component/body/login/login.component';
import { CourseComponent } from '../../component/body/course/course.component';
import { InstructionComponent } from '../../component/body/instruction/instruction.component';
import { ExamComponent } from '../../component/body/exam/exam.component';
import { ExamSubjectWiesComponent } from '../../component/body/exam-subject-wies/exam-subject-wies.component'
import { ResultComponent } from '../../component/body/result/result.component';
import { DashboardComponent } from '../../component/dashboardbody/dashboard/dashboard.component';
import { StudentDetailsComponent } from '../../component/dashboardbody/student-details/student-details.component';
import { QuestionBodyComponent } from '../../component/dashboardbody/question/question-body/question-body.component';
import { McqQuestionComponent } from '../../component/dashboardbody/question/mcq-question/mcq-question.component';
import { McqQuestionParaComponent } from '../../component/dashboardbody/question/mcq-question-para/mcq-question-para.component';
import { DashHeaderComponent } from '../../component/dashboardbody/dashtemp/dash-header/dash-header.component';
import { DashSideMenuComponent } from '../../component/dashboardbody/dashtemp/dash-side-menu/dash-side-menu.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [
    /*
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
    DashSideMenuComponent
    */
  ],
  exports: [
   /* FooterComponent,
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
    DashSideMenuComponent
    */
  ]
})
export class ComponentModule { }
