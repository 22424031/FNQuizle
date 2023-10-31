import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudysetComponent } from './studyset.component';
import { RouterModule, Routes } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

const routes: Routes = [
  {
    path: 'studyset',
    component: StudysetComponent,
  },
];
@NgModule({
  declarations: [StudysetComponent],
  imports:[CommonModule, RouterModule.forChild(routes), MatButtonModule],
})
export class StudysetModule { }
