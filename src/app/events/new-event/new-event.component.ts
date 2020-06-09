import { Component, OnInit } from '@angular/core';
import { Event } from '~/app/models/event.model';
import { EventResponse } from '~/app/models/event-response.model';
import { NewEvent } from '~/app/models/new-event.model';
import { DialogService } from '~/app/services/dialog.service';
import { EventService } from '~/app/services/event.service';
import { ThrowStmt } from '@angular/compiler';
import { goBack } from 'tns-core-modules/ui/frame/frame';

@Component({
  selector: 'ns-new-event',
  templateUrl: './new-event.component.html',
  styleUrls: ['./new-event.component.css']
})
export class NewEventComponent implements OnInit {
  private _event: NewEvent

  regions = ["Drenthe", "Flevoland", "Friesland", "Gelderland", "Groningen", "Limburg", "Noord Brabant", "Noord Holland", "Overijssel", "Utrecht", "Zeeland", "Zuid Holland"]
  constructor(private dialogService: DialogService, private eventService: EventService) {}

  ngOnInit(): void {
    this._event = new NewEvent(new Date(),"","","","","","Zuid Holland","Nederland")
  }

  get event(): NewEvent {
    return this._event;
  }

  createEvent() {
    const keys = Object.keys(this.event)

    for (const key of keys) {
      const value = this.event[key]

      if(value == null || value.toString().trim() == "") {
        this.dialogService.showDialog("Let op!", "Er mogen geen velden leeg zijn.")
        return
      }
    }

    this.eventService.newEvent(JSON.stringify(this.event)).subscribe(() => {
      this.eventService.getEvents()
      goBack()
    })
    

    console.log(JSON.stringify(this.event))
  }

  confirm() {
    this.dialogService.showConfirm("Evenement Plaatsen", "Weet u zeker dat u dit evenement wil plaatsen?")
    .then(res => {
      if (res) {
        this.createEvent()
      }
    })
  }

//   openSave() {
//     if(this.validateData()) {
//         this.dialogService.showConfirm("Opslaan", "Weet u zeker dat u het evenement wilt aanpassen?")
//             .then( result => {
//                 if(result) {
//                     this.save();
//                 }
//             });
//     }

// }
}
