import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule } from 'nativescript-angular/common';
import { SearchComponent } from './search/search.component';
import { SearchRoutingModule } from './search-routing.module';
import { SharedModule } from '../shared/shared.module';
import { UserSearchComponent } from './user-search/user-search.component';
import { KbaseSearchComponent } from './kbase-search/kbase-search.component';
import { EventSearchComponent } from './event-search/event-search.component';
import { NewsSearchComponent } from './news-search/news-search.component';



@NgModule({
    declarations: [SearchComponent, UserSearchComponent, KbaseSearchComponent, EventSearchComponent, NewsSearchComponent],
    imports: [
        NativeScriptCommonModule,
        SearchRoutingModule,
        SharedModule
    ],
    exports: [
        SearchComponent
    ],
    schemas: [NO_ERRORS_SCHEMA]
})
export class SearchModule { }
