import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MasterAssetsRoutingModule } from './master-assets-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from "@angular/material/dialog";
import { MatTabsModule } from '@angular/material/tabs';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { TranslateModule } from '@ngx-translate/core';
import { MatRadioModule } from '@angular/material/radio';
import { MatSnackBarModule } from '@angular/material/snack-bar';


import { ListComponent } from './list/list.component';
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';
import { DeleteconfirmationComponent } from './deleteconfirmation/deleteconfirmation.component';
import { MatIconModule } from '@angular/material/icon';
import { ViewComponent } from './view/view.component';
import { TooltipModule } from 'primeng/tooltip';
import { PaginatorModule } from 'primeng/paginator';
import { TableModule } from 'primeng/table';
import { MultiSelectModule } from 'primeng/multiselect';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { DeleteModule } from 'src/app/shared/delete/delete.module';

@NgModule({
  declarations: [
    ListComponent,
    CreateComponent,
    EditComponent,
    DeleteconfirmationComponent,
    ViewComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    DeleteModule,
    ReactiveFormsModule,
    MatDialogModule,
    DialogModule,
    MatTabsModule,
    TranslateModule,
    MatRadioModule,
    MatSnackBarModule,
    ConfirmDialogModule,
    MatIconModule,
    TableModule,
    TooltipModule,
    MasterAssetsRoutingModule,
    PaginatorModule, MultiSelectModule, NgMultiSelectDropDownModule.forRoot(),
  ]
})
export class MasterAssetsModule { }
