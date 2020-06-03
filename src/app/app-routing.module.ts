import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { StartPaginaComponent } from "~/app/StartPagina/start-pagina/start-pagina.component";
import { LoginComponent } from "~/app/StartPagina/start-pagina/login/login.component";
import { RegisterComponent } from "~/app/StartPagina/start-pagina/register/register.component";
import { StartComponent } from "~/app/StartPagina/start-pagina/start/start.component";

const routes: Routes = [

    {
        path: "",
        redirectTo: "/news",
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
        path: "loggedin",
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
