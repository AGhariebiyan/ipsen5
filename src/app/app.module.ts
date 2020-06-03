import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { StartPaginaComponent } from "./StartPagina/start-pagina/start-pagina.component";
import { LoginComponent } from "./StartPagina/start-pagina/login/login.component";
import { RegisterComponent } from "./StartPagina/start-pagina/register/register.component";
import { LoggedInModule } from "~/app/logged-in/logged-in.module";
import { StartComponent } from "./StartPagina/start-pagina/start/start.component";
import { HttpService } from "~/app/services/http.service";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { AccountService } from "~/app/services/account.service";
import { JwtService } from "~/app/services/jwt.service";
import { routing } from "./services/routing.service";
import { RegisterService } from "~/app/services/register/register.service";
import { ProfileComponent } from "./profile/profile.component";
import { UserDataComponent } from './profile/user-data/user-data.component';
import { EditNameComponent } from './profile/user-data/edit-name/edit-name.component';
import { OptionsComponent } from './profile/options/options.component';
import { EditBioComponent } from './profile/user-data/edit-bio/edit-bio.component';
import { EditEmailComponent } from './profile/user-data/edit-email/edit-email.component';
import { EditPasswordComponent } from './profile/user-data/edit-password/edit-password.component';

@NgModule({
    providers: [
        AccountService,
        JwtService,
        routing,
        RegisterService
    ],
    bootstrap: [
        AppComponent
    ],
    imports: [
        HttpClientModule,
        NativeScriptModule,
        AppRoutingModule,
        LoggedInModule,
        NativeScriptFormsModule
    ],
    declarations: [
        AppComponent,
        StartPaginaComponent,
        RegisterComponent,
        StartComponent,
        LoginComponent,
        ProfileComponent,
        UserDataComponent,
        EditNameComponent,
        OptionsComponent,
        EditBioComponent,
        EditEmailComponent,
        EditPasswordComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class AppModule {
}
