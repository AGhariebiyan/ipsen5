import { Component, OnInit } from '@angular/core';
import { Page } from 'tns-core-modules/ui';
import { Account } from '../../models/Account.model';
import { AccountService } from '../../services/account.service';
import { RouterExtensions } from 'nativescript-angular';
import { DialogService } from '../../services/dialog.service';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { ImageService } from '../../services/image.service';

@Component({
  selector: 'ns-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

    users: Account[] = [];
    placeholder = "https://randomuser.me/api/portraits/men/78.jpg";

    constructor(
        private page: Page,
        private accountService: AccountService,
        private router: RouterExtensions,
        private dialog: DialogService,
        private imageService: ImageService
    ) { }

    ngOnInit(): void {
        this.updateUsers();
    }

    updateUsers() {
        this.accountService.getAllUsersAdmin().subscribe((users: Account[]) => {
            users.sort((a, b) => (a.role.internalName == "non-member" ? 0 : 1) - (b.role.internalName == "non-member" ? 0 : 1))
            this.users = users;
        })

    }

    changePassword(id: string, password: string) {
        console.log(id + " => " + password);
    }

    deleteUser(id: string) {
        if (id == this.accountService.account.id) {
            this.dialog.showDialog("Eigen account verwijderen", "Je kan je eigen account niet verwijderen");
            return;
        }
        this.dialog.showConfirm("Verwijder gebruiker", "Weet u zeker dat u deze gebruiker wilt verwijderen?").then(confirm => {
            if (!confirm) return;
            this.accountService.deleteAccount(id).pipe(catchError((error) => {
                return this.handleDeleteError(error)
            })).subscribe(item => {
                this.updateUsers();
                this.dialog.showDialog("Gelukt", "Gebruiker is verwijderd");
            });
        });
        
    }

    goToProfile(id: string) {
        this.router.navigate(['/userprofile', id])
    }

    handleDeleteError(error: HttpErrorResponse) {
        this.dialog.showDialog("Verwijderen van gebruiker is niet gelukt", "Probeer opnieuw");
        return throwError("User not deleted");
    }

    goBack() {
        this.router.navigate(['loggedin/default']);
    }
}
