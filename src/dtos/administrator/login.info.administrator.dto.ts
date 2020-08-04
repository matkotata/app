export class LoginInfoAdministratorDto {
    administratorId: number;
    username: string;
    token: string;

    constructor(id,us,tok){
        this.administratorId = id;
        this.username = us;
        this.token = tok;
    }
}