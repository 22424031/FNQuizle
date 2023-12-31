import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () =>
      import('./modules/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: '',
    pathMatch: 'full',
    loadChildren: () =>
      import('./modules/home/home.module').then((m) => m.HomeModule),
  },
  
  {
    path: '',
    loadChildren: () =>
      import('./modules/studyset/studyset.module').then((m) => m.StudysetModule),
  },
  {
    path: '',
    loadChildren: () => 
      import('./modules/learn-study-set/learn-study-set.module').then((m) => m.LearnStudySetModule),
  }
  ,
  {
    path: '**',
    loadChildren: () =>
      import('./modules/page-not-found/page-not-found.module').then(
        (m) => m.PageNotFoundModule
      ),
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
