import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';
import { ListComponent } from './list/list.component';


const routes: Routes = [

  { path: '', component: ListComponent, data: { breadcrumb: 'UPA.HospitalAssets' } },
  { path: 'addhospitalasset', component: CreateComponent, data: { breadcrumb: 'UPA.Create' } },
  { path: 'edithospitalasset/:id', component: EditComponent, data: { breadcrumb: 'UPA.Edit' } },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HospitalAssetsRoutingModule { }
