import { Component, OnInit } from '@angular/core';
import { AccountService } from '~/app/services/account.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'
import { Account } from '~/app/models/Account.model';
import { ImageService } from '~/app/services/image.service';
import { RouterExtensions } from 'nativescript-angular';
import { SearchBar } from 'tns-core-modules/ui';

@Component({
  selector: 'ns-user-search',
  templateUrl: './user-search.component.html',
  styleUrls: ['./user-search.component.css']
})
export class UserSearchComponent implements OnInit {

  accounts$: Observable<Account[]>
  backup$: Observable<Account[]>


  constructor(private accsService: AccountService, private imgService: ImageService, private router: RouterExtensions) { }

  ngOnInit(): void {
    this.accounts$ = this.sortAccounts()
    this.backup$ = this.accsService.getAllAccounts()
  }

  sortAccounts(): Observable<Account[]> {
    return this.accsService.getAllAccounts().pipe(
      map(accounts => accounts.sort((a, b) => a.firstName.localeCompare(b.firstName))
    ))
  }

  userImageString(id: string): string {
    return this.imgService.getUserImageUrl(id)
  }

  profileTapped(id: string) {
    console.log(id)
    this.router.navigate(['/userprofile/' + id])
  }

  textDidChange(args) {
    const searchBar = args.object as SearchBar;
   
    this.accounts$ = this.applySearchResult(searchBar.text)
  }

  applySearchResult(query: string) {

    if (query === "") {
      return this.backup$
    }

    return this.accounts$.pipe(
      map(accounts => accounts.filter(acc => {
        let domain = acc.firstName + " " + acc.lastName
        return domain.includes(query)
      }))
    )
  }

}
