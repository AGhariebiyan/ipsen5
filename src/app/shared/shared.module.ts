import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule } from 'nativescript-angular/common';
import { CustomActionBarComponent } from './custom-action-bar/custom-action-bar.component';



@NgModule({
  declarations: [CustomActionBarComponent],
  imports: [
    NativeScriptCommonModule
  ],
  schemas: [NO_ERRORS_SCHEMA],
  exports: [CustomActionBarComponent]
})
export class SharedModule { }
