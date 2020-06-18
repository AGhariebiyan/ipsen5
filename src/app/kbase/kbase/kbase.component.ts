import { Component, OnInit } from '@angular/core';
import { Observable } from "rxjs";
import { NewsItem } from "~/app/models/NewsItem.model";
import { KBase } from "~/app/models/KBase.model";
import { KbaseService } from "~/app/services/kbase.service";

@Component({
  selector: 'ns-kbase',
  templateUrl: './kbase.component.html',
  styleUrls: ['./kbase.component.css']
})
export class KbaseComponent implements OnInit {
  sectionTitle = "Knowledge Base"
  articles: Observable<KBase[]>;
  constructor(private kbaseService: KbaseService) { }

  ngOnInit(): void {
    this.articles = this.kbaseService.getItems();
  }

}
