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
      'stdFirstName': [null, Validators.required],
      'stdMiddleName': [null, Validators.required],
      'stdLastName': [null, Validators.required],
      'fatherFirstName': [null, Validators.required],
      'fatherMiddleName': [null, Validators.required],
      'fatherLastName': [null, Validators.required],
      'dateOfBirth': [null, Validators.required],
      'gender': [null, Validators.required],
      'category': [null, Validators.required],
      'familyIncomeRange': [null, Validators.required],
      'stdMobNo': [null, Validators.required],
      'adharNo': [null, Validators.required],
      'stdPanNo': [null, Validators.required],
      'stdEmail': ['', Validators.email],
      'fatherMobNo': [null, Validators.required],
      'address1': [null, Validators.required],
      'address2': [null, Validators.required],
      'city': [null, Validators.required],
      'district': [null, Validators.required],
      'state': [null, Validators.required],
      'country': [null, Validators.required],
    });
  }
}
