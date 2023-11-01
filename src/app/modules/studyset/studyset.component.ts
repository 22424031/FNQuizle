import { Component, Inject, OnInit } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { DialogConfirmComponent } from '../common/dialog-confirm/dialog-confirm.component';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { StudySetService } from 'src/app/services/studyset.service';

@Component({
  selector: 'app-studyset',
  templateUrl: './studyset.component.html',
  styleUrls: ['./studyset.component.scss']
})
export class StudysetComponent implements OnInit {
  animal: string;
  topic: string;
  keyword: string;
  imgs = [];
  imgSelect :string;
  numberOfSection = [1,2,3];
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  constructor(public dialog: MatDialog, private studyService : StudySetService) {}
  panelOpenState = true;
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
  ngOnInit() {}
  panelEventOpen(){

  }
  panelEventClose(){
    this.imgs = []
  }
  imgClick(url:string){
    this.imgSelect = url;
  }
  searchKeyword(){
    let imgResult = this.studyService.getAll(this.keyword).subscribe(sp =>{
      if(sp.status === 200){
        this.imgs = sp.data;
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
    this.numberOfSection.push(1);
  }
}