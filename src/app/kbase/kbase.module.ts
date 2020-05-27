import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule } from 'nativescript-angular/common';
import { KbaseComponent } from './kbase/kbase.component';
import { KbaseRoutingModule } from './kbase-routing.module';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [KbaseComponent],
  imports: [
    NativeScriptCommonModule,
    KbaseRoutingModule,
    SharedModule
  ],
  schemas: [NO_ERRORS_SCHEMA]
})

export class KbaseModule { }
