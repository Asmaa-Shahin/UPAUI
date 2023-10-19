import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';
import { ListComponent } from './list/list.component';
import { ViewComponent } from './view/view.component';

const routes: Routes = [
  { path: '', component: ListComponent, data: { breadcrumb: 'UPA.Supplier' } },
  { path: 'addSupplier', component: CreateComponent, data: { breadcrumb: 'UPA.AddSupplier' } },
  { path: 'editSupplier/:id', component: EditComponent, data: { breadcrumb: 'UPA.EditSupplier' } },
  { path: 'viewSupplier/:id', component: ViewComponent, data: { breadcrumb: 'UPA.ViewSupplier' } }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SuppliersRoutingModule { }
