import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.css']
})
export class StudentDetailsComponent implements OnInit {
  stdForm: FormGroup;
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.stdForm = this.fb.group({
      'stdFirstName': ['', Validators.required],
      'stdMiddleName': ['', Validators.required],
      'stdLastName': ['', Validators.required],
      'fatherFirstName': ['', Validators.required],
      'fatherMiddleName': ['', Validators.required],
      'fatherLastName': ['', Validators.required],
      'dateOfBirth': ['', Validators.required],
      'gender': ['', Validators.required],
      'category': ['', Validators.required],
      'familyIncomeRange': ['', Validators.required],
      'stdMobNo': ['', Validators.required],
      'adharNo': ['', Validators.required],
      'stdPanNo': ['', Validators.required],
      'stdEmail': ['', Validators.email],
      'fatherMobNo': ['', Validators.required],
      'address1': ['', Validators.required],
      'address2': ['', Validators.required],
      'city': ['', Validators.required],
      'district': ['', Validators.required],
      'state': ['', Validators.required],
      'country': ['', Validators.required],
    });
  }
}
