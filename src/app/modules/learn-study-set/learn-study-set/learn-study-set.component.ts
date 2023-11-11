import { Component, OnInit } from '@angular/core';
import { StudySet, StudySetDetail } from 'src/app/models/studySet';
import { StudySetService } from 'src/app/services/studyset.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-learn-study-set',
  templateUrl: './learn-study-set.component.html',
  styleUrls: ['./learn-study-set.component.scss']
})
export class LearnStudySetComponent implements OnInit {
  studysetDetail:StudySetDetail[]
  studysetDetailPaging:StudySetDetail[] = StudySetDetail[2];
  anserQuestion:StudySetDetail[]
  anserKey:string
  isHiddenResult:boolean = false
  id:number
  index:number = 0
  isEnableNext = true
  isEnablePre = true
  lbResult:string
  idParam:string
  constructor(private studySetService: StudySetService, private route:ActivatedRoute, private router:Router){
    
  }
  ngOnInit(): void {

    this.refeshPage();
    
  }
  refeshPage(){
    this.index = 0
    this.isEnableNext = true;
    this.route.queryParams.subscribe(params => {
      this.idParam = params['id'];
      if(this.idParam){
        console.log(this.idParam);
        this.id = Number.parseInt(this.idParam);
        this.studySetService.getStudySetDetail(this.id).subscribe(sp => {
          console.log(sp)
          if(sp.status === 200) {
            this.studysetDetail = sp.data
            this.studysetDetailPaging = this.studysetDetail.slice(0, this.studysetDetail.length);
            this.studysetDetailPaging.splice(0, this.studysetDetailPaging.length);
            this.studysetDetailPaging.push( this.studysetDetail[0])
           this.anserQuestion = this.studysetDetail.slice(0, this.studysetDetail.length);
           this.anserQuestion.splice(0, this.anserQuestion.length);
            console.log(this.studysetDetailPaging)
          /*   this.studysetDetail.forEach(element => {
              const reader = new FileReader();
              reader.onload = (e) => element.urlImage = e.target.result;
              reader.readAsDataURL(new Blob([element.image]));
            }); */
          
          }
        })
      }
    })
  }
  updateAnser(i:number){
    let anser:StudySetDetail = new StudySetDetail()
    anser.keyword = this.anserKey
    anser.description = i.toString()
    if(this.anserQuestion == null) {
      this.anserQuestion.push(anser) 
      return
    }
    if( i >= this.anserQuestion.length){
      this.anserQuestion.push(anser)
    }
    else{
      this.anserQuestion[i] = anser
    }
  }
  btnNext(){
    this.isEnablePre = true;
    
    if(++this.index >= this.studysetDetail.length)
    {
      this.isEnableNext = false;
      this.index--
  
      return;
    }
    else{
    
      this.studysetDetailPaging.splice(0, this.studysetDetailPaging.length);
      this.studysetDetailPaging.push(this.studysetDetail[this.index])
    }
    console.log(this.index)
    console.log(this.anserQuestion)
  }
  btnPre(){
    this.isEnableNext = true;
    if(--this.index < 0)
    {
      this.index = 0
      this.isEnablePre = false;
      return;
    }
    
    else{
      this.studysetDetailPaging.splice(0, this.studysetDetailPaging.length);
      this.studysetDetailPaging.push(this.studysetDetail[this.index])
    }
    console.log(this.index)
  }
  checkValue(){

  }
  onKeyAnser(event:any){
    setTimeout(() => {
      
    }, 500);
    console.log('current index update' + this.index)
    this.anserKey = event.target.value
    this.updateAnser(this.index)
  }
  btnTestAgain(){
    //this.router.navigate(['learnstudyset'] , {queryParams: {id: this.idParam}});
    this.isHiddenResult = false 
    this.lbResult = ''
    this.refeshPage();
    
  }
  btnResult(){
    let success = 0
    let fail = this.studysetDetail.length
    for (let index = 0; index < this.studysetDetail.length; index++) {
      const element = this.studysetDetail[index];
      if(index >= this.anserQuestion.length){
        console.log('return a')
        this.isHiddenResult = true;
        return
      }
      if(element.keyword.toLowerCase() == this.anserQuestion[index].keyword.toLowerCase()){
        success += 1
        fail -= 1
        this.lbResult = "Math: "+ success + " Fail: " + fail
      }
      
    }
    this.isHiddenResult = true;
  }
}
