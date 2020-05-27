import { Component, OnInit } from '@angular/core';
import { Page } from 'tns-core-modules/ui/page';

@Component({
  selector: 'ns-start-pagina',
  templateUrl: './start-pagina.component.html',
  styleUrls: ['./start-pagina.component.css']
})
export class StartPaginaComponent implements OnInit {

  constructor(private page: Page) {
    page.actionBarHidden = true;
  }

  ngOnInit(): void {

  }

}
