import { IsEmail, IsString, Length } from "class-validator";

export class CreateUserDto {
    @IsString({ message: "must be a string" })
    @IsEmail({},{message:"is not appropriate email format"})
    readonly email: string;


    @IsString({message:"must be a string"})
    @Length(4,20,{message:"the password must be between 4 and 20 characters"})
    readonly password: string;
}
