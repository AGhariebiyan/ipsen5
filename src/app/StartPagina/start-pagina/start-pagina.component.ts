import { Component, OnInit } from '@angular/core';
import { Page } from '@nativescript/core/ui/page/page';

@Component({
  selector: 'ns-start-pagina',
  templateUrl: './start-pagina.component.html',
  styleUrls: ['./start-pagina.component.css']
})
export class StartPaginaComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
    console.log("start pagina created");

  }

}
