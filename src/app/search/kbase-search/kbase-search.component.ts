import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { KBase } from '~/app/models/KBase.model';
import { KbaseService } from '~/app/services/kbase.service';
import { map } from 'rxjs/operators';
import { SearchBar } from 'tns-core-modules/ui';
import { RouterExtensions } from 'nativescript-angular';

@Component({
  selector: 'ns-kbase-search',
  templateUrl: './kbase-search.component.html',
  styleUrls: ['./kbase-search.component.css']
})
export class KbaseSearchComponent implements OnInit {

  articles$: Observable<KBase[]>
  backup$: Observable<KBase[]>

  constructor(private kbService: KbaseService, private router: RouterExtensions) { }

  ngOnInit(): void {
    this.articles$ = this.sorted()
    this.backup$ = this.sorted()
  }

  sorted() {
    return this.kbService.getItems().pipe(
      map(articles => articles.sort((a, b) => a.title.localeCompare(b.title)))
    )
  }

  textDidChange(args) {
    const searchBar = args.object as SearchBar
    this.articles$ = this.applySearchResult(searchBar.text)
  }

  applySearchResult(query: string): Observable<KBase[]> {
    if (query === "") {
      return this.backup$
    }

    return this.articles$.pipe(
      map(articles => articles.filter(article => article.title.includes(query)))
    )
  }

  articleTapped(id: string) {
    this.router.navigate(['/kbase-detail/' + id])
  }

}
