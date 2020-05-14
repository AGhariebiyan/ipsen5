import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule } from 'nativescript-angular/common';
import { MainActionBar } from './main-action-bar/main-action-bar.component';
import { CompactActionBarComponent } from './compact-action-bar/compact-action-bar.component';



@NgModule({
  declarations: [MainActionBar, CompactActionBarComponent],
  imports: [
    NativeScriptCommonModule
  ],
  schemas: [NO_ERRORS_SCHEMA],
  exports: [MainActionBar, CompactActionBarComponent]
})
export class SharedModule { }
