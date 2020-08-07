import { JwtDataLoginDto } from "src/dtos/auth/jwt.data.administrator.dto";

declare module 'express' {
    interface Request {
        token: JwtDataLoginDto;
    }
}