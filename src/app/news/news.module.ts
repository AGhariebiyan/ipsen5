import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule } from 'nativescript-angular/common';
import { NewsComponent } from './news/news.component';
import { NewsRoutingModule } from './news-routing.module';
import { SharedModule } from '../shared/shared.module';
import { NewsEditComponent } from './news-edit/news-edit.component';



@NgModule({
  declarations: [
      NewsComponent,
      NewsEditComponent
  ],
  imports: [
    NativeScriptCommonModule,
    NewsRoutingModule,
    SharedModule
  ],
  schemas: [NO_ERRORS_SCHEMA]
})
export class NewsModule { }
