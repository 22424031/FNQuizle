import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LearnStudySetComponent } from './learn-study-set/learn-study-set.component';
import { ActivatedRoute, RouterModule, Routes } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { StudySetListComponent } from './study-set-list/study-set-list.component';
import { AuthGuard } from 'src/app/services/authGuard';

const routes: Routes = [
  {
    path: 'learnstudyset',
    component: LearnStudySetComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'studysetlist',
    component: StudySetListComponent,
    canActivate: [AuthGuard]
  },
];
@NgModule({
  declarations: [
    LearnStudySetComponent,
    StudySetListComponent
  ],
  imports: [
    CommonModule, 
    RouterModule.forChild(routes), MatInputModule, MatButtonModule
  ],
  exports: [LearnStudySetComponent, StudySetListComponent]
})
export class LearnStudySetModule { }
