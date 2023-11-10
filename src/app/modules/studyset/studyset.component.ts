import { Component, Inject, OnInit } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { DialogConfirmComponent } from '../common/dialog-confirm/dialog-confirm.component';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { StudySetService } from 'src/app/services/studyset.service';
import { Section } from 'src/app/models/section';
import { StudySet, StudySetDetail } from 'src/app/models/studySet';
import { Router } from '@angular/router';

@Component({
  selector: 'app-studyset',
  templateUrl: './studyset.component.html',
  styleUrls: ['./studyset.component.scss']
})
export class StudysetComponent implements OnInit {
  animal: string;
  topic: string;
  title:string;
  comment:string;
  keyword: string;
  imgSelect :string;

  //section = {"keyword":"", "description": "", "image":"", "urlimage":"", "isactive":true}
  numberOfSection:Section[] = [];
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  constructor(public dialog: MatDialog, private studyService : StudySetService, private router:Router) {}
  panelOpenState = true;
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
  ngOnInit() {

    for (let index = 0; index < 1; index++) {
      var section = new Section();
      section.urlimage = ""
      section.description = "";
      section.image = "";
      section.keyword = "";
      section.isactive = true;
      section.imgs = [];
      this.numberOfSection.push(section);
    }
  }
  panelEventOpen(){

  }
  panelEventClose(i:number){
    this.numberOfSection[i].imgs = []
  }
  imgClick(url:string){
    let str_index:string[] = url.split(";");
    const urlStr = str_index[0];
    let index = Number.parseInt(str_index[1]);
    console.log(index);
    this.numberOfSection[index].urlimage = urlStr;
    this.keyword = "";
  }
  searchKeyword(i:number){
    let imgResult = this.studyService.getAll(this.keyword).subscribe(sp =>{
      if(sp.status === 200){
        this.numberOfSection[i].imgs = sp.data;
        
      }
      
    });
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(DialogConfirmComponent, {
      data: {topic: this.animal, animal: this.animal},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }
  addSection(){
    var section = new Section();
     section.urlimage = ""
    section.description = "";
    section.image = "";
    section.keyword = "";
    section.isactive = true; 
    this.numberOfSection.push(section);
    this.numberOfSection[this.numberOfSection.length-1].keyword = '';
  }
  onKeyTitle(event: any){
    //console.log(event.target.value)
    this.title = event.target.value
  }
  onKeyDes(event: any){
    //console.log(event.target.value)
    this.comment = event.target.value
  }
  onKeyword(event: any, i: number){
    this.numberOfSection[i].keyword = event.target.value
  }
  onKeyDifinition(event: any, i: number){
    this.numberOfSection[i].description = event.target.value;
  }
  removeSection(i: number){
    if(this.numberOfSection.length == 1){
      window.alert('can not remove'); return;
    } 
    this.numberOfSection.splice(i, 1)
  }
 async save(){
  var studyset = new StudySet();
  studyset.title = this.title;
  studyset.description = this.comment;
  studyset.keywordLang = "English";
    studyset.descriptionLang = 'daf';
    var details = new Array<StudySetDetail>;
    for (let index = 0; index < this.numberOfSection.length; index++) {
      const element = this.numberOfSection[index];
      var detail = new StudySetDetail();
      detail.isActive = element.isactive;
      detail.description = element.description;
      detail.keyword = element.keyword;
      detail.urlImage = element.urlimage;
      details.push(detail)
    }
    studyset.studySetDetails = details
    let arr = [{  'isActive' : true,
      'description' : 'description',
      'keyword' : 'keyword',
      'urlImage' : 'urlimage'
      
    }]
    console.log(studyset)
    let studyPost = {"title": "a", "description":"commnet", "keywordLang":"abc", "DescriptionLang":"english","StudySetDetails": details}
   var data = await this.studyService.createStudySet(studyset).subscribe(sp => {
      if(sp)
      {
        if(sp.status === 200){
          console.log("create ok");
          this.router.navigateByUrl("studysetlist");
        }
        else{
          console.log("create fail");
          console.log(sp.errorMessage);
        }
      }
    });
  }
}