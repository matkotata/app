export class LoginInfoDto {
    id: number;
    identity: string;
    token: string;

    constructor(id,identity,tok){
        this.id = id;
        this.identity = identity;
        this.token = tok;
    }
}