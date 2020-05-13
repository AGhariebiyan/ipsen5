import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule } from 'nativescript-angular/common';
import { NewsComponent } from './news/news.component';
import { NewsRoutingModule } from './news-routing.module';
import { SharedModule } from '../shared/shared.module';
import { NewsAddComponent } from './news-add/news-add.component';



@NgModule({
  declarations: [NewsComponent, NewsAddComponent],
  imports: [
    NativeScriptCommonModule,
    NewsRoutingModule,
    SharedModule
  ],
  schemas: [NO_ERRORS_SCHEMA]
})
export class NewsModule { }
