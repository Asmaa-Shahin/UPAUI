import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';
import { ListComponent } from './list/list.component';

const routes: Routes = [
  { path: '', component: ListComponent, data: { breadcrumb: 'UPA.Governorates' } },
  { path: 'addgov', component: CreateComponent, data: { breadcrumb: 'UPA.AddGovernorate' } },
  { path: 'editgov/:id', component: EditComponent, data: { breadcrumb: 'UPA.EditGovernorate' } }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GovernoratesRoutingModule { }
