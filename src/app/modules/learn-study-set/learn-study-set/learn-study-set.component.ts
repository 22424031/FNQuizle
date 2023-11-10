import { Component, OnInit } from '@angular/core';
import { StudySet, StudySetDetail } from 'src/app/models/studySet';
import { StudySetService } from 'src/app/services/studyset.service';
import { ActivatedRoute } from '@angular/router';

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
  id:number
  index:number = 1
  isEnableNext = true
  isEnablePre = true
  constructor(private studySetService: StudySetService, private route:ActivatedRoute){
    
  }
  ngOnInit(): void {

    this.route.queryParams.subscribe(params => {
      let idParam = params['id'];
      if(idParam){
        console.log(idParam);
        this.id = Number.parseInt(idParam);
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
    this.index += 1
    
    if(this.index >= this.studysetDetail.length)
    {
      this.isEnableNext = false;
      this.index -= 1
  
      return;
    }
    else{
    
      this.studysetDetailPaging.splice(0, this.studysetDetailPaging.length);
      this.studysetDetailPaging.push(this.studysetDetail[this.index])
      //this.index += 1
      
      if(this.index >= this.studysetDetail.length) {
        //this.studysetDetail[1] = null
        this.isEnableNext = false;
        return;
      }
      //else this.studysetDetailPaging.push( this.studysetDetail[this.index])
    }
    console.log(this.index)
    console.log(this.anserQuestion)
  }
  btnPre(){
    this.index -= 1
    this.isEnableNext = true;
    if(this.index == 0)
    {
      this.index += 1
      this.isEnablePre = false;
   
      return;
    }
    this.studysetDetailPaging.splice(0, this.studysetDetailPaging.length);
    if(this.index == 0)
    {
      this.isEnablePre = false;
      return;
    }
    else{
      this.studysetDetailPaging.push(this.studysetDetail[this.index])
     // this.index -= 1
      
      if(this.index == 0) {
        this.isEnablePre = false;
        return;
      }
     // else this.studysetDetailPaging.push( this.studysetDetail[this.index])
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
    this.updateAnser(this.index-1)
  }
}
