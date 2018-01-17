import { Component, OnInit, Inject } from '@angular/core';
import { AdminService } from '../../../service/admin.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { QuestionSet } from '../../../model/question-set';

@Component({
  selector: 'app-question-paper',
  templateUrl: './question-paper.component.html',
  styleUrls: ['./question-paper.component.css']
})
export class QuestionPaperComponent implements OnInit {

  constructor(private adminApi: AdminService,
    public dialogRef: MatDialogRef<QuestionPaperComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }
  ngOnInit() {


  }

}
