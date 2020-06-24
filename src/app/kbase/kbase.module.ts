import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule } from 'nativescript-angular/common';
import { KbaseComponent } from './kbase/kbase.component';
import { KbaseRoutingModule } from './kbase-routing.module';
import { SharedModule } from '../shared/shared.module';
import { KbaseAddComponent } from './kbase-add/kbase-add.component';
import { NativeScriptFormsModule } from "nativescript-angular";
import { ReactiveFormsModule } from "@angular/forms";
import { KbaseEditComponent } from './kbase-edit/kbase-edit.component';
import { CommonModule } from "@angular/common";
import { KbaseDetailComponent } from './kbase-detail/kbase-detail.component';
import { NewsModule } from "~/app/news/news.module";
import { KbaseAllComponent } from './kbase-all/kbase-all.component';



@NgModule({
  declarations: [KbaseComponent, KbaseAddComponent, KbaseEditComponent, KbaseDetailComponent, KbaseAllComponent],
    imports: [
        NativeScriptCommonModule,
        NativeScriptFormsModule,
        ReactiveFormsModule,
        KbaseRoutingModule,
        SharedModule,
        CommonModule,
        NewsModule
    ],
  schemas: [NO_ERRORS_SCHEMA]
})

export class KbaseModule { }
