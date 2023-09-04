export class AuthDto {
    sub: string;
    email: string;

    constructor(model) {
        this.sub = model._id;
        this.email = model.email;
    }

}