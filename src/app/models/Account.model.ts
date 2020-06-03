import { PermissionRole } from "~/app/models/PermissionRole.model";

export class Account {


    constructor(
        public id: string,
        public email: string,
        public firstName: string,
        public middleName: string,
        public lastName: string,
        public description: string,
        public role: PermissionRole
    ) {
    }

}
