import { Component, OnInit } from '@angular/core';
import { KbaseService } from "~/app/services/kbase.service";
import { Observable } from "rxjs";
import { KBase } from "~/app/models/KBase.model";

@Component({
  selector: 'ns-kbase-all',
  templateUrl: './kbase-all.component.html',
  styleUrls: ['./kbase-all.component.css']
})
export class KbaseAllComponent implements OnInit {
  articles: Observable<KBase[]>;

  constructor(private kbaseService: KbaseService) { }

  ngOnInit(): void {
    this.articles = this.kbaseService.getItems();
  }

}
