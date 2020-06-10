import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { StartPaginaComponent } from "~/app/StartPagina/start-pagina/start-pagina.component";
import { LoginComponent } from "~/app/StartPagina/start-pagina/login/login.component";
import { RegisterComponent } from "~/app/StartPagina/start-pagina/register/register.component";
import { StartComponent } from "~/app/StartPagina/start-pagina/start/start.component";
import { RoleGuard } from "~/app/services/role.guard";
import { ProfileComponent } from "~/app/profile/profile.component";
import { UserDataComponent } from "~/app/profile/user-data/user-data.component";
import { OptionsComponent } from "~/app/profile/options/options.component";
import { EditNameComponent } from "~/app/profile/user-data/edit-name/edit-name.component";
import { EditBioComponent } from "~/app/profile/user-data/edit-bio/edit-bio.component";
import { EditPasswordComponent } from "~/app/profile/user-data/edit-password/edit-password.component";
import { EditEmailComponent } from "~/app/profile/user-data/edit-email/edit-email.component";
import { EditCompaniesComponent } from "~/app/profile/user-data/edit-companies/edit-companies.component";
import { EditCompanyComponent } from "~/app/profile/user-data/edit-company/edit-company.component";

const routes: Routes = [

    {
        path: "",
        redirectTo: "/start",
        pathMatch: "full"
    },
    {
        path: "start",
        component: StartPaginaComponent,
        children: [
            { path: "", component: StartComponent},
            { path: "login", component: LoginComponent },
            { path: "register", component: RegisterComponent }
        ]
    },
    {
        path: "profile",
        component: ProfileComponent
    },
    {
        path: "mydata",
        component: UserDataComponent,
        children: [
            {path: "", component: OptionsComponent },
            {path: "edit-name", component: EditNameComponent},
            {path: "edit-bio", component: EditBioComponent},
            {path: "edit-password", component: EditPasswordComponent},
            {path: "edit-email", component: EditEmailComponent},
            {path: "edit-companies", component: EditCompaniesComponent},
            {path: "edit-companies/:id", component: EditCompanyComponent}
        ]
    },
    {
        path: "loggedin",
        canActivate: [RoleGuard],
        data: {roles: ["member", "admin"]},
        loadChildren: () => import("~/app/logged-in/logged-in.module").then((m) => m.LoggedInModule)
    }
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})

export class AppRoutingModule {
    //
    // constructor(private accountService: AccountService, private router: Router) {
    //     accountService.user$.subscribe((user) => {
    //         if (user == null) {
    //             console.log("routing to start");
    //             // this.router.navigateByUrl('/start');
    //         } else { this.router.navigate(["loggedIn"]); }
    //     });
    // }
}
