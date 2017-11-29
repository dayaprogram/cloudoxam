import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mcq-question',
  templateUrl: './mcq-question.component.html',
  styleUrls: ['./mcq-question.component.css']
})
export class McqQuestionComponent implements OnInit {

  constructor() { }
  typesOfShoes = ['Boots', 'Clogs', 'Loafers', 'Moccasins', 'Sneakers'];
  ngOnInit() {
  }

}
