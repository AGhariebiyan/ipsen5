import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ns-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {


  searchDomains: {domainName: string, iconHex: string, link: string}[] = [
    {
      domainName: 'Leden',
      iconHex: '&#xf007;',
      link: 'user'
    },
    {
      domainName: 'Knowledge Base',
      iconHex: '&#xf07b;',
      link: 'kbase'
    },
    {
      domainName: 'Evenementen',
      iconHex: '&#xf073;',
      link: 'event'
    },
    {
      domainName: 'Nieuws',
      iconHex: '&#xf1ea;',
      link: 'news'
    }
  ]
  constructor() { }

  ngOnInit(): void {
  }

}
