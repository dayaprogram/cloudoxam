import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Options } from '../../../model/options';
import { AuthenticationService } from '../../../service/authentication.service';
import { ExamcontrolService } from '../../../service/examcontrol.service';

@Component({
  selector: 'app-instruction',
  templateUrl: './instruction.component.html',
  styleUrls: ['./instruction.component.css']
})
export class InstructionComponent implements OnInit {
  examLangs: Options[];
  instructionLang = 'ENG';
  selectedExamLang = '';
  aggreeFlag = false;
  course: string;
  // examNature: string = 'NONSUBGRP';
  examNature = '';
  constructor(
    private cookieService: CookieService,
    private api: ExamcontrolService,
    private router: Router
  ) { }

  onSubmit() {
    if (this.aggreeFlag) {
      if (this.examNature === 'SUBGRP') {
        this.router.navigate(['/examsubject']);
      } else if (this.cookieService.get('EXAMNATURE') === 'NONSUBGRP') {
        this.router.navigate(['/exam']);
      }
    } else {
      alert('Please check "I read the instruction carefully."');
    }
  }
  ngOnInit() {
    this.course = this.cookieService.get('course');
    this.examNature = this.cookieService.get('EXAMNATURE');
    this.api.getExamLang().subscribe(
      data => {
        this.examLangs = data;
      },
      // Errors will call this callback instead:
      err => {
        console.log('Something went wrong!');
      }
    );

  }

}
