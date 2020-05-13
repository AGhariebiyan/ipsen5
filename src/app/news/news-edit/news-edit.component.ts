import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ns-news-edit',
  templateUrl: './news-edit.component.html',
  styleUrls: ['./news-edit.component.css']
})
export class NewsEditComponent implements OnInit {
  userType = " ";

  constructor() { }

  ngOnInit(): void {
  }

  displayActionDialog() {
    // >> action-dialog-code
    let options = {
      title: "Race selection",
      message: "Choose your race",
      cancelButtonText: "Cancel",
      actions: ["Human", "Elf", "Dwarf", "Orc", "Unicorn"]
    };

    action(options).then((result) => {
      if (result === 'Cancel') {
        this.userType = "";
      } else {
        this.userType = result;
      }
    });

  }

}
