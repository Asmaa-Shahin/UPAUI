import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewComponent } from './view/view.component';
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';
import { ListComponent } from './list/list.component';

const routes: Routes = [
  { path: '', component: ListComponent, data: { breadcrumb: 'UPA.Hospitals' } },
  { path: 'addhospital', component: CreateComponent, data: { breadcrumb: 'UPA.AddHospital' } },
  { path: 'edithospital/:id', component: EditComponent, data: { breadcrumb: 'UPA.EditHospital' } },
  { path: 'viewhospital/:id', component: ViewComponent, data: { breadcrumb: 'UPA.ViewHospital' } }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HospitalsRoutingModule { }
