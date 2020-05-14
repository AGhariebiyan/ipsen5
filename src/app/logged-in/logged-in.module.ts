import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule } from 'nativescript-angular/common';
import { LoggedInComponent } from './logged-in/logged-in.component';
import {LoggedInRoutingModule} from "~/app/logged-in/logged-in-routing.module";
import {SharedModule} from "~/app/shared/shared.module";



@NgModule({
  declarations: [LoggedInComponent],
  imports: [
      LoggedInRoutingModule,
      NativeScriptCommonModule,
      SharedModule
  ],
  schemas: [NO_ERRORS_SCHEMA]
})
export class LoggedInModule { }
