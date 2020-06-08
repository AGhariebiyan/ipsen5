import { PermissionRole } from "~/app/models/PermissionRole.model";
import { Image } from "~/app/models/image.model";

export class Account {


    constructor(
        public id: string,
        public email: string,
        public firstName: string,
        public middleName: string,
        public lastName: string,
        public description: string,
        public role: PermissionRole,
        public image?: Image
    ) {
    }

}
