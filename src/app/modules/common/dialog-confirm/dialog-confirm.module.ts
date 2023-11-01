import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { DialogConfirmComponent } from './dialog-confirm.component';

@NgModule({
  declarations: [DialogConfirmComponent],
  imports: [
    CommonModule, MatDialogModule, MatFormFieldModule, MatInputModule, MatButtonModule
  ]
})
export class DialogConfirmModule { }
