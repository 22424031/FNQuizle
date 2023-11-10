import { Component, OnInit } from '@angular/core';
import { StudySet } from 'src/app/models/studySet';
import { StudySetService } from 'src/app/services/studyset.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-study-set-list',
  templateUrl: './study-set-list.component.html',
  styleUrls: ['./study-set-list.component.scss']
})
export class StudySetListComponent implements OnInit {
  studySetList : StudySet[]
  constructor(private studySetService: StudySetService, private router:Router){

  }
  ngOnInit(): void {
    let username = localStorage.getItem("userName");
    this.studySetService.getStudySetList(username).subscribe(sp => {
     if(sp.status === 200){
       this.studySetList = sp.data;
     }
     else{
       window.alert("error get api" + sp.errorMessage)
     }
    });
  }
  
  studysetdetail(id:number){
    this.router.navigate(['learnstudyset'] , {queryParams: {id: id}});
  }

}
