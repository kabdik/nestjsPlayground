import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";
import { Observable } from "rxjs";
import { UsersService } from "src/users/users.service";

@Injectable()
export class JwtAuthGuard implements CanActivate {
    constructor(private jwtService: JwtService) {}

    canActivate(
        context: ExecutionContext
    ): boolean | Promise<boolean> | Observable<boolean> {
        const req = context.switchToHttp().getRequest() as Request;
        try {
            const authHeader = req.headers.authorization;
            const token = authHeader.split(" ")[1];
            if (!token) {
                throw new UnauthorizedException({
                    message: "Unauthorized user",
                });
            }
            req.user = this.jwtService.verify(token);
            return true;
        } catch (error) {
            throw new UnauthorizedException({ message: "Unauthorized user" });
        }
    }
}
