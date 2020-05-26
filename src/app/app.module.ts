import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { StartPaginaComponent } from './StartPagina/start-pagina/start-pagina.component';
import { LoginComponent } from './StartPagina/start-pagina/login/login.component';
import { RegisterComponent } from './StartPagina/start-pagina/register/register.component';
import { LoggedInModule} from "~/app/logged-in/logged-in.module";
import { StartComponent } from './StartPagina/start-pagina/start/start.component';
import { HttpService} from "~/app/services/http.service";
import { NativeScriptFormsModule } from "nativescript-angular/forms"
import { HttpClientModule} from "@angular/common/http";
import { AccountService} from "~/app/services/account.service";
import { JwtService} from "~/app/services/jwt.service";
import { NativeScriptHttpClientModule } from 'nativescript-angular/http-client'
@NgModule({
    providers: [
        AccountService,
        JwtService
    ],
    bootstrap: [
        AppComponent
    ],
    imports: [
        NativeScriptModule,
        AppRoutingModule,
        LoggedInModule,
        NativeScriptFormsModule,
        NativeScriptHttpClientModule
    ],
    declarations: [
        AppComponent,
        StartPaginaComponent,
        RegisterComponent,
        LoginComponent,
        StartComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class AppModule { }
