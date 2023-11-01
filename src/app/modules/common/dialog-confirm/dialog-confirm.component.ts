import { Component, Inject } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { MatInput } from '@angular/material/input';

@Component({
  selector: 'app-dialog-confirm',
  templateUrl: './dialog-confirm.component.html',
  styleUrls: ['./dialog-confirm.component.scss'],
})
export class DialogConfirmComponent {
  public animal: string;
  name: string;
    constructor(
      public dialogRef: MatDialogRef<DialogConfirmComponent>,
      
    ) {}
    //@Inject(MAT_DIALOG_DATA) public data: DialogData,
    onNoClick(): void {
      this.dialogRef.close();
    }
  
}
