import { Injectable } from "@angular/core";
import * as imagepiceker from "nativescript-imagepicker";
import { ImageAsset } from "@nativescript/core/image-asset";
import * as bghttp from "nativescript-background-http";
import { environment } from "~/environments/environment.tns";
import { Task } from "nativescript-background-http";
import { JwtService } from "~/app/services/jwt.service";
import { Observable, Subject } from "rxjs";
import { isAndroid, isIOS } from "tns-core-modules/platform";
import { AccountService } from "~/app/services/account.service";

export enum UploadStatus {
    PROGRESS,
    ERROR,
    RESPONDED,
    COMPLETE
}

@Injectable({
    providedIn: "root"
})

export class ImageService {

    constructor(private jwtService: JwtService,
                private accountService: AccountService) {
    }

    uploadProfilePicture(imageSrc: ImageAsset): Subject<UploadStatus> {
        const request = {
            url: environment.apiUrl + "/api/images/profile",
            method: "POST",
            headers: {
                "Content-Type": "application/octet-stream",
                Authorization : "Bearer " + this.jwtService.getToken()
            },
            description: "User profile picture"
        };

        return this.uploadPicture(imageSrc, request, "picture");
    }

    selectSingleImage(): Promise<ImageAsset> {
        const context = imagepiceker.create({
            mode: "single"
        });

        return context.authorize().then(() => {
            return context.present();
        }).then((selection: ImageAsset[]) => {

            const imageSrc = selection.length > 0 ? selection[0] : null;

            return imageSrc;
        });
    }

    private uploadPicture(imageSrc: ImageAsset, request: any, fieldName): Subject<UploadStatus> {
        const session = bghttp.session("image-upload");

        let params;
        if (isAndroid) {
             params = [
                { name: fieldName, filename: imageSrc.android, mimeType: "image/*" }
            ];
        } else if (isIOS) {
            params = [
                { name: fieldName, filename: imageSrc.ios, mimeType: "image/*" }
            ];
        }

        const uploadStatus = new Subject<UploadStatus>();

        let task: Task;
        task = session.multipartUpload(params, request);
        task.on("progress", () => uploadStatus.next(UploadStatus.PROGRESS));
        task.on("error", () => uploadStatus.next(UploadStatus.ERROR));
        task.on("responded", (data) => {
            const image = JSON.parse(data.data);
            this.accountService.account.image = image;
            this.accountService.account$.next(this.accountService.account);
            uploadStatus.next(UploadStatus.RESPONDED);
        });
        task.on("complete", (data) => {
            uploadStatus.next(UploadStatus.COMPLETE);
        });

        return uploadStatus;
    }
}
