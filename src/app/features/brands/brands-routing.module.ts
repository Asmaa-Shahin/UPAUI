import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';
import { ListComponent } from './list/list.component';
import { ViewComponent } from './view/view.component';

const routes: Routes = [
  { path: '', component: ListComponent, data: { breadcrumb: 'UPA.Brands' } },
  { path: 'addbrand', component: CreateComponent, data: { breadcrumb: 'UPA.AddBrand' } },
  { path: 'createbrand', component: CreateComponent, data: { breadcrumb: 'UPA.AddBrand' } },
  { path: 'editbrand/:id', component: EditComponent, data: { breadcrumb: 'UPA.EditBrand' } },
  { path: 'viewbrand/:id', component: ViewComponent, data: { breadcrumb: 'UPA.ViewBrand' } },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class BrandsRoutingModule {

}
