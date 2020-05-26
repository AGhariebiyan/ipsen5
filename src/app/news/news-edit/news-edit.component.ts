import { Component, OnInit } from '@angular/core';
import { action, ActionOptions, confirm, ConfirmOptions } from "tns-core-modules/ui/dialogs";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { NewsService } from "~/app/services/news.service";
import { Observable } from "rxjs";
import { NewsItem } from "~/app/models/NewsItem.model";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'ns-news-edit',
  templateUrl: './news-edit.component.html',
  styleUrls: ['./news-edit.component.css']
})
export class NewsEditComponent implements OnInit {
  newsId = this.activatedRoute.snapshot.params.newsId;
  newsItem$: NewsItem;

  form: FormGroup;

  newsTitle = "";
  newsDescription = "";
  userType = "";

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
      this.newsTitle = newsItem.Title;
      this.newsDescription = newsItem.Content;
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
  displayActionDialog() {
    const options = {
      title: "Plaatsen als:",
      message: "Selecteer type",
      cancelButtonText: "Annuleer",
      actions: ["Human", "Elf", "Dwarf", "Orc", "Unicorn"]
    };

    action(options).then((result) => {
      if (result === 'Annuleer') {
        this.userType = "";
      } else {
        this.userType = result;
      }
    });
  }

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
    const userType = this.userType;

    console.log(newsTitle, newsDescription, userType);
  }

}
