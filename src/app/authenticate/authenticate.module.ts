import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthenticateRoutingModule } from './authenticate-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TooltipModule } from 'primeng/tooltip';


import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    BrowserModule,
    HttpClientModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    AuthenticateRoutingModule,
    TooltipModule,
    TranslateModule
  ]
})
export class AuthenticateModule { }
