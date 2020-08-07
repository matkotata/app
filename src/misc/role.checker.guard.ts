import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common";
import { Observable } from "rxjs";
import { Request } from "express";
import { Reflector } from "@nestjs/core";
import { AllowToRoles } from "./allow.to.roles.descriptor";

@Injectable()
export class RoleCheckedGuard implements CanActivate {
    constructor(private reflector: Reflector)
    {}
    canActivate(context: ExecutionContext ): boolean | Promise<boolean> | Observable<boolean> {
        const req: Request = context.switchToHttp().getRequest();

        let requiredRoles = this
        .reflector
        .get<('administrator' | 'user')[]>('allowToRoles',context.getHandler());

        if(requiredRoles.includes(req.token.role)){
            return true;
        }
        return false;

    }

}