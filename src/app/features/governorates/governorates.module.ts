import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GovernoratesRoutingModule } from './governorates-routing.module';
import { ListComponent } from './list/list.component';
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from "@angular/material/dialog";
import { TooltipModule } from 'primeng/tooltip';
import { PickListModule } from 'primeng/picklist';
import { DialogModule } from 'primeng/dialog';
import { ListboxModule } from 'primeng/listbox';
import { DeleteconfirmationComponent } from './deleteconfirmation/deleteconfirmation.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    ListComponent,
    CreateComponent,
    EditComponent,
    DeleteconfirmationComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatDialogModule,
    PickListModule,
    DialogModule,
    ListboxModule,
    TranslateModule,
    TooltipModule,
    GovernoratesRoutingModule
  ]
})
export class GovernoratesModule { }
