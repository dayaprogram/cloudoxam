import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from '../../../service/admin.service';
import { StudentDetails } from '../../../model/student-details';
import { Options } from '../../../model/options';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.css']
})
export class StudentDetailsComponent implements OnInit {
  stdForm: FormGroup;
  studentDetail: StudentDetails;
  result = '';

  genderList: Options[];
  categoryList: Options[];
  familyIncomeRangeList: Options[];

  constructor(private fb: FormBuilder,
    private adminApi: AdminService,
    public snackBar: MatSnackBar) { }
  submitStudentDetail() {

    this.adminApi.saveStudentDetail(this.formToStudentDetail()).subscribe(
      data => {
        this.result = data;
      },
      err => {
        this.alertSnack('Something went wrong!', 'Close');
      },
      () => { });
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
    this.studentDetail.category = this.stdForm.value.category;
    this.studentDetail.familyIncomeRange = this.stdForm.value.familyIncomeRange;
    this.studentDetail.stdMobNo = this.stdForm.value.stdMobNo;
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
      'stdFirstName': ['', Validators.required],
      'stdMiddleName': [''],
      'stdLastName': ['', Validators.required],
      'fatherFirstName': ['', Validators.required],
      'fatherMiddleName': [''],
      'fatherLastName': ['', Validators.required],
      'dateOfBirth': ['', Validators.required],
      'gender': ['', Validators.required],
      'category': ['', Validators.required],
      'familyIncomeRange': [''],
      'stdMobNo': ['', Validators.required],
      'adharNo': [''],
      'stdPanNo': [''],
      'stdEmail': ['', Validators.email],
      'fatherMobNo': [''],
      'address1': ['', Validators.required],
      'address2': ['', Validators.required],
      'city': ['', Validators.required],
      'district': ['', Validators.required],
      'state': ['BIHAR', Validators.required],
      'country': ['INDIA', Validators.required],
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

  }
  alertSnack(message: string, action: string) {
    action = 'Close';
    this.snackBar.open(message, action, { duration: 10000 });
  }
}
