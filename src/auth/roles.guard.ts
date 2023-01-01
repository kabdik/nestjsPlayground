import {
    CanActivate,
    ExecutionContext,
    HttpException,
    HttpStatus,
    Injectable,
    UnauthorizedException,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";
import { Observable } from "rxjs";
import { UsersService } from "src/users/users.service";

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private jwtService: JwtService, private reflector: Reflector) {}

    canActivate(
        context: ExecutionContext
    ): boolean | Promise<boolean> | Observable<boolean> {
        const requiredRoles = this.reflector.getAllAndOverride<string[]>(
            "roles",
            [context.getHandler(), context.getClass()]
        );
        const req = context.switchToHttp().getRequest() as Request;
        try {
            const authHeader = req.headers.authorization;
            const token = authHeader.split(" ")[1];
            
            if (!token) {
                throw new UnauthorizedException({
                    message: "Unauthorized user",
                });
            }
            console.log(requiredRoles);
            req.user = this.jwtService.verify(token);
            return req.user.roles.some((role) =>
                requiredRoles.includes(role.value)
            );
        } catch (error) {
            throw new HttpException("No permission", HttpStatus.FORBIDDEN);
        }
    }
}
