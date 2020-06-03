import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule } from 'nativescript-angular/common';
import { NewsComponent } from './news/news.component';
import { NewsRoutingModule } from './news-routing.module';
import { SharedModule } from '../shared/shared.module';
import { NewsAddComponent } from './news-add/news-add.component';
import { NewsEditComponent } from './news-edit/news-edit.component';
import { RouterModule } from "@angular/router";
import { ActionBarNewsComponent } from './action-bar-news/action-bar-news.component';
import { CommonModule } from "@angular/common";
import { NativeScriptFormsModule } from 'nativescript-angular';
import { ReactiveFormsModule } from "@angular/forms";
import { NewsDetailComponent } from './news-detail/news-detail.component';

@NgModule({
  declarations: [
      NewsComponent,
      NewsAddComponent,
      NewsEditComponent,
      ActionBarNewsComponent,
      NewsDetailComponent
  ],
    imports: [
        NativeScriptCommonModule,
        NewsRoutingModule,
        NativeScriptFormsModule,
        ReactiveFormsModule,
        CommonModule
    ],
  schemas: [NO_ERRORS_SCHEMA]
})

export class NewsModule { }
