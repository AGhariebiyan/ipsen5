import { Image } from "~/app/models/image.model";

export class Company {
    id: string;
    image: Image;
    name: string;
    active: boolean;
    address: string;

    constructor(image: Image, name: string, active: boolean, address: string) {
        this.image = image;
        this.name = name;
        this.active = active;
        this.address = address;
    }

}
