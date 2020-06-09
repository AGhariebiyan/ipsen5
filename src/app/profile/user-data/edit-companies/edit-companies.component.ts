import { Component, OnInit } from '@angular/core';
import { AccountService } from "~/app/services/account.service";
import { ImageService } from "~/app/services/image.service";

@Component({
  selector: 'ns-edit-companies',
  templateUrl: './edit-companies.component.html',
  styleUrls: ['./edit-companies.component.css']
})
export class EditCompaniesComponent implements OnInit {


  constructor(private accountService: AccountService,
              private imageService: ImageService) { }

  ngOnInit(): void {

  }

}
