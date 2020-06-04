import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule } from 'nativescript-angular/common';
import { KbaseComponent } from './kbase/kbase.component';
import { KbaseRoutingModule } from './kbase-routing.module';
import { SharedModule } from '../shared/shared.module';
import { KbaseAddComponent } from './kbase-add/kbase-add.component';
import { NativeScriptFormsModule } from "nativescript-angular";
import { ReactiveFormsModule } from "@angular/forms";



@NgModule({
  declarations: [KbaseComponent, KbaseAddComponent],
  imports: [
    NativeScriptCommonModule,
    NativeScriptFormsModule,
    ReactiveFormsModule,
    KbaseRoutingModule,
    SharedModule
  ],
  schemas: [NO_ERRORS_SCHEMA]
})

export class KbaseModule { }
