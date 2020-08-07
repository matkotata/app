import { SetMetadata } from "@nestjs/common"

export const AllowToRoles = (...roles: ("administrator" | "user")[]) => {
    return SetMetadata('allowToRoles', roles);
}