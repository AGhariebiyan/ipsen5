import { Component, OnInit } from '@angular/core';
import { action, ActionOptions, confirm, ConfirmOptions } from "tns-core-modules/ui/dialogs";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { NewsService } from "~/app/services/news.service";
import { Observable } from "rxjs";
import { NewsItem } from "~/app/models/NewsItem.model";
import { ActivatedRoute } from "@angular/router";
import { HttpParams } from "@angular/common/http";

@Component({
  selector: 'ns-news-edit',
  templateUrl: './news-edit.component.html',
  styleUrls: ['./news-edit.component.css']
})
export class NewsEditComponent implements OnInit {
  newsId = this.activatedRoute.snapshot.params.newsId;
  newsItem$: NewsItem;

  form: FormGroup;

  newsPostId: number;
  newsTitle = "";
  newsDescription = "";
  date = new Date();
  deleted: boolean;
  published: boolean;
  accountId: number;
  companyId: number;
  featured: boolean;

  constructor(private newsService: NewsService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.getNewsItem();
    // console.log(this.activatedRoute.snapshot.params.newsId);

    this.form = new FormGroup({
      newsTitle: new FormControl(null, { updateOn: 'change', validators: [Validators.required]}),
      newsDescription: new FormControl(null, { updateOn: 'change', validators: [Validators.required]}),
      userType: new FormControl(null, { updateOn: 'change', validators: [Validators.required]})
    });
  }

  getNewsItem() {
    this.newsService.getItem(this.newsId).subscribe((newsItem) => {
      this.newsPostId = newsItem.id;
      this.newsTitle = newsItem.title;
      this.newsDescription = newsItem.content;
      this.deleted = newsItem.deleted;
      this.published = newsItem.published;
      this.accountId = newsItem.account;
      this.companyId = newsItem.company;
      this.featured = newsItem.featured;

    });
  }

  //Opslaan van de wijzigingen in het formulier
  displayConfirmDialogSave() {
    const options = {
      title: "Weet u zeker dat u het nieuwsbericht wilt opslaan?",
      okButtonText: "Wijzigen",
      cancelButtonText: "Annuleer"
    };

    confirm(options).then((result: boolean) => {
      console.log(result);
      this.onSubmit();
    });
  }

  // Dialoog venster voor het selecteren van type.
  // displayActionDialog() {
  //   const options = {
  //     title: "Plaatsen als:",
  //     message: "Selecteer type",
  //     cancelButtonText: "Annuleer",
  //     actions: ["Human", "Elf", "Dwarf", "Orc", "Unicorn"]
  //   };
  //
  //   action(options).then((result) => {
  //     if (result === 'Annuleer') {
  //       this.accountType = 1;
  //     } else {
  //       this.accountId = result;
  //     }
  //   });
  // }

  // Dialoog voor de controle van de gebruiker voor het verwijderen.
  displayConfirmDialogDelete() {
    const options = {
      title: "Weet u zeker dat u het nieuwsbericht wilt verwijderen?",
      okButtonText: "Verwijder",
      cancelButtonText: "Annuleer"
    };

    confirm(options).then((result: boolean) => {
      console.log(result);
    });
  }

  // Wijzigingen aanbrengen
  onSubmit() {
    const newsTitle = this.form.get('newsTitle').value;
    const newsDescription = this.form.get('newsDescription').value;
    const userType = this.accountId;

    const newsitem = new NewsItem(this.newsPostId, newsTitle, newsDescription, new Date(), this.deleted,
        this.published, this.accountId, this.companyId , this.featured);

    const body = new HttpParams({
      fromObject: {
        Id: newsitem.id,
        Title: newsitem.title,
        Deleted: newsitem.deleted,
        Published: newsitem.published,
        AccountId: newsitem.account,
        CompanyId: newsitem.company,
        Featured: newsitem.featured
      }
    });

    this.newsService.makePutRequest(this.newsId, body);
    console.log("ik zit erin");
  }

}
