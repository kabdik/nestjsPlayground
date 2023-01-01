import { Roles } from "src/roles/roles"

export interface JwtPayload{
    email:string
    id:number
    roles:Roles[]
    iat: number;
    exp: number;
}

declare module "express-serve-static-core" {
    interface Request {
        user: JwtPayload;
    }
}
