import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ns-kbase',
  templateUrl: './kbase.component.html',
  styleUrls: ['./kbase.component.css']
})
export class KbaseComponent implements OnInit {
  sectionTitle = "Knowledge Base"
  constructor() { }

  ngOnInit(): void {
  }

}
