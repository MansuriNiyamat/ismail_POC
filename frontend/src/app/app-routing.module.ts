import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Components
import { JobComponent } from './job/index';
import { UserComponent } from './users/index';

const routes: Routes = [
  {
    path: 'jobs',
    component: JobComponent
  },
  {
    path: 'users',
    component: UserComponent
  },
  {
    path: '',
    redirectTo: '/jobs',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: '/jobs',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


