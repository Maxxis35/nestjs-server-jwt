export class AuthDto {
    sub: string;
    email: string;
    firstName: string;
    lastName: string;

    constructor(model) {
        this.sub = model._id;
        this.email = model.email;
        this.firstName = model.firstName;
        this.lastName = model.lastName;
    }

}