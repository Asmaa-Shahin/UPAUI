import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../authenticate/login/login.component';
const routes: Routes = [
  {
    path: '',
    component: LoginComponent, data: { breadcrumb: 'UPA.Login' },
    children: [
      { path: 'dash', loadChildren: () => import('src/app/dashboard/dashboard.module').then(m => m.DashboardModule), data: { breadcrumb: 'UPA.Home' } },
    ]
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
