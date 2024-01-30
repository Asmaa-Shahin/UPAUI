import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './authenticate/login/login.component';
import { AuthGuard } from './shared/services/guards/authGuard.guard';
import { ViewErrorComponent } from './shared/error/view-error/view-error.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  
  { path: 'errors', component: ViewErrorComponent },
  {
    path: 'dash', canActivate:[AuthGuard],loadChildren: () => import('src/app/dashboard/dashboard.module').then(m => m.DashboardModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
