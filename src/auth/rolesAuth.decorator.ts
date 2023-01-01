import { SetMetadata } from "@nestjs/common/decorators";

export const Roles=(...roles:Array<string>)=>SetMetadata('roles',roles)