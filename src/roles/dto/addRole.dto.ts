import { IsNumber, IsString } from "class-validator";

export class addRoleDto {
    @IsString()
    readonly value: string;
    @IsNumber()
    readonly userId: number;
}
