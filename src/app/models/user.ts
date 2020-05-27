import {Name} from "~/app/models/name";

export class User {
    constructor(
        public email:string,
        public role:string,
        public name:Name
    ) {
    }
}
