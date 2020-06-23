import { Component, OnInit } from '@angular/core';
import { Observable } from "rxjs";
import { NewsItem } from "~/app/models/NewsItem.model";
import { KBase } from "~/app/models/KBase.model";
import { KbaseService } from "~/app/services/kbase.service";
import { AccountService } from "~/app/services/account.service";
import { map } from "rxjs/operators";
import { SearchBar } from 'tns-core-modules/ui';

@Component({
  selector: 'ns-kbase',
  templateUrl: './kbase.component.html',
  styleUrls: ['./kbase.component.css']
})
export class KbaseComponent implements OnInit {
  sectionTitle = "Knowledge Base";
  articles: Observable<KBase[]>;
  featuredArticles: Observable<KBase[]>;
  searchedArticles: Observable<KBase[]>;

  constructor(private kbaseService: KbaseService) {
  }

  ngOnInit(): void {
    this.articles = this.kbaseService.getItems();
    this.featuredArticles = this.getFeaturedKbase();

  }

  getFeaturedKbase() {
    return this.kbaseService.getFeaturedItems();
  }

  searchKbase(args) {
    const searchBar = args.object as SearchBar;

    this.searchedArticles = this.kbaseService.getSearchedItems(searchBar.text);
    this.featuredArticles = this.searchedArticles;

  }

  onClear() {
    this.featuredArticles = this.getFeaturedKbase();
  }

}
