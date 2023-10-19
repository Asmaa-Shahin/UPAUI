import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';
import { ListComponent } from './list/list.component';

const routes: Routes = [
  { path: '', component: ListComponent, data: { breadcrumb: 'UPA.Organizations' } },
  { path: 'addorg', component: CreateComponent, data: { breadcrumb: 'UPA.AddOrg' } },
  { path: 'editorg/:id', component: EditComponent, data: { breadcrumb: 'UPA.EditOrg' } }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrganizationsRoutingModule { }
