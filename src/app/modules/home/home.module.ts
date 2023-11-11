import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { MatButtonModule } from '@angular/material/button';
import { HomeGuard } from 'src/app/services/homeguard';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
 canActivate: [HomeGuard]
  },
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes), MatButtonModule],
  declarations: [HomeComponent],
})
export class HomeModule {}
