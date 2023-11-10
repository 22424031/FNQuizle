import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudysetComponent } from './studyset.component';
import { RouterModule, Routes } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule} from '@angular/material/dialog';
import { DialogConfirmModule } from '../common/dialog-confirm/dialog-confirm.module';
import {MatExpansionModule} from '@angular/material/expansion';
import { SearchImageModule } from '../common/search-image/search-image.module';
import { AuthGuard } from 'src/app/services/authGuard';

const routes: Routes = [
  {
    path: 'studyset',
    component: StudysetComponent,
    canActivate: [AuthGuard]
  },
];
@NgModule({
  declarations: [StudysetComponent],
  imports:[CommonModule,  FormsModule,
     ReactiveFormsModule,
     RouterModule.forChild(routes), 
     MatButtonModule,
      MatFormFieldModule,MatExpansionModule,
      MatInputModule,MatIconModule, MatDialogModule, DialogConfirmModule, SearchImageModule
    ],
    
})
export class StudysetModule { }
