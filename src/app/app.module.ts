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
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { AccountService } from "~/app/services/account.service";
import { JwtService } from "~/app/services/jwt.service";
import { AutoRoutingService } from "./services/routing.service";
import { RegisterService } from "~/app/services/register/register.service";
import { NativeScriptUIDataFormModule } from "nativescript-ui-dataform/angular";
import { ProfileComponent } from "./profile/profile.component";
import { UserDataComponent } from "./profile/user-data/user-data.component";
import { EditNameComponent } from "./profile/user-data/edit-name/edit-name.component";
import { OptionsComponent } from "./profile/options/options.component";
import { EditBioComponent } from "./profile/user-data/edit-bio/edit-bio.component";
import { EditEmailComponent } from "./profile/user-data/edit-email/edit-email.component";
import { EditPasswordComponent } from "./profile/user-data/edit-password/edit-password.component";
import { ReactiveFormsModule } from "@angular/forms";
import { AuthInterceptorService } from "~/app/services/auth-interceptor.service";
import { EditCompaniesComponent } from './profile/user-data/edit-companies/edit-companies.component';
import { EditCompanyComponent } from './profile/user-data/edit-company/edit-company.component';
import { UserProfileComponent } from "./user-profile/user-profile.component";
import { CreateCompanyComponent } from './profile/user-data/create-company/create-company.component';
import { CommonModule } from "@angular/common";
import { RegisterJobComponent } from './profile/user-data/register-job/register-job.component';
import { UserListComponent } from "./admin/user-list/user-list.component";
@NgModule({
    providers: [
        AccountService,
        JwtService,
        AutoRoutingService,
        RegisterService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptorService,
            multi: true
        }
    ],
    bootstrap: [
        AppComponent
    ],
    imports: [
        HttpClientModule,
        NativeScriptModule,
        AppRoutingModule,
        LoggedInModule,
        ReactiveFormsModule,
        NativeScriptFormsModule,
        NativeScriptUIDataFormModule,
        CommonModule
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
        EditPasswordComponent,
        EditCompaniesComponent,
        EditCompanyComponent,
        UserProfileComponent,
        CreateCompanyComponent,
        UserListComponent,
        RegisterJobComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class AppModule {
}
