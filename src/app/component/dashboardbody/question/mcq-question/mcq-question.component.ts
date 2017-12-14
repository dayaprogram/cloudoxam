import { Component, OnInit } from '@angular/core';
import { Options } from '../../../../model/options';
@Component({
  selector: 'app-mcq-question',
  templateUrl: './mcq-question.component.html',
  styleUrls: ['./mcq-question.component.css']
})
export class McqQuestionComponent implements OnInit {

  constructor() { }
  typesOfShoes = ['Boots', 'Clogs', 'Loafers', 'Moccasins', 'Sneakers'];
  courseList = ['Boots', 'Clogs', 'Loafers', 'Moccasins', 'Sneakers'];
  subjectList: Options[];

  levelList: Options[];
  chapterList: Options[];

  fullMarks: number;
  negativeMarks: number;


  ngOnInit() {
  }

}
