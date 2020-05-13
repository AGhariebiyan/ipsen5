import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule } from 'nativescript-angular/common';
import { NewsComponent } from './news/news.component';
import { NewsRoutingModule } from './news-routing.module';



@NgModule({
  declarations: [NewsComponent],
  imports: [
    NativeScriptCommonModule,
    NewsRoutingModule
  ],
  schemas: [NO_ERRORS_SCHEMA]
})
export class NewsModule { }
