import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { StartPaginaComponent } from './StartPagina/start-pagina/start-pagina.component';
import { LoginComponent } from './StartPagina/start-pagina/login/login.component';
import { RegistrerenComponent } from './StartPagina/start-pagina/registreren/registreren.component';
import {LoggedInModule} from "~/app/logged-in/logged-in.module";
import { StartComponent } from './StartPagina/start-pagina/start/start.component';

@NgModule({
    bootstrap: [
        AppComponent
    ],
    imports: [
        NativeScriptModule,
        AppRoutingModule,
        LoggedInModule
    ],
    declarations: [
        AppComponent,
        StartPaginaComponent,
        RegistrerenComponent,
        LoginComponent,
        StartComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class AppModule { }
