import { Component, OnInit } from '@angular/core';
import { Page } from 'tns-core-modules/ui';
import { Account } from '../../models/Account.model';
import { AccountService } from '../../services/account.service';
import { RouterExtensions } from 'nativescript-angular';

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
        private router: RouterExtensions) { }

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
        this.accountService.deleteAccount(id);
    }

    goToProfile(id: string) {
        this.router.navigate(['/userprofile', id])
    }

    goBack() {
        this.router.back();
    }
}
