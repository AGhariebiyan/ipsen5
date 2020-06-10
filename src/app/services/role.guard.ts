import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from "@angular/router";
import { AccountService } from "~/app/services/account.service";
import { Observable, of } from "rxjs";
import { map } from "rxjs/internal/operators";
import { DialogService } from "~/app/services/dialog.service";

@Injectable({
    providedIn: "root"
})

export class RoleGuard implements CanActivate {

    title: string = "Je mag hier niet heen";
    message: string = "Deze route is beschermd";

    constructor(private accountService: AccountService, private dialogService: DialogService) {

    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {

        const roles = route.data.roles as Array<string>;
        if (roles === null || roles[0] === null) {
            this.dialogService.showDialog(this.title, this.message);

            return of(false);
        }

        if (!!this.accountService.account) {
            const allowed = roles.filter((role) => role === this.accountService.account.role.internalName).length > 0;
            if (!allowed) {
                this.dialogService.showDialog(this.title, this.message);
            }

            return of(allowed);
        }

        return this.accountService.account$.pipe(map((account) => {
            const allowed = roles.filter((role) => role === account.role.internalName).length > 0;
            if (!allowed) {
                this.dialogService.showDialog(this.title, this.message);
            }
            return allowed;
        }));
    }

}
