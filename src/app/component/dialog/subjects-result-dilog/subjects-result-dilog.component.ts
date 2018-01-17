import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { AdminService } from '../../../service/admin.service';

@Component({
  selector: 'app-subjects-result-dilog',
  templateUrl: './subjects-result-dilog.component.html',
  styleUrls: ['./subjects-result-dilog.component.css']
})
export class SubjectsResultDilogComponent implements OnInit {

  constructor(private adminApi: AdminService,
    public dialogRef: MatDialogRef<SubjectsResultDilogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }


  ngOnInit() {
     /* this.adminApi.getSubjectResult('', 4).subscribe(res => {
       console.log(res);
     },
       err => { }, () => { });
       */
  }

}
