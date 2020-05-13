import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule } from 'nativescript-angular/common';
import { SearchComponent } from './search/search.component';
import { SearchRoutingModule } from './search-routing.module';



@NgModule({
  declarations: [SearchComponent],
  imports: [
    NativeScriptCommonModule,
    SearchRoutingModule
  ],
  schemas: [NO_ERRORS_SCHEMA]
})
export class SearchModule { }
