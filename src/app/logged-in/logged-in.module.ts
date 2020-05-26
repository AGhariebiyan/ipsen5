import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { LoggedInComponent } from "./logged-in/logged-in.component";
import { LoggedInRoutingModule } from "~/app/logged-in/logged-in-routing.module";
import { SharedModule } from "~/app/shared/shared.module";
import { NewsModule } from "../news/news.module";
import { EventsModule } from "~/app/events/events.module";
import { SearchModule } from "~/app/search/search.module";
import { KbaseModule } from "~/app/kbase/kbase.module";
import { CommonModule } from "@angular/common";

@NgModule({
  declarations: [
      LoggedInComponent
  ],
  imports: [
      LoggedInRoutingModule,
      NativeScriptCommonModule,
      NewsModule,
      EventsModule,
      SearchModule,
      KbaseModule
  ],
  schemas: [NO_ERRORS_SCHEMA]
})
export class LoggedInModule { }
