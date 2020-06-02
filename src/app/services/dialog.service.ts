import { Injectable } from "@angular/core";
import "tns-core-modules/ui/dialogs" ;
@Injectable({
    providedIn: "root"
})
export class DialogService {

    showDialog(title: string, message: string){
        alert({
            title,
            message,
            okButtonText: "Sluiten"
        });
    }
}
