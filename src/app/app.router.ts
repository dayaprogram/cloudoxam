import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { SecurityGuard } from './guard/security.guard';

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

const routes: Routes =
    [
        { path: '', redirectTo: 'login', pathMatch: 'full' },
        { path: 'login', component: LoginComponent },
        { path: 'course', component: CourseComponent, canActivate: [SecurityGuard] },
        { path: 'instruction', component: InstructionComponent, canActivate: [SecurityGuard] },
        { path: 'exam', component: ExamComponent, canActivate: [SecurityGuard] },
        { path: 'examsubject', component: ExamSubjectWiesComponent, canActivate: [SecurityGuard] },
        { path: 'result', component: ResultComponent, canActivate: [SecurityGuard] },
        {
            path: 'adm', component: DashboardMainComponent, canActivate: [SecurityGuard],
            children: [
                { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
                { path: 'dashboard', component: DashboardComponent, canActivate: [SecurityGuard] },
                { path: 'studentdtl', component: StudentDetailsComponent, canActivate: [SecurityGuard] },
                {
                    path: 'question', component: QuestionBodyComponent, canActivate: [SecurityGuard],
                    children: [
                        { path: '', redirectTo: 'mcq', pathMatch: 'full' },
                        { path: 'mcq', component: McqQuestionComponent, canActivate: [SecurityGuard] },
                        { path: 'paramcq', component: McqQuestionParaComponent, canActivate: [SecurityGuard] }
                    ]
                }
            ]
        },
        { path: '**', redirectTo: '' },
        // otherwise redirect to home

    ];

@NgModule({
    imports: [
        CommonModule,
        BrowserModule,
        RouterModule.forRoot(routes, {
            useHash: true
        })
    ],
    exports: [
        //  RouterModule
    ],
})
export class AppRoutingModule { }