import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForgetpasswordComponent } from './forgetpassword/forgetpassword.component';

const routes: Routes = [
  { path: 'forget', component: ForgetpasswordComponent, data: { breadcrumb: 'UPA.Forget' } },
  //  { path: 'reset', component: Reset, data: { breadcrumb: 'UPA.Reset' } },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthenticateRoutingModule { }
