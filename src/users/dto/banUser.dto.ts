import { IsNumber, IsString } from "class-validator"

export class banUserDto{

    @IsNumber({},{message:"id should be number"})
    readonly id:number

    @IsString({message:"Ban reason should be string"})
    readonly banReason:string
}