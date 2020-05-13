import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule } from 'nativescript-angular/common';
import { KbaseComponent } from './kbase/kbase.component';
import { KbaseRoutingModule } from './kbase-routing.module';



@NgModule({
  declarations: [KbaseComponent],
  imports: [
    NativeScriptCommonModule,
    KbaseRoutingModule
  ],
  schemas: [NO_ERRORS_SCHEMA]
})
export class KbaseModule { }
