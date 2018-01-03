import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from '../../../service/admin.service';
import { StudentDetails } from '../../../model/student-details';
import { Options } from '../../../model/options';
import { ExamRateDetail } from '../../../model/exam-rate-detail';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.css']
})
export class StudentDetailsComponent implements OnInit {
  isLinear = true;

  stdForm: FormGroup;
  courseMappingForm: FormGroup;
  paymentForm: FormGroup;
  studentDetail: StudentDetails;
  result = '';

  paymentResult = '';
  genderList: Options[];
  categoryList: Options[];
  familyIncomeRangeList: Options[];

  courseList: Options[];
  selectedCourses: Options[] = [];

  examRateDetailList: ExamRateDetail[];
  mappedExamRateDetail: ExamRateDetail[] = [];

  constructor(private fb: FormBuilder,
    private adminApi: AdminService,
    public snackBar: MatSnackBar) { }
  submitStudentDetail() {
    if (this.stdForm.valid) {
      this.adminApi.saveStudentDetail(this.formToStudentDetail()).subscribe(
        data => {
          this.result = data;
        },
        err => {
          this.alertSnack('Something went wrong!', 'Close');
        },
        () => {
          this.alertSnack('Student Detail Succesfully Saved. Student Id:-' + this.result, 'Close');
        });
    }
  }

  makePaymentOfCousre() {
    this.paymentResult = '';
    if (this.mappedExamRateDetail.length > 0 || this.mappedExamRateDetail.length !== undefined) {
      this.adminApi.makeExamCoursePayment(this.mappedExamRateDetail).subscribe(
        data => {
          this.paymentResult = data;
        },
        err => {
          this.alertSnack('Something went wrong!', 'Close');
        },
        () => {
          this.alertSnack(this.paymentResult, 'Close');
        });
    }
  }
  resetRegistrationForm() {
    alert('reset');
    this.selectedCourses = [];
    this.mappedExamRateDetail = [];
    this.stdForm.reset();
    this.courseMappingForm.reset();
    this.paymentForm.reset();
    this.studentDetail = new StudentDetails();
    this.result = '';
    this.paymentResult = '';
  }

  addCourses(course: any) {
    this.selectedCourses.push(course);
    this.selectedCourses = Array.from(new Set(this.selectedCourses));
  }
  removeCourses(course: string) {
    this.selectedCourses = this.selectedCourses.filter(x => x.value !== course);
    this.mappedExamRateDetail = this.mappedExamRateDetail.filter(x => x.courseId !== course);
  }

  addRateToSelectedCourse(itemRateCode: String, course: string) {
    const examRateDetail = this.examRateDetailList.find(itm => itm.itemRateCode === itemRateCode);
    const examRateDetailTemp: ExamRateDetail = new ExamRateDetail();
    examRateDetailTemp.courseId = course;
    examRateDetailTemp.examCount = examRateDetail.examCount;
    examRateDetailTemp.itemRateCode = examRateDetail.itemRateCode;
    examRateDetailTemp.rateBill = examRateDetail.rateBill;
    examRateDetailTemp.studentId = this.result;
    if (this.mappedExamRateDetail.length === 0 || this.mappedExamRateDetail.length === undefined) {
      this.mappedExamRateDetail.push(examRateDetailTemp);
    } else {
      this.mappedExamRateDetail = this.mappedExamRateDetail.filter(x => x.courseId !== course);
      this.mappedExamRateDetail.push(examRateDetailTemp);
    }
  }
  getTotalCourseFee() {
    let totalAmt = 0;
    this.mappedExamRateDetail.forEach(itm => {
      totalAmt = totalAmt + itm.rateBill;
    });
    return totalAmt;
  }
  formToStudentDetail() {
    this.studentDetail = new StudentDetails();
    this.studentDetail.stdFirstName = this.stdForm.value.stdFirstName;
    this.studentDetail.stdMiddleName = this.stdForm.value.stdMiddleName;
    this.studentDetail.stdLastName = this.stdForm.value.stdLastName;
    this.studentDetail.fatherFirstName = this.stdForm.value.fatherFirstName;
    this.studentDetail.fatherMiddleName = this.stdForm.value.fatherMiddleName;
    this.studentDetail.fatherLastName = this.stdForm.value.fatherLastName;
    this.studentDetail.gender = this.stdForm.value.gender;
    this.studentDetail.dateOfBirth = this.stdForm.value.dateOfBirth;
    this.studentDetail.category = this.stdForm.value.category;
    this.studentDetail.familyIncomeRange = this.stdForm.value.familyIncomeRange;
    this.studentDetail.stdMobNo = this.stdForm.value.stdMobNo;
    this.studentDetail.fatherMobNo = this.stdForm.value.fatherMobNo;
    this.studentDetail.adharNo = this.stdForm.value.adharNo;
    this.studentDetail.stdPanNo = this.stdForm.value.stdPanNo;
    this.studentDetail.stdEmail = this.stdForm.value.stdEmail;
    this.studentDetail.adressLine1 = this.stdForm.value.address1;
    this.studentDetail.adressLine2 = this.stdForm.value.address2;
    this.studentDetail.city = this.stdForm.value.city;
    this.studentDetail.district = this.stdForm.value.district;
    this.studentDetail.state = this.stdForm.value.state;
    this.studentDetail.country = this.stdForm.value.country;
    return this.studentDetail;
  }

  ngOnInit() {
    this.stdForm = this.fb.group({
      'stdFirstName': ['Dayanand', Validators.required],
      'stdMiddleName': [''],
      'stdLastName': ['Sagar', Validators.required],
      'fatherFirstName': ['Vidya', Validators.required],
      'fatherMiddleName': [''],
      'fatherLastName': ['Sagar', Validators.required],
      'dateOfBirth': ['', Validators.required],
      'gender': ['M', Validators.required],
      'category': ['', Validators.required],
      'familyIncomeRange': [''],
      'stdMobNo': ['7890197952', Validators.required],
      'adharNo': [''],
      'stdPanNo': [''],
      'stdEmail': ['daya@gmail', Validators.email],
      'fatherMobNo': [''],
      'address1': ['Bardaha', Validators.required],
      'address2': [''],
      'city': ['Sirdala', Validators.required],
      'district': ['Nawada', Validators.required],
      'state': ['BR', Validators.required],
      'country': ['IN', Validators.required],
    });

    this.courseMappingForm = this.fb.group({
      'examCount': ['', Validators.required]
    });

    this.adminApi.getFamilyIncomeRange().subscribe(
      data => {
        this.familyIncomeRangeList = data;
      },
      err => {
        this.alertSnack('Something went wrong!', 'Close');
      },
      () => { });
    this.adminApi.getGender().subscribe(
      data => {
        this.genderList = data;
      },
      err => {
        this.alertSnack('Something went wrong!', 'Close');
      },
      () => { });
    this.adminApi.getCatagory().subscribe(
      data => {
        this.categoryList = data;
      },
      err => {
        this.alertSnack('Something went wrong!', 'Close');
      },
      () => { });
    this.adminApi.getAllCources().subscribe(
      data => {
        this.courseList = data;
      },
      err => {
        console.log('Something went wrong!');
      },
      () => {

      }
    );
    this.adminApi.getExamRateList().subscribe(
      data => {
        this.examRateDetailList = data;
      },
      err => {
        console.log('Something went wrong!');
      },
      () => {
      }
    );
  }
  alertSnack(message: string, action: string) {
    action = 'Close';
    this.snackBar.open(message, action, { duration: 10000 });
  }
}
