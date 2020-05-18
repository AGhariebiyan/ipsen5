import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NSEmptyOutletComponent } from "nativescript-angular";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import {StartPaginaComponent} from "~/app/StartPagina/start-pagina/start-pagina.component";
import {LoggedInComponent} from "~/app/logged-in/logged-in/logged-in.component";
import {LoginComponent} from "~/app/StartPagina/start-pagina/login/login.component";
import {RegistrerenComponent} from "~/app/StartPagina/start-pagina/registreren/registreren.component";
import {StartComponent} from "~/app/StartPagina/start-pagina/start/start.component";
import {AccountService} from "~/app/services/account.service";

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
            { path: "register", component: RegistrerenComponent }
        ]
    },

    {
        path: "loggedIn",
        component: LoggedInComponent
    },
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule {
    constructor(private accountService: AccountService) {
        accountService.user$.subscribe((user) =>{
            if(user==null) console.log("routing to start page");
            else console.log("routing to home page")
        });
    }
}
