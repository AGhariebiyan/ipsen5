import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { AccountService } from "~/app/services/account.service";
import { Observable, of } from "rxjs";
import { map } from "rxjs/internal/operators";
import { DialogService } from "~/app/services/dialog.service";
import { JwtService } from "~/app/services/jwt.service";
import { RouterExtensions } from "@nativescript/angular/router/router.module";

@Injectable({
    providedIn: "root"
})

export class RoleGuard implements CanActivate {

    title: string = "Je mag hier niet heen";
    message: string = "Deze route is beschermd!";

    constructor(private accountService: AccountService,
                private dialogService: DialogService,
                private jwtService: JwtService,
                private router: Router) {

    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | UrlTree {
        const roles = route.data.roles as Array<string>;

        // Check if the route contains roles.
        if (roles === null || roles[0] === null) {
            this.dialogService.showDialog(this.title, this.message);

            return of(false);
        }

        // Check if the account in the service has the roles
        if (!!this.accountService.account) {
            const allowed = roles.filter((role) => role === this.accountService.account.role.internalName).length > 0;
            if (!allowed) {
                this.dialogService.showDialog(this.title, this.message);
            }

            return of(allowed);
        }


        // Check if the token is accutally set, othwerise, goto start
        if (this.jwtService.getToken() === undefined) {
            const tree = this.router.parseUrl("start");

            return tree;
        }

        // Subscribe to accountService, check if new user has the right role.
        return this.accountService.account$.pipe(map((account) => {
            const allowed = roles.filter((role) => role === account.role.internalName).length > 0;
            if (!allowed) {
                this.dialogService.showDialog(this.title, this.message);
            }
            return allowed;
        }));
    }

}
