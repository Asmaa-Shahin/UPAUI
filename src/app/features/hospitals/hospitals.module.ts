import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

import { HospitalsRoutingModule } from './hospitals-routing.module';
import { DeleteconfirmationComponent } from './deleteconfirmation/deleteconfirmation.component';
import { ListComponent } from './list/list.component';
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';

import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule, MatDialogRef } from "@angular/material/dialog";
import { MatTabsModule } from '@angular/material/tabs';
import { MatRadioModule } from '@angular/material/radio';
import { TranslateModule } from '@ngx-translate/core';

import { DialogModule } from 'primeng/dialog';
import { ViewComponent } from './view/view.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatListModule } from '@angular/material/list';
import { TooltipModule } from 'primeng/tooltip';
import { PaginatorModule } from 'primeng/paginator';
import { TableModule } from 'primeng/table';
import { MultiSelectModule } from 'primeng/multiselect';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';


@NgModule({
  declarations: [
    DeleteconfirmationComponent,
    ListComponent,
    CreateComponent,
    EditComponent,
    ViewComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatDialogModule,
    MatTabsModule,
    NgMultiSelectDropDownModule,
    MatRadioModule,
    MatCheckboxModule,
    MatListModule,
    TranslateModule,
    DialogModule,
    TooltipModule,
    HospitalsRoutingModule,
    PaginatorModule,
    TableModule,
    DialogModule,
    MultiSelectModule
  ],
  providers: [
    {
      provide: MatDialogRef,
      useValue: {}
    },
    DynamicDialogRef,DynamicDialogConfig
  ],

})
export class HospitalsModule { }
