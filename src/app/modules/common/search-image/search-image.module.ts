import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchImageComponent } from './search-image.component';
import {MatExpansionModule} from '@angular/material/expansion';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [SearchImageComponent],
  imports: [
    CommonModule, MatExpansionModule, FormsModule, ReactiveFormsModule
  ],
  exports: [SearchImageComponent]
})
export class SearchImageModule { }
