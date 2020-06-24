import { Component, OnInit } from '@angular/core';
import { NewsService } from '~/app/services/news.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'
import { NewsItem } from '~/app/models/NewsItem.model';
import { RouterExtensions } from 'nativescript-angular';
import { SearchBar } from 'tns-core-modules/ui';

@Component({
  selector: 'ns-news-search',
  templateUrl: './news-search.component.html',
  styleUrls: ['./news-search.component.css']
})
export class NewsSearchComponent implements OnInit {

  news$: Observable<NewsItem[]>
  backup$: Observable<NewsItem[]>

  constructor(private newsService: NewsService, private router: RouterExtensions) { }

  ngOnInit(): void {
    this.news$ = this.newsService.getItems()
    this.backup$ = this.newsService.getItems()
  }

  newsTapped(id: string) {
    this.router.navigate(["/news-detail/" + id])
  }

  textDidChange(args) {
    let searchBar = args.object as SearchBar
    this.news$ = this.applySearchResults(searchBar.text)
  }

  applySearchResults(query: string): Observable<NewsItem[]> {
    if (query === "") {
      return this.backup$
    }
    
    return this.news$.pipe(
      map((news => news.filter(item => item.title.includes(query)))
    ))
  }
}
